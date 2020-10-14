# digital-growth-charts-react-chart-component

> RCPCH Digital Growth Charts rendered as a react component

[![NPM](https://img.shields.io/npm/v/digital-growth-charts-react-chart-component.svg)](https://www.npmjs.com/package/digital-growth-charts-react-chart-component) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

The Royal College of Paediatrics (RCPCH) have developed an API to perform centile and SDS calculations on growth measurements for UK children. To support the development of any clients that use the RPCPCHGrowth API to render growth charts, this is a charting library offered as a guide or template to developers wishing to produce their own. It meets the recommendations of the RCPCH Growth Chart API Project Board. 

Documentation is [here](currently a deadlink).

Please submit issues and pull requests to help us improve this new project.

## Install

```bash
npm install --save digital-growth-charts-react-chart-component
```

## Usage

```jsx
import React, { Component } from 'react'

import MyComponent from 'digital-growth-charts-react-chart-component'
import 'digital-growth-charts-react-chart-component/dist/index.css'

class MyGrowthChartApp extends Component {
  render() {
    return <RCPCHChartComponent
            measurementMethod='weight'
            sex='male'
            centilesColour='#0d0c0a'
            width={700}
            height={600}
            minimumDecimalAge = {1}
            maximumDecimalAge = {5.5}
            growthData = {rcpchGrowthAPIData}
     />
  }
}
```

## License

GNU Affero Public Licence © [RCPCH](https://github.com/rcpch)
