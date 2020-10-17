import React from 'react'

import RCPCHChartComponent from 'digital-growth-charts-react-chart-component'
import 'digital-growth-charts-react-chart-component/dist/index.css'

const App = () => {
  return <RCPCHChartComponent 
            measurementMethod='height' 
            sex='female' 
            centilesColour='#0d0c0a' 
            width={700} 
            height={600}
            measurementsArray = {[{'x': -0.02, 'y': 120.0}, {'x': -0.02, 'y': 120.0}]}
            measurementsSDSArray = {[{'x': 2.5872689938398357, 'y': 7.965898960985831}, {'x': 2.5872689938398357, 'y': 7.965898960985831}]}
            />
}

export default App
