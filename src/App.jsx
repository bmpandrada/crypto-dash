import { useEffect } from "react";
import { useState } from "react";
import CoinCard from "./components/CoinCard";
import LimitSelector from "./components/LimitSelector";
import FilterInput from "./components/FilterInput";
import SortSelector from "./components/SortSelector";
const API_URL = import.meta.env.VITE_API_URL;
// &order=market_cap_desc&per_page=10&page=1&sparkline=false`
const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('market_cap_desc')


  useEffect(() => {
    const dataFetch = async () => {
      const res = await fetch(
        `${API_URL}&order=${sortBy}&per_page=${limit}&page=1&sparkline=false`
      );
      try {
        if (!res.ok) {
          throw new Error("Data fetch request failed");
        }
        const data = await res.json();
        console.log(data);
        setCoins(data)
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
        dataFetch();
  }, [limit, sortBy]);

  const filteredCoins = coins.filter((a) => {
    return a.name.toLowerCase().includes(filter.toLowerCase()) || 
    a.symbol.toLowerCase().includes(filter.toLowerCase())
  })
  .slice()
  .sort((a, b)=>{
    switch (sortBy) {
      case 'market_cap_desc':
        return b.market_cap - a.market_cap;
      case 'market_cap_asc':
        return a.market_cap - b.market_cap;
      case 'price_desc':
        return b.current_price - a.current_price;
      case 'price_asc':
        return a.current_price - b.current_price;
      case 'change_desc':
        return b.market_cap_change_percentage_24h - a.market_cap_change_percentage_24h;
      case 'change_asc':
        return a.market_cap_change_percentage_24h - b.market_cap_change_percentage_24h
    }
  })


  return (
    <div>
      <h1> 🚀 Crypto Dash</h1>
      {loading && <p>Loading</p>}
      {error && <div className="errpr">{error}</div>}
      <div className="top-controls">
        <FilterInput filer={filter} onFilterChange={setFilter}/>
        <LimitSelector value={limit} name={'limit'} onLimitChange={(e)=>setLimit(Number(e.target.value))}/>
        <SortSelector  sortBy={sortBy} onSortChange={setSortBy}/>
      </div>
     
      {!loading && !error && (
        <main className="grid">
          {filteredCoins.length > 0 ? filteredCoins.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />
          )) : (
            <p>
              No matching coins
            </p>
          )}
        </main>
      )}
    </div>
  );
};

export default App;
