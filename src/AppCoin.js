import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);

  // useEffect란 컴포넌트가 렌더링 될 떄 특정 작업을 실행할 수 있도록 하는 Hook
  // 두번째 인자로 [] 을 주면 맨 처음 렌더링될 때 한 번만 실행
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then(response => response.json())
      .then(json => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  
  // {coins.map(coin => <li>{coin.name} ({coin.symbol})</li>)}
  //  -> javascript 변수를 사용하려면 {coin.name} 처럼 {} 안에서 호출해야함. 
  //  -> 그냥 coin.name으로 부르면 텍스트로 보여짐.
  return (
    <div>
      <h1>The Coins! { loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
          <strong>Loading...</strong>
        ) : (
          <select>
            {coins.map((coin) => (
              <option key={coin.id}>
                {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
        )
      }
    </div>
  );
}

export default App;