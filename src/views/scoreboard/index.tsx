import React, { useState, useEffect } from 'react'
import PlayerInput, { usePlayerInput } from '../components/PlayerInput'
import PlayerList, { usePlayerList } from '../components/PlayerList'
import { Button } from 'antd'
import { MAX_PLAYERS } from '../constants'
import './index.scss'
import PlayerBoard from '../components/PlayerBoard'
import PlayerUncertain from '../components/PlayerUncertain'


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
        name,
        kill: 0,
        death: 0,
        allKillTimes: 0,
        isCaptain: false,
        serial: 0
      } as unknown as Player
    })
    // TODO
    const redTeam = all.splice(0, MAX_PLAYERS / 2)
    setRedTeam(redTeam)
    setBlueTeam(all)
  }

  const reStart = () => {
    setIsStart(false)
  }

  const notStart = <>
    <PlayerInput addPlayer={ addPlayer } disabledAddButton={ disabledAddButton } />
    <PlayerList playerList={ players } removePlayer={ removePlayer } />
    { players.length === MAX_PLAYERS &&
      <Button onClick={ start } type={ 'primary' } style={ { width: '100%' } }>开始点将</Button>
    }
  </>

  const alreadyStarted = <>
    <PlayerList playerList={ players } closable={ false } />
    <Button onClick={ reStart } type={ 'primary' } style={ { width: '100%' } } danger>重选玩家</Button>
  </>

  const selectFn = (teamCode: string, index: number) => {
    const team = teamCode === 'blue' ? blueTeam : redTeam
    const setter = teamCode === 'blue' ? setBlueTeam : setRedTeam
    // TODO
  }
  const groupContent = <div className="group-content">
    <div className="group-content-left">
      {
        redTeam.map((player, index) => {
          if (player.status === 'certain') {
            return <PlayerBoard key={ index }
                                name={ player.name }
                                kill={ player.kill }
                                death={ player.death }
                                allKillTimes={ player.allKillTimes }
                                isCaptain={ player.isCaptain }
                                serial={ player.serial } />
          } else {
            return <PlayerUncertain key={ index }
                                    status={ player.status }
                                    name={ player.name }
                                    selectFn={ () => selectFn('red', index) } />
          }
        })
      }
    </div>
    <div className="group-content-right">
      {
        blueTeam.map((player, index) => {
          if (player.status === 'certain') {
            return <PlayerBoard key={ index }
                                name={ player.name }
                                kill={ player.kill }
                                death={ player.death }
                                allKillTimes={ player.allKillTimes }
                                isCaptain={ player.isCaptain }
                                serial={ player.serial } />
          } else {
            return <PlayerUncertain key={ index }
                                    status={ player.status }
                                    name={ player.name }
                                    selectFn={ () => selectFn('blue', index) } />
          }
        })
      }
    </div>
  </div>

  return <div className="scoreboard">
    { !isStart && notStart }
    { isStart && alreadyStarted }
    { isStart && groupContent }
  </div>
}

export default Scoreboard
