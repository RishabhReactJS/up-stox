import React, {useContext} from "react";
import Chart from 'react-apexcharts'
import {ThemeContext} from '../context/ThemeContext'

const Charts = (props) => {
    const {selectedTheme} = useContext(ThemeContext);
    return(
        <div className="App" style={{background:selectedTheme.background, color: selectedTheme.color}}>
            <Chart options={props.options} series={[{data: props.series}]} type={props.type} height={320} width={800} />
        </div>
    )
}

export default Charts;