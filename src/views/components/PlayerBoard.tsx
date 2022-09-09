import React, { useState } from 'react'
import './PlayerBoard.scss'
import { PlusCircleOutlined, MinusCircleOutlined, StarOutlined, FireOutlined } from '@ant-design/icons'

const PlayerBoard: React.FC<{
  name: string,
  kill: number,
  death: number,
  allKillTimes: number,
  isCaptain: boolean,
  serial: number
}> = function (
  {
    name,
    kill,
    death,
    isCaptain,
    serial
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
        { new Array(serial).fill('').map((_, index) => <FireOutlined key={ index } className="all-kill-icon" />) }
      </div>
    </div>
    <div className="kda">
      <div className="kda-item kill">
        { isHover && <PlusCircleOutlined className="plus-icon" /> }
        <span className="number-val">{ kill }</span>
        { isHover && <MinusCircleOutlined className="minus-icon" /> }
      </div>
      /
      <div className="kda-item death">
        { isHover && <PlusCircleOutlined className="plus-icon" /> }
        <span className="number-val">{ death }</span>
        { isHover && <MinusCircleOutlined className="minus-icon" /> }
      </div>
    </div>
  </div>
}

export default PlayerBoard
