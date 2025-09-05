import { useEffect } from "react";
import { useState } from "react";
import CoinCard from "./components/CoinCard";
const API_URL = import.meta.env.VITE_API_URL;
// &order=market_cap_desc&per_page=10&page=1&sparkline=false`
const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const dataFetch = async () => {
      const res = await fetch(
        `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
      );
      try {
        if (!res.ok) {
          throw new Error("Data fetch request failed");
        }
        const data = await res.json();
        setCoins(data)
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }

  
    };
        dataFetch();
  }, [limit]);

  return (
    <div>
      <h1> 🚀 Crypto Dash</h1>
      {loading && <p>Loading</p>}
      {error && <div className="errpr">{error}</div>}
      <div className="controls">
        <label htmlFor="limit">Show:</label>
        <select 
          name="limit" 
          id="limit" 
          value={limit}
          onChange={(e)=>setLimit(Number(e.target.value))}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>

        </select>
      </div> 

      {!loading && !error && (
        <main className="grid">
          {coins.map((coin) => (
            <CoinCard key={coin.key} coin={coin} />
          ))}
        </main>
      )}
    </div>
  );
};

export default App;
