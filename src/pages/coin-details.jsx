import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import Spinner from "../components/Spinner";
import CoinCart from "../components/CoinChart";
const  API_URL = import.meta.env.VITE_API_COIN_URL;
const CoinDetailsPage = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
 

    useEffect(()=> {
        const fetchDataCoin = async () => {
            try {
                const res = await fetch(`${API_URL}/${id}`);
                if(!res.ok) {
                    throw new Error("Data Failed Request..");
                }
                const data = await res.json();
                setCoin(data);
                  console.log(data);
            } catch (error) {
                setError(error.message);
            }finally {
                setLoading(false)
            }
        }
        fetchDataCoin()
    },[id]);


    return ( 
        <div className="coin-details-container">
            <Link to={'/'}>
              ←  Back To Home
            </Link>
            <h1 className="coin-detais-title">
                {coin ? `${coin.name} (${coin.symbol.toUpperCase()})` : 'Coin Details'}
            </h1>

            {loading && <Spinner />}
            {error && <div className="error"> ❌ {error}</div>}
            {!loading && !error && (<>
                <img src={coin.image.large} alt={coin.name} 
                className="coin-details-image"/>
                <p>{coin.description.en.split('. ')[0] + '.'}</p> 
                <div className="coin-details-info">
                    <h3>Rank: {coin.market_cap_rank}</h3>
                    <h3>Current Price: ₱{coin.market_data.current_price.php.toLocaleString()}</h3>
                    <h4>Market Cap: ₱{coin.market_data.market_cap.php.toLocaleString()}</h4>
                    <h4>24h High: ₱{coin.market_data.high_24h.php.toLocaleString()}</h4>
                    <h4>24h High: ₱{coin.market_data.high_24h.php.toLocaleString()}</h4>
                    <h4>24h Low: ₱{coin.market_data.low_24h.php.toLocaleString()}</h4>
                    <h4>
                        24h Price Change: ₱{coin.market_data.price_change_24h.toFixed(2)} (
                        {coin.market_data.price_change_percentage_24h.toFixed(2)}%)
                    </h4>
                    <h4>
                        Circulating Supply: {coin.market_data.circulating_supply.toLocaleString()}
                    </h4>
                    <h4>
                        Total Supply: {coin.market_data.total_supply?.toLocaleString() || 'N/A'}
                    </h4>
                    <h4>Max Supply: {coin.market_data.max_supply?.toLocaleString() || 'N/A'}</h4>
                    <h4>
                        All-Time High: ₱{coin.market_data.ath.php.toLocaleString()} on{' '}
                        {new Date(coin.market_data.ath_date.php).toLocaleDateString()}
                    </h4>
                    <h4>
                        All-Time Low: ₱{coin.market_data.atl.usd.toLocaleString()} on{' '}
                        {new Date(coin.market_data.atl_date.usd).toLocaleDateString()}
                    </h4>
                    <h4>Last Updated: {new Date(coin.last_updated).toLocaleString()}</h4>
                </div>

            <CoinCart coinId={coin.id} />

                <div className="coin-details-links">
                    {coin.links.homepage[0] && (
                        <p>
                        🌐{' '}
                        <a
                            href={coin.links.homepage[0]}
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            Website
                        </a>
                        </p>
                    )}
                    {coin.links.blockchain_site[0] && (
                        <p>
                        🧩{' '}
                        <a
                            href={coin.links.blockchain_site[0]}
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            Blockchain Explorer
                        </a>
                        </p>
                    )}
                     {coin.categories.length > 0 && (
                        <p>Categories: {coin.categories.join(', ')}</p>
                    )}
                </div>
            </>)}
              {!loading && !error && !coin && <p>No data found.</p>}
        </div>
     );
}
 
export default CoinDetailsPage;