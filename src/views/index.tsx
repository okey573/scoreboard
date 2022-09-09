import React from 'react'
import { Tabs } from 'antd'
import Scoreboard from './scoreboard'
import Assign from './assign'

const Grouper: React.FC = function () {
  const tabItems = [
    {
      label: '点将计分板',
      key: 'scoreboard',
      children: <Scoreboard />
    },
    {
      label: '点将',
      key: 'assign',
      children: <Assign />
    }
  ]
  return (
    <Tabs
      items={ tabItems }
      type="card"
    />
  )
}

export default Grouper
