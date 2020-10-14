import React from 'react'

import RCPCHChartComponent from 'digital-growth-charts-react-chart-component'
import 'digital-growth-charts-react-chart-component/dist/index.css'

const App = () => {
  return <RCPCHChartComponent 
            measurementMethod='weight' 
            sex='male' 
            centilesColour='#0d0c0a' 
            width={700} 
            height={600}
            minimumDecimalAge = {1}
            maximumDecimalAge = {5.5}
            />
}

export default App
