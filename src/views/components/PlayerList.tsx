import React from 'react'
import { Tag } from 'antd'
import './PlayerList.scss'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

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
    <TransitionGroup className="player-list">
      {
        playerList.map((player, index) => {
          return <CSSTransition key={ player } timeout={ 500 } classNames="item">
            <Tag closable={ closable } onClose={ () => onClose(player) }>
              { player }
            </Tag>
          </CSSTransition>
        })
      }
    </TransitionGroup>
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
