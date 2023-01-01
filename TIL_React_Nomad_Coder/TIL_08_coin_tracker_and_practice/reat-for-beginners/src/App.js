import { useEffect, useState } from 'react';

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [myUSD, setMyUSD] = useState(0);
  const [priceCoin, setPriceCoin] = useState(0);
  const [coinName, setCoinName] = useState("초기값");
  const onChange = (event) => {
    setMyUSD(event.target.value);
  };
  const onSelect = (e) => {
    setPriceCoin(e.target.value);
    setCoinName(e.target.dataset.name);
    console.log(e);
    console.log(coinName);
  };
  useEffect(()=>{
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then((response)=> response.json())
    .then((json) => {
      setCoins(json);
      console.log(json);
      setLoading(false);
    });
  }, []);
  return (
    <div>
      <h1>The Coins! {loading ? "" :`(${coins.length})`}</h1>
      {loading ? (
      <strong>Loading...</strong>
      ) : (
        <select value={priceCoin} data-name={coinName} onChange={onSelect}>
        <option>Select Coin</option>
        {coins.map((coin) =>(
        
        <option
          value={coin.quotes.USD.price} 
          id={coin.symbol}
          >
            {coin.name} ({coin.symbol}) {coin.quotes.USD.price}
        </option>
        
        ))}
      </select>
      )}
      <hr/>
      <h1>
      You can buy... {1/priceCoin*myUSD} {coinName}
      </h1>
      <input onChange={onChange} type='number' placeholder='please write your USD' />
    </div>
  );
}

export default App;