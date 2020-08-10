import React, { useContext, useEffect, useState } from 'react';
import '../App.css';
import Charts from '../components/Charts.js'

import API from '../utils/API'

function HistoricChart() {

  const [historicalData, updateHistoriacalData] = useState([]);


  const handleOnlineUser = () => {
    API.get('historicalsadass',{ params: {
        interval: 1,
      }})
    .then(resp => {
      const renderData = resp.data.map(chandle => {
        return chandle.split(',').map(value => parseFloat(value)).filter( (value, index) => index < 5)
      })
      localStorage.setItem('historicChart', JSON.stringify(renderData))
      updateHistoriacalData(renderData)
    })
    .catch(err => {
        console.log('Error occured while fetching historical data', err)
        if("historicChart" in localStorage)
          updateHistoriacalData(JSON.parse(localStorage.getItem('historicChart')))
    })
  }
  

  useEffect(() => {
    handleOnlineUser();
    window.addEventListener('online', handleOnlineUser);
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        Historial Chart
      </header>
        <Charts series={historicalData} type="candlestick" options= {{xaxis: {type: 'datetime'},}}/>
    </div>
  );
}

export default HistoricChart;
