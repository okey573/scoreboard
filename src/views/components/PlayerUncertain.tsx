import React from 'react'
import { PlusOutlined } from '@ant-design/icons'
import './PlayerUncertain.scss'

type SelectFn = {
  selectFn: () => void
}

const PlayerUncertain: React.FC<PlayerUncertain & SelectFn> = function (
  {
    status,
    name,
    selectFn
  }
) {

  let content
  if (status === 'ready') {
    content = <span className="player-name">{ name }</span>
  } else {
    content = <PlusOutlined className="plus-icon" />
  }

  const onClick = () => {
    selectFn()
  }

  return <div className="player-uncertain" onClick={ onClick }>
    { content }
  </div>
}

export default PlayerUncertain
