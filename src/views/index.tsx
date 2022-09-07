import React from 'react'
import { Tabs } from 'antd'
import Random from './random'
import Assign from './assign'

const Grouper: React.FC = function () {
  const tabItems = [
    {
      label: '4V4',
      key: 'random',
      children: <Random />
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
