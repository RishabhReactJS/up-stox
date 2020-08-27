import React, { useContext, useEffect, useState } from 'react';
import '../App.css';
import Charts from '../components/Charts.js'
import {ThemeContext} from '../context/ThemeContext'

import API from '../utils/API'

function HistoricChart(props) {

  const [historicalData, updateHistoriacalData] = useState([]);
  
  const handleOnlineUser = () => {
    API.get('historical', {
      params: {
        interval: 1,
      }
    })
      .then(resp => {
        const renderData = resp.data.map(chandle => {
          return chandle.split(',').map(value => parseFloat(value)).filter((value, index) => index < 5)
        })
        localStorage.setItem('historicChart', JSON.stringify(renderData))
        updateHistoriacalData(renderData)
      })
      .catch(err => {
        console.log('Error occured while fetching historical data', err)
        if ("historicChart" in localStorage)
          updateHistoriacalData(JSON.parse(localStorage.getItem('historicChart')))
      })
  }

  useEffect(() => {
    handleOnlineUser();
    window.addEventListener('online', handleOnlineUser);
  }, [])

  const {selectedTheme} = useContext(ThemeContext);

  return (
    <div className="App" style={{background:selectedTheme.background, color: selectedTheme.color}}>
      <header className="App-header">
        Historial Chart
      </header>
      <div className='Chart-container'>
      <Charts series={historicalData} type="candlestick" options={{ xaxis: { type: 'datetime' }, }} />
      </div>
    </div>
  );
}

export default HistoricChart;
