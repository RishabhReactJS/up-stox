import React, { useContext, useEffect, useState } from 'react';
import '../App.css';
import socket from '../utils/socketConfig'
import { isArray } from 'util';
import Charts from '../components/Charts.js'


function LiveChart() {

  const [liveData, updateLiveData] = useState(JSON.parse(localStorage.getItem('liveData')) || []);

  const grapLables =   [
    {
      type: "string",
      id: "Date"
    },
    {
      type: "number",
      label: "open"
    },
    {
      type: "number",
      label: "high"
    },
    {
      type: "number",
      label: "low"
    },
    {
      type: "number",
      label: "close"
    },
    // {
    //   type: "number",
    //   label: "volume"
    // },
  ]

  const handleOnlineUser = () => {
      const latestData = []
      const currentData = [...liveData]
      socket.subSocket((err, data) => {
          if(err) console.log('err >>>>> ', err)
          latestData[0] = data.split(',').map(value => parseFloat(value)).filter( (value, index) => index < 5)
          currentData.push(...latestData)
          updateLiveData([...currentData])
          localStorage.setItem('liveData', JSON.stringify(currentData))
          
    })
}
  
  const handleOfflineUser = () => {
    console.log('user is Offline loacal storage', localStorage.getItem('liveData'))
    updateLiveData(JSON.parse(localStorage.getItem('liveData')))
  }

  useEffect(() => {
    handleOnlineUser();
    window.addEventListener('online', handleOnlineUser);

    return () => {
        console.log('trigggering unSubSocket ', liveData)
        socket.unSubSocket();
    }
  }, [])


  return (
    <div className="App">
    <header className="App-header">
      Live Chart
      </header>
        <Charts series={liveData} type="candlestick" options= {{xaxis: {type: 'datetime'},}}/>
    </div>
  );
}

export default LiveChart;
