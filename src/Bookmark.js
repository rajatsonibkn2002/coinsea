import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress'
import TableBookmark from "./TableBookmark";

export default function Bookmark(){
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [isConnected, setisConnected] = useState(false);
  const [currencyData, setcurrencyData] = useState([]);
  const [hasLoaded, sethasLoaded] = useState(false);
  const { ethereum } = window;

  const connectWallet = async () => {
    try {
        if (!ethereum) {
        sethaveMetamask(false);
        alert("Install Metamask!");
        }
        const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
        });
        setisConnected(true);
    } catch (error) {
        alert("Error while connecting!");
        setisConnected(false);
    }
    };

  let propsData = [];
  async function fetchData(){
    const axios = require('axios');
    axios({   method: 'get',
                url: 'https://api.coingecko.com/api/v3/simple/price',
                params: {
                  'ids': 'bitcoin,ethereum,solana,tether,cardano,dogecoin,polkadot,chainlink,aave,tron,stellar,helium,near,cronos,dai,monero,algorand',
                  'vs_currencies': 'usd,inr,eur,jpy,twd'
                },
                headers: {
                  'accept': 'application/json'
                }
    }).then((response) => {
      let propKeys = Object.keys(response.data)
      for(let i=0; i<propKeys.length; i++){
        propsData.push({"coin": propKeys[i], "usd": response.data[propKeys[i]]['usd'],
         "inr": response.data[propKeys[i]]['inr'],
          "eur": response.data[propKeys[i]]['eur'],
        "jpy": response.data[propKeys[i]]['jpy'],
        "twd": response.data[propKeys[i]]['twd']
      })
      }
      setcurrencyData(propsData);
      sethasLoaded(true);
    })
  }

  useEffect(() => {
    fetchData();
  }, [])

  return(
    hasLoaded ?
    <div className="app-div">
    {
      isConnected ? <TableBookmark props={currencyData} /> : <div><nav className='navbar'>
      <h1 className='nav-brand'><a href='/'>CoinSea</a></h1></nav><div className="connect-wallet-div"><Button className="connect-wallet-btn" variant="outlined" onClick={connectWallet}>Connect Wallet</Button></div></div>
    }</div> : <div className="circular-div"><CircularProgress /></div>
  )
}