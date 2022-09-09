declare type PlayerStatus = 'certain' | 'ready' | 'uncertain'

declare type Player = {
  status: PlayerStatus,
  name: string,
  kill: number,
  death: number,
  allKillTimes: number,
  isCaptain: boolean,
  serial: number
}

declare type CertainPlayer = Omit<Player, 'status'>

declare type PlayerUncertain = {
  status: 'ready' | 'uncertain',
  name: string
}
