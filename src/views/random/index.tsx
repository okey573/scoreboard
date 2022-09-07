import React, { useState, useEffect } from 'react'
import PlayerInput, { usePlayerInput } from '../components/PlayerInput'
import PlayerList, { usePlayerList } from '../components/PlayerList'
import { Button } from 'antd'
import { MAX_PLAYERS } from '../constants'
import './index.scss'

const Random: React.FC = function () {
  const { addPlayer, players, setPlayers } = usePlayerInput()
  const { removePlayer } = usePlayerList(players, setPlayers)
  const [disabledAddButton, setDisabledAddButton] = useState<boolean>(false)
  useEffect(() => {
    setDisabledAddButton(players.length >= MAX_PLAYERS)
  }, [players])

  const grouping = () => {
    // TODO
    console.log('去分组吧')
  }

  return <div className="random">
    <PlayerInput addPlayer={ addPlayer } disabledAddButton={ disabledAddButton } />
    <PlayerList playerList={ players } removePlayer={ removePlayer } />
    { players.length === MAX_PLAYERS &&
      <Button onClick={ grouping } type={ 'primary' } style={ { width: '100%' } }>分组</Button> }
    <div className="group-content">

    </div>
  </div>
}

export default Random
