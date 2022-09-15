import React, { useState } from 'react'
import './PlayerBoard.scss'
import { PlusCircleOutlined, MinusCircleOutlined, StarOutlined, TrophyOutlined, TrophyFilled } from '@ant-design/icons'

type PlayerBoardRest = {
  modifyAllKillTimes: (num: number) => void,
  modifyKill: (num: number) => void,
  modifyDeath: (num: number) => void
}
const PlayerBoard: React.FC<CertainPlayer & PlayerBoardRest> = function (
  {
    name,
    kill,
    death,
    allKillTimes,
    isCaptain,
    serial,
    modifyAllKillTimes,
    modifyKill,
    modifyDeath
  }
) {

  const [isHover, setIsHover] = useState<boolean>(false)

  return <div className="player" onMouseEnter={ () => setIsHover(true) } onMouseLeave={ () => setIsHover(false) }>
    <div className="name">
      <div className="name-block">
        <span className="name-block-content">
          { name }
          { isCaptain && <StarOutlined className="captain" /> }
          { !isCaptain && <span className="serial">{ serial }选</span> }
        </span>
      </div>
      <div className="all-kill-icons">
        { new Array(allKillTimes).fill('').map((_, index) =>
          <TrophyFilled key={ index } className="all-kill-icon" onClick={ () => modifyAllKillTimes(-1) } />) }
        { isHover && <TrophyOutlined className="add-all-kill-icon" onClick={ () => modifyAllKillTimes(1) } /> }
      </div>
    </div>
    <div className="kda">
      <div className="kda-item kill">
        { isHover && <PlusCircleOutlined className="plus-icon" onClick={ () => modifyKill(1) } /> }
        <span className="number-val">{ kill }</span>
        { isHover && <MinusCircleOutlined className="minus-icon" onClick={ () => modifyKill(-1) } /> }
      </div>
      /
      <div className="kda-item death">
        { isHover && <PlusCircleOutlined className="plus-icon" onClick={ () => modifyDeath(1) } /> }
        <span className="number-val">{ death }</span>
        { isHover && <MinusCircleOutlined className="minus-icon" onClick={ () => modifyDeath(-1) } /> }
      </div>
    </div>
  </div>
}

export default PlayerBoard
