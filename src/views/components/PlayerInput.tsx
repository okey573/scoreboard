import React, { useState } from 'react'
import { Input, Button, message } from 'antd'

const PlayerInput: React.FC<{
  addPlayer: (player: string) => number
  maxPlayer?: number,
  disabledAddButton?: boolean
}> = function ({ addPlayer, disabledAddButton }) {
  const [player, setPlayer] = useState<string>()
  const onAddFun = () => {
    if (disabledAddButton) {
      return
    }
    if (!player) {
      message.error('请输入玩家名', .5)
      return
    }
    addPlayer(player)
    setPlayer(undefined)
  }
  return (
    <Input.Group compact>
      <Input placeholder="请输入玩家名"
             value={ player }
             onChange={ (event) => setPlayer(event.target.value) }
             className="player-input"
             style={ { width: '200px' } }
             onPressEnter={ onAddFun } />
      <Button type="primary" onClick={ onAddFun } disabled={ disabledAddButton }>添加</Button>
    </Input.Group>
  )
}

export default PlayerInput

export const usePlayerInput: () => {
  players: string[],
  setPlayers: React.Dispatch<React.SetStateAction<string[]>>,
  addPlayer: (player: string) => number
} = function () {
  // TODO revert
  const [players, setPlayers] = useState<string[]>([
    '温柔',
    '老仇',
    '月海',
    '脸哥',
    '59',
    'A酱',
    '阿亮',
    '阿抬'
  ])
  const addPlayer: (player: string) => number = (player: string) => {
    if (players.includes(player)) {
      message.error(`${ player }已存在于玩家列表中`)
      return -1
    }
    setPlayers([
      ...players,
      player
    ])
    players.push(player)
    return players.length
  }
  return {
    players,
    setPlayers,
    addPlayer
  }
}
