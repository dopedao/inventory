type Rarity = 1 | 2 | 3 | 4 | 5 | 6;

type Bag = {
  id: string
  minted: string
  currentOwner: Wallet
  weapon: string
  chest: string
  head: string
  waist: string
  foot: string
  hand: string
  neck: string
  ring: string
  items: Item[]
}

type ItemSlots = {
  weapon: string
  chest: string
  head: string
  waist: string
  foot: string
  hand: string
  neck: string
  ring: string
}

type Item = {
  slot: string
  name: string
  item: string
  suffix?: string
  namePrefix?: string
  nameSuffix?: string
  bonus: Boolean
  rarity: Rarity
}

type Wallet = {
  id: string
  address: string
  bags: [Bag]
  bagsHeld: BigInt
  joined: BigInt
}

type Transfer = {
  id: ID!
  bag: Bag!
  from: Wallet!
  to: Wallet!
  txHash: string!
  timestamp: BigInt!
}
