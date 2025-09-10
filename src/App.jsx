import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import Header from "./components/Header";
import NotFoundPage from "./pages/not-found";
import CoinDetailsPage from "./pages/coin-details";

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
        `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
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

 


  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<HomePage 
        coins={coins}
        loading={loading}
        error={error}
        filter={filter}
        sortBy={sortBy}
        setFilter={setFilter}
        setLimit={setLimit}
        setSortBy={setSortBy} />} />
        <Route path="/about" element={<AboutPage />} />
         <Route path="/coin/:id" element={<CoinDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </>
    
  );
};

export default App;
