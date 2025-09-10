import CoinCard from "../components/CoinCard";
import LimitSelector from "../components/LimitSelector";
import FilterInput from "../components/FilterInput";
import SortSelector from "../components/SortSelector";

const HomePage = ({
  coins,
  filter,
  setFilter,
  limit,
  setLimit,
  sortBy,
  setSortBy,
  loading,
  error,
}) => {
  const filteredCoins = coins
    .filter((a) => {
      return (
        a.name.toLowerCase().includes(filter.toLowerCase()) ||
        a.symbol.toLowerCase().includes(filter.toLowerCase())
      );
    })
    .slice()
    .sort((a, b) => {
      switch (sortBy) {
        case "market_cap_desc":
          return b.market_cap - a.market_cap;
        case "market_cap_asc":
          return a.market_cap - b.market_cap;
        case "price_desc":
          return b.current_price - a.current_price;
        case "price_asc":
          return a.current_price - b.current_price;
        case "change_desc":
          return (
            b.market_cap_change_percentage_24h -
            a.market_cap_change_percentage_24h
          );
        case "change_asc":
          return (
            a.market_cap_change_percentage_24h -
            b.market_cap_change_percentage_24h
          );
      }
    });

  return (
    <div>
      <h1> 🚀 Crypto Dash</h1>
      {loading && <p>Loading</p>}
      {error && <div className="errpr">{error}</div>}
      <div className="top-controls">
        <FilterInput filer={filter} onFilterChange={setFilter} />
        <LimitSelector
          value={limit}
          name={"limit"}
          onLimitChange={(e) => setLimit(Number(e.target.value))}
        />
        <SortSelector sortBy={sortBy} onSortChange={setSortBy} />
      </div>

      {!loading && !error && (
        <main className="grid">
          {filteredCoins.length > 0 ? (
            filteredCoins.map((coin) => <CoinCard key={coin.id} coin={coin} />)
          ) : (
            <p>No matching coins</p>
          )}
        </main>
      )}
    </div>
  );
};

export default HomePage;
