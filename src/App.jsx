import { useEffect } from "react";
import { useState } from "react";
import CoinCard from "./components/CoinCard";
import LimitSelector from "./components/LimitSelector";
import FilterInput from "./components/FilterInput";
const API_URL = import.meta.env.VITE_API_URL;
// &order=market_cap_desc&per_page=10&page=1&sparkline=false`
const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState('')

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

  const filteredCoins = coins.filter((a) => {
    return a.name.toLowerCase().includes(filter.toLowerCase()) || 
    a.symbol.toLowerCase().includes(filter.toLowerCase())
  })


  return (
    <div>
      <h1> 🚀 Crypto Dash</h1>
      {loading && <p>Loading</p>}
      {error && <div className="errpr">{error}</div>}
      <div className="top-controls">
        <FilterInput filer={filter} onFilterChange={setFilter}/>
        <LimitSelector value={limit} name={'limit'} onLimitChange={(e)=>setLimit(Number(e.target.value))}/>
      </div>
     
      {!loading && !error && (
        <main className="grid">
          {filteredCoins.map((coin) => (
            <CoinCard key={coin.key} coin={coin} />
          ))}
        </main>
      )}
    </div>
  );
};

export default App;
