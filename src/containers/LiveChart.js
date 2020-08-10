import React, { useContext, useEffect, useState } from 'react';
import '../App.css';
import socket from '../utils/socketConfig'
import { isArray } from 'util';
import Charts from '../components/Charts.js'


function LiveChart() {

  const [liveData, updateLiveData] = useState(JSON.parse(localStorage.getItem('liveData')) || []);

  const getLocalStorageSize = () => {
    var total = 0;
    for (let x in localStorage) {
      var amount = (localStorage[x].length * 2) / 1024 / 1024;
      if (!isNaN(amount) && localStorage.hasOwnProperty(x)) {
        total += amount;
      }
    }
    return total.toFixed(2);
  };

  const handleOnlineUser = () => {
    const latestData = []
    const currentData = [...liveData]
    socket.subSocket((err, data) => {
      if (err) console.log('err >>>>> ', err)
      latestData[0] = data.split(',').map(value => parseFloat(value)).filter((value, index) => index < 5)
      currentData.push(...latestData)
      updateLiveData([...currentData])
      setInterval(() => {
        const currntLocalStorageSiz = getLocalStorageSize()
        if (currntLocalStorageSiz > 0.1) {
          localStorage.clear();
        }
      }, 60000)

      localStorage.setItem('liveData', JSON.stringify(currentData))

    })
  }

  useEffect(() => {
    const now = new Date();
    localStorage.setItem('expiry', JSON.stringify(now.getTime()))
    handleOnlineUser();
    window.addEventListener('online', handleOnlineUser);

    return () => {
      socket.unSubSocket();
    }
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        Live Chart
      </header>
      <Charts series={liveData} type="candlestick" options={{ xaxis: { type: 'datetime' }, }} />
    </div>
  );
}

export default LiveChart;
