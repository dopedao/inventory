import items from '../../data/items.json'
import occurences from '../../data/occurences.json'

type ItemsQuery = {
  data: {
    Items?: Items
  }
  loading: boolean
  error?: string
}

function useItems (address: string): ItemsQuery {
  
  return {}
}

export default useItems
