import { useState, useEffect } from "react";
import { request, gql } from "graphql-request";

const SUBGRAPH = "https://api.thegraph.com/subgraphs/name/shahruz/loot";

const walletQuery = gql`
  query Wallet($id: String!) {
    wallet(id: $id) {
      id
      address
      joined
      bagsHeld
      bags {
        id
        minted
        weapon
        chest
        head
        waist
        foot
        hand
        neck
        ring
      }
    }
  }
`;

type WalletQuery = {
  data: {
    wallet?: Wallet;
  };
  loading: boolean;
  error?: string;
};

function useWallet(address: string): WalletQuery {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);
  const clearError = () => setError("");

  useEffect(() => {
    if (!address) setError("No address provided");
    startLoading();
    request(SUBGRAPH, walletQuery, {
      id: address.toLowerCase(),
    })
      .then(setData)
      .then(stopLoading)
      .then(clearError)
      .catch(setError);
  }, [address]);

  return { data, loading, error };
}

export default useWallet;
