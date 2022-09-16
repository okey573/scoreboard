import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'
import PlayerInput, { usePlayerInput } from './components/PlayerInput'
import PlayerList, { usePlayerList } from './components/PlayerList'
import { Button } from 'antd'
import { MAX_PLAYERS } from './constants'
import './index.scss'
import PlayerBoard from './components/PlayerBoard'
import PlayerUncertain from './components/PlayerUncertain'


const Scoreboard: React.FC = function () {
  const { addPlayer, players, setPlayers } = usePlayerInput()
  const { removePlayer } = usePlayerList(players, setPlayers)
  const [disabledAddButton, setDisabledAddButton] = useState<boolean>(false)
  useEffect(() => {
    setDisabledAddButton(players.length >= MAX_PLAYERS)
  }, [players])

  const [redTeam, setRedTeam] = useState<Player[]>([])
  const [blueTeam, setBlueTeam] = useState<Player[]>([])

  const [isStart, setIsStart] = useState<boolean>(false)
  const start = () => {
    setIsStart(true)
    const all: Player[] = players.map(name => {
      return {
        status: 'uncertain',
        name: undefined,
        kill: 0,
        death: 0,
        allKillTimes: 0,
        isCaptain: false,
        serial: 0
      } as Player
    })
    // TODO
    const redTeam = all.splice(0, MAX_PLAYERS / 2)
    setRedTeam(redTeam)
    setBlueTeam(all)
  }

  const reStart = () => {
    setIsStart(false)
  }

  const [draggingPlayer, setDraggingPlayer] = useState<string | undefined>(undefined)
  const handleDragStart = (name: string) => {
    setDraggingPlayer(name)
  }
  const handleDragEnd = () => {
    setDraggingPlayer(undefined)
  }
  const notStart = <>
    <PlayerInput addPlayer={ addPlayer } disabledAddButton={ disabledAddButton } />
    <PlayerList playerList={ players } removePlayer={ removePlayer } />
    { players.length === MAX_PLAYERS &&
      <Button onClick={ start } type={ 'primary' } style={ { width: '100%' } }>开始点将</Button>
    }
  </>

  const alreadyStarted = <>
    <PlayerList playerList={ players } closable={ false } handleDragStart={ handleDragStart } handleDragEnd={ handleDragEnd } />
    <Button onClick={ reStart } type={ 'primary' } style={ { width: '100%' } } danger>重选玩家</Button>
  </>

  const selectFn = (teamCode: string, index: number, playerName: string) => {
    const [setter, reSetter] = teamCode === 'blue' ? [setBlueTeam, setRedTeam] : [setRedTeam, setBlueTeam]
    let serial: number
    if (index === 0) {
      serial = 0
    } else {
      serial = [...redTeam, ...blueTeam].filter(i => i.status === 'ready').length - 1
      if ([...redTeam, ...blueTeam].find(i => i.name === playerName)) {
        serial = serial - 1
      }
    }
    setter(team => team.map((item, idx) => {
      if (index === idx) {
        return Object.assign({}, item, { name: playerName, status: 'ready', serial })
      }
      if (item.name === playerName) {
        return Object.assign({}, item, { name: undefined, status: 'uncertain', serial: 0 })
      } else {
        return item
      }
    }))
    reSetter(team => team.map((item, idx) => {
      if (item.name === playerName) {
        return Object.assign({}, item, { name: undefined, status: 'uncertain', serial: 0 })
      } else {
        return item
      }
    }))
  }

  const modifyData = (setter: Dispatch<SetStateAction<Player[]>>, index: number, num: number, keyType: 'death' | 'kill' | 'allKillTimes') => {
    setter(team => team.map((player, idx) => {
      if (index === idx) {
        return Object.assign({}, player, { [keyType]: player[keyType] + num })
      } else {
        return player
      }
    }))
  }
  const groupContent = <div className="group-content">
    <div className="group-content-left">
      {
        redTeam.map((player, index) => {
          if (player.status === 'certain') {
            return <PlayerBoard key={ index }
                                name={ player.name! }
                                kill={ player.kill }
                                death={ player.death }
                                allKillTimes={ player.allKillTimes }
                                isCaptain={ player.isCaptain }
                                serial={ player.serial }
                                modifyAllKillTimes={ (num) => modifyData(setRedTeam, index, num, 'allKillTimes') }
                                modifyKill={ (num) => modifyData(setRedTeam, index, num, 'kill') }
                                modifyDeath={ (num) => modifyData(setRedTeam, index, num, 'death') }/>
          } else {
            return <PlayerUncertain key={ index }
                                    index={ index }
                                    status={ player.status }
                                    name={ player.name! }
                                    draggingPlayer={ draggingPlayer }
                                    forbidDrop={ index !== 0 && (!(blueTeam?.[0]?.status === 'ready') || !(redTeam?.[0]?.status === 'ready')) }
                                    selectFn={ (playerName: string) => selectFn('red', index, playerName) } />
          }
        })
      }
    </div>
    <div className="group-content-right">
      {
        blueTeam.map((player, index) => {
          if (player.status === 'certain') {
            return <PlayerBoard key={ index }
                                name={ player.name! }
                                kill={ player.kill }
                                death={ player.death }
                                allKillTimes={ player.allKillTimes }
                                isCaptain={ player.isCaptain }
                                serial={ player.serial }
                                modifyAllKillTimes={ (num) => modifyData(setBlueTeam, index, num, 'allKillTimes') }
                                modifyKill={ (num) => modifyData(setBlueTeam, index, num, 'kill') }
                                modifyDeath={ (num) => modifyData(setBlueTeam, index, num, 'death') } />
          } else {
            return <PlayerUncertain key={ index }
                                    index={ index }
                                    status={ player.status }
                                    name={ player.name! }
                                    draggingPlayer={ draggingPlayer }
                                    forbidDrop={ index !== 0 && (!(blueTeam?.[0]?.status === 'ready') || !(redTeam?.[0]?.status === 'ready')) }
                                    selectFn={ (playerName: string) => selectFn('blue', index, playerName) } />
          }
        })
      }
    </div>
  </div>

  const [teamReadied, setTeamReadied] = useState<boolean>(false)
  useEffect(() => {
    const player = [...blueTeam, ...redTeam]
    setTeamReadied(!!player.length && player.every(i => i.status === 'ready'))
  }, [blueTeam, redTeam])

  const [isStartScoring, setIsStartScoring] = useState<boolean>(false)
  const startScoring = () => {
    const f: (team: Player[]) => Player[] = team => team.map((item, index) => {
      const isCaptain = index === 0
      return Object.assign({}, item, { isCaptain, status: 'certain' })
    })
    setBlueTeam(f)
    setRedTeam(f)
    setIsStartScoring(true)
  }
  return <div className="scoreboard">
    { !isStart && notStart }
    { isStart && !isStartScoring && alreadyStarted }
    { isStart && groupContent }
    {
      teamReadied && <Button type={ 'primary' } onClick={ startScoring } style={ {
        width: '100%',
        backgroundColor: '#67c23a',
        borderColor: '#67c23a'
      } }>开始计分</Button>
    }
  </div>
}

export default Scoreboard
