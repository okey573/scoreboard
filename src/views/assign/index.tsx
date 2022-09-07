import React from 'react'
import PlayerInput, { usePlayerInput } from '../components/PlayerInput'

const Assign: React.FC = function () {
  const { addPlayer, players } = usePlayerInput()

  return <>
    <PlayerInput addPlayer={ addPlayer } />
  </>
}

export default Assign
