import React, { Component } from 'react'
import styles from './styles.module.css'
import {
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  CartesianGrid,
  Brush,
  ScatterChart,
  Scatter
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

    const chronologicalAgeFormatter = (item) => {
      let returnString = item
      if (item >= 2 && item % 1 === 0.5) {
        returnString = Math.floor(item) + 'y 6 mths'
      }
      if (item < 2) {
        returnString = item * 12 + ' months'
      }
      if (item < 0.5) {
        returnString = (item * 365.25) / 7 + ' weeks'
      }
      if (item <= 0) {
        const weeks = Math.floor((280 - item * 365.25) / 7)
        const remainder = ((280 - item * 365.25) / 7 - weeks) * 7
        returnString = weeks + '+' + remainder + ' weeks'
      }
      return returnString
    }

    const allCentiles = centilesMap.map((centileIndex, index) => {
      if (centileIndex.index % 2 === 0) {
        return (
          <Scatter
            key={index}
            nameKey={centileIndex.reference.label}
            data={centileIndex.reference}
            dataKey='y'
            // type='monotone'
            // dot={false}
            fill='#00000000'
            line={{
              stroke: this.props.centilesColour,
              strokeDasharray: '5 5'
            }}
          />
        )
      } else {
        return (
          <Scatter
            nameKey={centileIndex.reference.label}
            key={index}
            data={centileIndex.reference}
            dataKey='y'
            line={{
              stroke: this.props.centilesColour
            }}
            fill='#00000000'
          />
        )
      }
    })

    const intervalFormatter = (item) => {
      console.log(item)
      return 1
    }

    return (
      <div className={styles.chartContainer}>
        <div className={styles.chartTitle}>
          <h3>{this.state.chartTitle}</h3>
        </div>
        <ScatterChart
          width={this.props.width}
          height={this.props.height}
          margin={{ top: 20, right: 20, bottom: 50, left: 10 }}
        >
          <XAxis
            scale='linear'
            type='number'
            name='Decimal Age'
            dataKey='x'
            allowDecimals={false}
            label={{
              value: this.state.xAxisLabel,
              position: 'bottom'
            }}
            tickFormatter={chronologicalAgeFormatter}
            animationDuration={300}
            domain={['auto', 'auto']}
            interval={intervalFormatter}
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
          <Scatter
            name='childMeasurement'
            data={this.props.measurementsArray}
            stroke='red'
            shape={
              <CustomDataPoint fill={this.props.measurementDataPointColour} />
            }
            line={{
              stroke: this.props.measurementDataPointColour
            }}
          />
          <ZAxis
            range={[15, 15]}
            dataKey='label'
            unit='centile'
            name='Centile'
          />
          <CartesianGrid strokeDasharray='3 3' />
          <Brush dataKey='y' height={30} width={100} stroke='#8884d8' />
          <Tooltip
            content={<CustomTooltip />}
            yAxisLabel={this.props.yAxisLabel}
          />
        </ScatterChart>
        {/* </div> */}
      </div>
    )
  }
}

const CustomDataPoint = (props) => {
  const { cx, cy, fill } = props
  return (
    <g>
      {props.label === 'chronological_age' ? (
        <svg>
          <circle cx={cx} cy={cy} r={2.5} fill={fill} />
        </svg>
      ) : (
        <svg>
          <line
            x1={cx - 2.5}
            y1={cy - 2.5}
            x2={cx + 2.5}
            y2={cy + 2.5}
            stroke='red'
            strokeWidth='2'
          />
          <line
            x1={cx + 2.5}
            y1={cy - 2.5}
            x2={cx - 2.5}
            y2={cy + 2.5}
            stroke={fill}
            strokeWidth='2'
          />
        </svg>
      )}
    </g>
  )
}

const CustomTooltip = ({ active, payload }) => {
  const th = 'th'
  const nd = 'nd'
  const st = 'st'
  let suffix = th

  if (active) {
    if (payload[2] !== undefined) {
      const { value } = payload[2]

      if (payload[2].payload.centile_band !== undefined) {
        return (
          <div className={styles.customTooltip}>
            {payload[1].value} {payload[1].unit}
            {payload[2].payload.label === 'chronological_age' ? (
              <p>Chronological age: {payload[2].payload.x} y</p>
            ) : (
              <p>Corrected age: {payload[2].payload.x} y</p>
            )}
            {payload[2].payload.centile_band}
          </div>
        )
      }

      if (value === 2) {
        suffix = nd
      }
      if (value === 91) {
        suffix = st
      }
      return (
        <div className={styles.customTooltip}>
          {value}
          <sup>{suffix}</sup> centile
        </div>
      )
    } else {
      return (
        <div className={styles.customTooltip}>
          {payload[1].value} {payload[1].unit}
        </div>
      )
    }
  } else {
    return null
  }
}

export default RCPCHChartComponent
