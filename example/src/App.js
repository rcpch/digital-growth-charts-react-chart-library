import React from 'react'
import ChartData from '../src/Chart'

const App = () => {
  return (
          <div className='container'>
            {/* <RCPCHChartComponent 
              measurementMethod='height' 
              sex='female' 
              centilesColour='#0d0c0a' 
              width={700} 
              height={600}
              measurementsArray = {[{'x': -0.045, 'y': 60.0, 'label': 'corrected_age', 'centile_band': 'Above 99.6th centile.'}, {'x': 0.2, 'y': 60.0, 'label':'chronological_age', 'centile_band':'Between 7th and 91st centiles.'}]}
              measurementsSDSArray = {[{'x': 2.5872689938398357, 'y': 7.965898960985831}, {'x': 2.5872689938398357, 'y': 7.965898960985831}]}
              measurementDataPointColour = 'red'
              /> */}
              <ChartData />
          </div>)
}

export default App