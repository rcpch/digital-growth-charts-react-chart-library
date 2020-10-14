import React, { Component } from 'react'
import styles from './styles.module.css'
import {
  Scatter,
  XAxis,
  YAxis,
  ScatterChart,
  ZAxis,
  Tooltip
} from 'recharts'
import data from './chartdata'

class RCPCHChartComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // measurementMethod: this.props.measurementMethod,
      sex: 'male',
      refAreaLeft: '',
      refAreaRight: '',
      left: 'dataMin',
      right: 'dataMax',
      top: 'dataMax+1',
      bottom: 'dataMin',
      top2: 'dataMax+50',
      bottom2: 'dataMin+50',
      xAxisLabel: 'Decimal Age (yrs)',
      yAxisLabel: 'Weight (kg)',
      yAxisUnits: 'kg'
    }
  }

  render() {
    let centiles = []
    let yAxisLabel = ''
    let yAxisUnits = ''
    let title = ''
    if (this.props.sex === 'male') {
      title = 'Boys'
    } else {
      title = 'Girls'
    }

    switch (this.props.measurementMethod) {
      case 'height':
        centiles = data.centile_data.height
        yAxisLabel = 'Length/Height (cm)'
        yAxisUnits = 'cm'
        title += ' - Length/Height Chart'
        break
      case 'weight':
        centiles = data.centile_data.weight
        yAxisLabel = 'Weight (kg)'
        yAxisUnits = 'kg'
        title += ' - Weight Chart'
        break
      case 'bmi':
        centiles = data.centile_data.bmi
        yAxisLabel = 'BMI (kg/m2)'
        yAxisUnits = 'kg/m2'
        title += ' - Body Mass Index Chart'
        break
      case 'ofc':
        centiles = data.centile_data.ofc
        yAxisLabel = 'Head Circumference (cm)'
        yAxisUnits = 'cm'
        title += 'Head Circumference Chart'
        break
      default:
        break
    }

    const {
      barIndex,
      left,
      right,
      refAreaLeft,
      refAreaRight,
      top,
      bottom,
      top2,
      bottom2
    } = this.state

    return (
      <div className={styles.chartContainer}>
        <h3>{title}</h3>
        <ScatterChart
          width={this.props.width}
          height={this.props.height}
          margin={{ top: 20, right: 20, bottom: 30, left: 10 }}
        >
          <XAxis
            scale='time'
            type='number'
            dataKey='x'
            domain={[left, right]}
            allowDecimals={false}
            // interval='preserveStartEnd'
            label={{
              value: this.state.xAxisLabel,
              position: 'bottom'
            }}
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
          />
          <ZAxis
            range={[1, 1]}
            stroke={this.props.centilesColour}
            dataKey='label'
            unit=' centile'
          />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            wrapperStyle={{ width: 100, backgroundColor: '#ccc' }}
          />
          {/* 0.4th */}
          <Scatter
            name={centiles[0].centiles}
            data={centiles[0].uk90_preterm_data}
            line={{
              stroke: this.props.centilesColour,
              strokeWidth: 1,
              strokeDasharray: '5 10'
            }}
            shape={<RenderNoShape />}
          />
          <Scatter
            name={centiles[0].centiles}
            data={centiles[0].who_infant_data}
            line={{
              stroke: this.props.centilesColour,
              strokeWidth: 1,
              strokeDasharray: '5 10'
            }}
            shape={<RenderNoShape />}
          />
          <Scatter
            name={centiles[0].centiles}
            data={centiles[0].who_child_data}
            line={{
              stroke: this.props.centilesColour,
              strokeWidth: 1,
              strokeDasharray: '5 10'
            }}
            shape={<RenderNoShape />}
          />
          <Scatter
            name={centiles[0].centiles}
            data={centiles[0].uk90_child_data}
            line={{
              stroke: this.props.centilesColour,
              strokeWidth: 1,
              strokeDasharray: '5 10'
            }}
            shape={<RenderNoShape />}
          />
          {/* 2nd Centile */}
          <Scatter
            name={centiles[1].centiles}
            data={centiles[1].uk90_preterm_data}
            line={{ stroke: this.props.centilesColour, strokeWidth: 1 }}
            shape={<RenderNoShape />}
          />
          <Scatter
            name={centiles[1].centiles}
            data={centiles[1].who_infant_data}
            line={{ stroke: this.props.centilesColour, strokeWidth: 1 }}
            shape={<RenderNoShape />}
          />
          <Scatter
            name={centiles[1].centiles}
            data={centiles[1].who_child_data}
            line={{ stroke: this.props.centilesColour, strokeWidth: 1 }}
            shape={<RenderNoShape />}
          />
          <Scatter
            name={centiles[1].centiles}
            data={centiles[1].uk90_child_data}
            line={{ stroke: this.props.centilesColour, strokeWidth: 1 }}
            shape={<RenderNoShape />}
          />
          {/* 9th Centile */}
          <Scatter
            name={centiles[2].centiles}
            data={centiles[2].uk90_preterm_data}
            line={{
              stroke: this.props.centilesColour,
              strokeWidth: 1,
              strokeDasharray: '5 10'
            }}
            shape={<RenderNoShape />}
          />
          <Scatter
            name={centiles[2].centiles}
            data={centiles[2].who_infant_data}
            line={{
              stroke: this.props.centilesColour,
              strokeWidth: 1,
              strokeDasharray: '5 10'
            }}
            shape={<RenderNoShape />}
          />
          <Scatter
            name={centiles[2].centiles}
            data={centiles[2].who_child_data}
            line={{
              stroke: this.props.centilesColour,
              strokeWidth: 1,
              strokeDasharray: '5 10'
            }}
            shape={<RenderNoShape />}
          />
          <Scatter
            name={centiles[2].centiles}
            data={centiles[2].uk90_child_data}
            line={{
              stroke: this.props.centilesColour,
              strokeWidth: 1,
              strokeDasharray: '5 10'
            }}
            shape={<RenderNoShape />}
          />
          {/* 25th Centile */}
          <Scatter
            name={centiles[3].centiles}
            data={centiles[3].uk90_preterm_data}
            line={{ stroke: this.props.centilesColour, strokeWidth: 1 }}
            shape={<RenderNoShape />}
          />
          <Scatter
            name={centiles[3].centiles}
            data={centiles[3].who_infant_data}
            line={{ stroke: this.props.centilesColour, strokeWidth: 1 }}
            shape={<RenderNoShape />}
          />
          <Scatter
            name={centiles[3].centiles}
            data={centiles[3].who_child_data}
            line={{ stroke: this.props.centilesColour, strokeWidth: 1 }}
            shape={<RenderNoShape />}
          />
          <Scatter
            name={centiles[3].centiles}
            data={centiles[3].uk90_child_data}
            line={{ stroke: this.props.centilesColour, strokeWidth: 1 }}
            shape={<RenderNoShape />}
          />
          {/* 50th Centile */}
          <Scatter
            name={centiles[4].centiles}
            data={centiles[4].uk90_preterm_data}
            line={{
              stroke: this.props.centilesColour,
              strokeWidth: 1,
              strokeDasharray: '5 10'
            }}
            shape={<RenderNoShape />}
          />
          <Scatter
            name={centiles[4].centiles}
            data={centiles[4].who_infant_data}
            line={{
              stroke: this.props.centilesColour,
              strokeWidth: 1,
              strokeDasharray: '5 10'
            }}
            shape={<RenderNoShape />}
          />
          <Scatter
            name={centiles[4].centiles}
            data={centiles[4].who_child_data}
            line={{
              stroke: this.props.centilesColour,
              strokeWidth: 1,
              strokeDasharray: '5 10'
            }}
            shape={<RenderNoShape />}
          />
          <Scatter
            name={centiles[4].centiles}
            data={centiles[4].uk90_child_data}
            line={{
              stroke: this.props.centilesColour,
              strokeWidth: 1,
              strokeDasharray: '5 10'
            }}
            shape={<RenderNoShape />}
          />
          {/* 75th Centile */}
          <Scatter
            name={centiles[5].centiles}
            data={centiles[5].uk90_preterm_data}
            line={{ stroke: this.props.centilesColour, strokeWidth: 1 }}
            shape={<RenderNoShape />}
          />
          <Scatter
            name={centiles[5].centiles}
            data={centiles[5].who_infant_data}
            line={{ stroke: this.props.centilesColour, strokeWidth: 1 }}
            shape={<RenderNoShape />}
          />
          <Scatter
            name={centiles[5].centiles}
            data={centiles[5].who_child_data}
            line={{ stroke: this.props.centilesColour, strokeWidth: 1 }}
            shape={<RenderNoShape />}
          />
          <Scatter
            name={centiles[5].centiles}
            data={centiles[5].uk90_child_data}
            line={{ stroke: this.props.centilesColour, strokeWidth: 1 }}
            shape={<RenderNoShape />}
          />
          {/* 91st Centile */}
          <Scatter
            name={centiles[6].centiles}
            data={centiles[6].uk90_preterm_data}
            line={{
              stroke: this.props.centilesColour,
              strokeWidth: 1,
              strokeDasharray: '5 10'
            }}
            shape={<RenderNoShape />}
          />
          <Scatter
            name={centiles[6].centiles}
            data={centiles[6].who_infant_data}
            line={{
              stroke: this.props.centilesColour,
              strokeWidth: 1,
              strokeDasharray: '5 10'
            }}
            shape={<RenderNoShape />}
          />
          <Scatter
            name={centiles[6].centiles}
            data={centiles[6].who_child_data}
            line={{
              stroke: this.props.centilesColour,
              strokeWidth: 1,
              strokeDasharray: '5 10'
            }}
            shape={<RenderNoShape />}
          />
          <Scatter
            name={centiles[6].centiles}
            data={centiles[6].uk90_child_data}
            line={{
              stroke: this.props.centilesColour,
              strokeWidth: 1,
              strokeDasharray: '5 10'
            }}
            shape={<RenderNoShape />}
          />
          {/* 98th Centile */}
          <Scatter
            name={centiles[7].centiles}
            data={centiles[7].uk90_preterm_data}
            line={{ stroke: this.props.centilesColour, strokeWidth: 1 }}
            shape={<RenderNoShape />}
          />
          <Scatter
            name={centiles[7].centiles}
            data={centiles[7].who_infant_data}
            line={{ stroke: this.props.centilesColour, strokeWidth: 1 }}
            shape={<RenderNoShape />}
          />
          <Scatter
            name={centiles[7].centiles}
            data={centiles[7].who_child_data}
            line={{ stroke: this.props.centilesColour, strokeWidth: 1 }}
            shape={<RenderNoShape />}
          />
          <Scatter
            name={centiles[7].centiles}
            data={centiles[7].uk90_child_data}
            line={{ stroke: this.props.centilesColour, strokeWidth: 1 }}
            shape={<RenderNoShape />}
          />
          {/* 99.6th Centile */}
          <Scatter
            name={centiles[8].centiles}
            data={centiles[8].uk90_preterm_data}
            line={{
              stroke: this.props.centilesColour,
              strokeWidth: 1,
              strokeDasharray: '5 10'
            }}
            shape={<RenderNoShape />}
          />
          <Scatter
            name={centiles[8].centiles}
            data={centiles[8].who_infant_data}
            line={{
              stroke: this.props.centilesColour,
              strokeWidth: 1,
              strokeDasharray: '5 10'
            }}
            shape={<RenderNoShape />}
          />
          <Scatter
            name={centiles[8].centiles}
            data={centiles[8].who_child_data}
            line={{
              stroke: this.props.centilesColour,
              strokeWidth: 1,
              strokeDasharray: '5 10'
            }}
            shape={<RenderNoShape />}
          />
          <Scatter
            name={centiles[8].centiles}
            data={centiles[8].uk90_child_data}
            line={{
              stroke: this.props.centilesColour,
              strokeWidth: 1,
              strokeDasharray: '5 10'
            }}
            shape={<RenderNoShape />}
          />
        </ScatterChart>
      </div>
    )
  }
}

const RenderNoShape = (props) => {
  return null
}

export default RCPCHChartComponent
