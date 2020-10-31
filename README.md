# RCPCHChartComponent

> RCPCH Digital Growth Charts rendered as a react component

[![NPM](https://img.shields.io/npm/v/digital-growth-charts-react-chart-component.svg)](https://github.com/rcpch/digital-growth-charts-react-chart-library) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

The Royal College of Paediatrics (RCPCH) have developed an API to perform centile and SDS calculations on growth measurements for UK children. To support the development of any clients that use the RPCPCHGrowth API to render growth charts, this is a charting library offered as a guide or template to developers wishing to produce their own. It meets the recommendations of the RCPCH Growth Chart API Project Board. 

Documentation is [here](currently a deadlink).

Please submit issues and pull requests to help us improve this new project.

## Install

```bash
npm install --save rcpch/digital-growth-charts-react-chart-library
```

or add to package.json

```jsx
{
  "dependencies": "@rcpch/digital-growth-charts-react-chart-library": "git+https://github.com/rcpch/digital-growth-charts-react-chart-library.git",
}

```

## Usage

```jsx
import React, { Component } from 'react'

import RCPCHChartComponent from 'digital-growth-charts-react-chart-component'

class MyGrowthChartApp extends Component {
  render() {
    return <RCPCHChartComponent 
        measurementMethod='bmi' 
        sex={this.state.sex} 
        centilesColour='#0d0c0a' 
        width={700} 
        height={600}
        measurementsArray = {this.state.bmis}
        measurementsSDSArray = {this.state.bmi_SDS}
        measurementDataPointColour = 'red'
    />
  }
}
```


## License

MIT © [RCPCH](https://github.com/rcpch)
