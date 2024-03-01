
import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap/dist/js/bootstrap.bundle.min";
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'


function App() {

  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')
  const [change, setChange] = useState('percent_change_24h')


  const handleSearch = (e) => {
    setSearch(e)
  }

  const handleChange = (e) => {
    setChange(e)
  }

  const filteredCoins = coins.filter(coin=>
    coin.name.toLowerCase().includes(search.toLowerCase())
  )



  useEffect(() => {
    axios.get('https://api.coinlore.net/api/tickers/')
    .then(res=>{
       setCoins(res.data.data)
      //  console.log(res.data)
    }).catch(error=>console.log(error))
  }, [])

  console.log(coins)
  console.log(change)
  
  return (
    <>
     <Nav>
      <Search onSearchCoin={handleSearch} />
     </Nav>

    <Content filteredCoins= {filteredCoins} onCoinChange={handleChange} change={change} />
    </>
  )
}

function Nav({children}){
  return(
    <div className="nav">
    <h1 className="title">
        Crypto Price
    </h1>
    {children}
   </div>
  )
}

function Search({onSearchCoin}) {
  return (
    <div className="search">
      <form action="">
        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Enter Coin Name" onChange={e => onSearchCoin(e.target.value)}></input>
      </form>
    </div>
  )
}

function Content({filteredCoins, onCoinChange, change}) {
  return(
    <div className="content">

        <div className="coinContainer">
            <div className="coinTitleCon row text-center">
                <div className="col-2 coinTitle">Rank</div>
                <div className="col-2 coinTitle">Symbol</div>
                <div className="coinName coinTitle col-2">Coin Name</div>
                <div className="coinName coinTitle col-2">Price</div>
                <select className="form-select coinChange coinTitle col-1" onChange={(e) => onCoinChange(e.target.value)}>
                  <option value="percent_change_1h">1h</option>
                  <option value="percent_change_24h" selected>24h</option>
                  <option value="percent_change_7d">7d</option>
                </select>
                <div className="coinMarketCap coinTitle col-3">Market Cap</div>
            </div>
            <hr></hr>
            {filteredCoins.map(c => {
              return(
                <Coin key={c.id} coin={c} change={change}/>
                
              )
            })}
            <hr></hr>
        </div>
    </div>
  )
}

function Coin({coin, change}){
  return (
    <div className="coin row text-center" key={coin.id}>
        <div className="col-2">{coin.rank}</div>
        <div className="col-2">${coin.symbol}</div>
        <div className="col-2">{coin.name}</div>
        <div className="col-2">${coin.price_usd}</div>
        {
          
        }
        <div className="col-1" style={

          coin[change] < 0 ? {color : 'red' } : {color : 'green' }
          }>{coin[change]}%</div>
        <div className="col-3">{coin.market_cap_usd}$</div>
    </div>
  )
}
export default App
