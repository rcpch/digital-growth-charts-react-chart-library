import React from 'react'
import ChartData from '../src/Chart'

const App = () => {
  return (
          <div className='container'>
              <ChartData sex="female" reference="turnerssyndrome" measurement_method="height"/>
          </div>)
}

export default App