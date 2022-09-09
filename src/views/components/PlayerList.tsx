import React from 'react'
import { Tag } from 'antd'
import './PlayerList.scss'

const PlayerList: React.FC<{
  playerList: string[],
  removePlayer?: (player: string) => void,
  closable?: boolean
}> = function ({ playerList, removePlayer, closable }) {
  closable = closable ?? true
  const onClose = (player: string) => {
    removePlayer!(player)
  }
  return (
    <div className="player-list">
      {
        playerList.map((player, index) => {
          return <Tag key={ player } closable={ closable } onClose={ () => onClose(player) }>
            { player }
          </Tag>
        })
      }
    </div>
  )
}

export default PlayerList

export const usePlayerList: (players: string[], setPlayers: React.Dispatch<React.SetStateAction<string[]>>) => {
  removePlayer: (player: string) => number
} = function (players, setPlayers) {
  const removePlayer = (player: string) => {
    setPlayers(
      players.filter(player_ => player_ !== player)
    )
    return players.length
  }
  return {
    removePlayer
  }
}
