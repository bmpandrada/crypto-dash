import { useEffect } from "react";
import { useState } from "react";
const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
    useEffect(()=> {
      const dataCoins = async() => {
        try {
          const res = await fetch(API_URL);
          if(!res.ok){
            throw new Error('Data fetch failed');
          }
          const data = await res.json();
          setCoins(data)
          console.log(data);
        } catch (error) {
          setError(error.message)
        }finally {
          setLoading(false)
        }
      }
      dataCoins()
    },[]);


  return ( 
    <div>
      <h1> 🚀 Crypto Dash</h1>
      { loading && <p>Loading</p> }
      { error && <div className="errpr">{error}</div> }

      { !loading && !error && (
        <main className="grid">
          {coins.map((coin)=> (
            <div className="coin-card" key={coin.id}>
              <div className="coin-header">
                <img className="coin-image" src={coin.image} alt={coin.name} />
                <div>
                  <h2>{coin.name}</h2>
                  <p className="symbol">{coin.symbol.toUpperCase()}</p>
                </div>
              </div>
              <p>Price: {coin.current_price.toLocaleString()}</p>
              <p className={`${coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}`}>
                {coin.price_change_percentage_24h} %
              </p>
              <p>
                Market Cap: {coin.market_cap.toLocaleString()}
              </p>
            </div>
          ))}
        </main>
      ) }
    </div>
   );
}
 
export default App;