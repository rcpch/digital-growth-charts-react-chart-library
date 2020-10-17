import React, { Component } from 'react'
import styles from './styles.module.css'
import {
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  CartesianGrid,
  Brush,
  LineChart,
  Line
} from 'recharts'
import maleData from './maleChartData'
import femaleData from './femaleChartData'

/*
  Should receive data points in this format from API
  {'child_data': 
    {'bmi_sds': [{'x': 2.5872689938398357, 'y': -6.324286089179686}, {'x': 2.5872689938398357, 'y': -6.324286089179686}], 
    'bmis': [{'x': 2.5872689938398357, 'y': 9.722222222222223}, {'x': 2.5872689938398357, 'y': 9.722222222222223}], 
    'height_sds': [{'x': 2.5872689938398357, 'y': 7.965898960985831}, {'x': 2.5872689938398357, 'y': 7.965898960985831}], 
    'heights': [{'x': 2.5872689938398357, 'y': 120.0}, {'x': 2.5872689938398357, 'y': 120.0}], 
    'ofc_sds': [{'x': 2.5872689938398357, 'y': 2.809894553629454}, {'x': 2.5872689938398357, 'y': 2.809894553629454}], 
    'ofcs': [{'x': 2.5872689938398357, 'y': 52.0}, {'x': 2.5872689938398357, 'y': 52.0}], 
    'weight_sds': [{'x': 2.5872689938398357, 'y': 0.6336087835772052}, {'x': 2.5872689938398357, 'y': 0.6336087835772052}], 
    'weights': [{'x': 2.5872689938398357, 'y': 14.0}, {'x': 2.5872689938398357, 'y': 14.0}]}, 
    'sex': 'female'}

    These are passed from the client app to the chart library as measurementsArray and measurementsSDSArray props.
  
    the sds values for each measurement method are x for decimal age, y for sds
    the measurements for each measurement method are x for decimal age, y for measurement
    each measurement and each sds has 2 decimal ages: one corrected and one chronological
    each array of values should be plotted as a series so they can be joined by a line

    TODO - API needs also to return centile advice string for measurement
*/

class RCPCHChartComponent extends Component {
  constructor(props) {
    super(props)
    let title = ''
    let data = maleData
    if (this.props.sex === 'male') {
      title = 'Boys'
    } else {
      title = 'Girls'
      data = femaleData
    }

    const maxAge = Math.max.apply(
      Math,
      this.props.measurementsArray.map(function (o) {
        return o.x
      })
    )
    const minAge = Math.min.apply(
      Math,
      this.props.measurementsArray.map(function (o) {
        return o.x
      })
    )

    switch (this.props.measurementMethod) {
      case 'height':
        title += ' - Length/Height Chart'
        this.state = {
          centiles: data.centile_data.height,
          xAxisLabel: 'Decimal Age (yrs)',
          yAxisLabel: 'Length/Height (cm)',
          yAxisUnits: 'cm',
          chartTitle: title,
          minAge: minAge,
          maxAge: maxAge
        }
        break
      case 'weight':
        title += ' - Weight Chart'
        this.state = {
          centiles: data.centile_data.weight,
          xAxisLabel: 'Decimal Age (yrs)',
          yAxisLabel: 'Weight (kg)',
          yAxisUnits: 'kg',
          chartTitle: title,
          minAge: minAge,
          maxAge: maxAge
        }
        break
      case 'bmi':
        title += ' - Body Mass Index Chart'
        this.state = {
          centiles: data.centile_data.bmi,
          xAxisLabel: 'Decimal Age (yrs)',
          yAxisLabel: 'BMI (kg/m2)',
          chartTitle: title,
          minAge: minAge,
          maxAge: maxAge
        }
        break
      case 'ofc':
        title += 'Head Circumference Chart'
        this.state = {
          centiles: data.centile_data.ofc,
          xAxisLabel: 'Decimal Age (yrs)',
          yAxisLabel: 'Head Circumference (cm)',
          yAxisUnits: 'cm',
          chartTitle: title,
          minAge: minAge,
          maxAge: maxAge
        }
        break
      default:
        this.state = {
          centiles: data.centile_data.height,
          sex: 'male',
          xAxisLabel: 'Decimal Age (yrs)',
          yAxisLabel: 'Length/Height (cm)',
          yAxisUnits: 'cm',
          chartTitle: "Boys' " + title,
          minAge: minAge,
          maxAge: maxAge
        }
        break
    }
  }

  render() {
    const { centiles } = this.state
    const centilesMap = []
    for (let j = 0; j < 9; j++) {
      if (this.state.minAge < 0) {
        centilesMap.push({ index: j, reference: centiles[j].uk90_preterm_data })
      }
      if (this.state.minAge < 2) {
        centilesMap.push({ index: j, reference: centiles[j].who_infant_data })
      }
      if (this.state.minAge < 4) {
        centilesMap.push({ index: j, reference: centiles[j].who_child_data })
      } else {
        centilesMap.push({ index: j, reference: centiles[j].uk90_child_data })
      }
    }

    const allCentiles = centilesMap.map((centileIndex, index) => {
      if (centileIndex.index % 2 === 0) {
        return (
          <Line
            key={index}
            data={centileIndex.reference}
            dataKey='y'
            type='monotone'
            strokeDasharray='5 5'
            dot={false}
          />
        )
      } else {
        return (
          <Line
            key={index}
            data={centileIndex.reference}
            dataKey='y'
            type='monotone'
            // strokeDasharray='5 5'
            dot={false}
          />
        )
      }
    })

    return (
      <div className={styles.chartContainer}>
        <h3>{this.state.chartTitle}</h3>
        <LineChart
          width={this.props.width}
          height={this.props.height}
          margin={{ top: 20, right: 20, bottom: 50, left: 10 }}
        >
          <XAxis
            scale='linear'
            type='number'
            dataKey='x'
            allowDecimals={false}
            label={{
              value: this.state.xAxisLabel,
              position: 'bottom'
            }}
            animationDuration={300}
          />
          <YAxis
            dataKey='y'
            type='number'
            name={this.props.measurementMethod}
            unit={' ' + this.state.yAxisUnits}
            label={{
              value: this.state.yAxisLabel,
              angle: -90,
              position: 'left'
            }}
            animationDuration={300}
          />
          {allCentiles}
          <ZAxis range={[5, 5]} dataKey='label' unit='centile' />
          <CartesianGrid strokeDasharray='3 3' />
          <Brush dataKey='y' height={30} width={100} stroke='#8884d8' />
        </LineChart>
      </div>
    )
  }
}

const CustomTooltip = ({ active, payload }) => {
  const th = 'th'
  const nd = 'nd'
  const st = 'st'
  let suffix = th

  if (active) {
    if (payload[2].value === 2) {
      suffix = nd
    }
    if (payload[2].value === 91) {
      suffix = st
    }
    return (
      <div className={styles.customTooltip}>
        {payload[2].value}
        <sup>{suffix}</sup> centile
      </div>
    )
  } else {
    return null
  }
}

export default RCPCHChartComponent
