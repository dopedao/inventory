import { useState, useEffect } from "react";
import { request, gql } from 'graphql-request'

const SUBGRAPH = 'https://api.studio.thegraph.com/query/7708/gear/v0.0.1'

const bagsQuery = gql`
  {
    bags(first: 10, orderBy: minted, orderDirection: asc) {
      id
      neck
      clothes
      hand
      ring
      weapon
      waist
      foot
      drugs
      vehicle
      currentOwner {
        address
        bagsHeld
        joined
      }
      minted
    }
  }
`

type BagsQuery = {
  data: {
    bags?: Bag[]
  }
  loading: boolean
  error?: string
}

function useLoot (): BagsQuery {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()
  const stopLoading = () => setLoading(false)

  useEffect(() => {
    request(SUBGRAPH, bagsQuery)
      .then(setData)
      .then(stopLoading)
      .catch(setError)
  }, [])

  return { data, loading, error }
}

export default useLoot
