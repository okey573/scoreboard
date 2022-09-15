import React, { useState } from 'react'
import './PlayerUncertain.scss'

type PlayerUncertainRest = {
  selectFn: (player: string) => void,
  draggingPlayer?: string,
  index: number,
  forbidDrop?: boolean
}

const PlayerUncertain: React.FC<PlayerUncertain & PlayerUncertainRest> = function (
  {
    status,
    name,
    selectFn,
    draggingPlayer,
    index,
    forbidDrop
  }
) {

  let content
  if (status === 'ready') {
    content = <span className="player-name">{ name }</span>
  } else {
    content = <span className="plus-ready">{ index === 0 ? 'Cap' : `${index + 1}st`}</span>
  }

  const [active, setActive] = useState<boolean>(false)

  const handleDragEnter = (e: React.DragEvent) => {
    if (forbidDrop) return
    e.preventDefault()
    setActive(true)
  }
  const handleDragLeave = (e: React.DragEvent) => {
    if (forbidDrop) return
    e.preventDefault()
    setActive(false)
  }
  const handleDrop = (e: React.DragEvent) => {
    if (forbidDrop) return
    e.preventDefault()
    selectFn(draggingPlayer!)
    setActive(false)
  }

  return <div className={ `player-uncertain ${ active && 'player-uncertain-active' }` }
              onDragEnter={ handleDragEnter }
              onDragLeave={ handleDragLeave }
              onDragOver={ handleDragEnter }
              onDrop={ handleDrop }>
    { content }
  </div>
}

export default PlayerUncertain
