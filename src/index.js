import React, { Component } from 'react'
import styles from './styles.module.css'
import {
  Scatter,
  XAxis,
  YAxis,
  ScatterChart,
  ZAxis,
  Tooltip,
  CartesianGrid,
  Brush,
  ReferenceLine
} from 'recharts'
import maleData from './maleChartData'
import femaleData from './femaleChartData'

const initialState = {
  animation: true,
  sex: 'male',
  xAxisLabel: 'Decimal Age (yrs)',
  yAxisLabel: 'Weight (kg)',
  yAxisUnits: 'kg',
  chartTitle: ''
}
class RCPCHChartComponent extends Component {
  constructor(props) {
    super(props)
    this.state = initialState
    let title = ''
    let data = maleData
    if (this.props.sex === 'male') {
      title = 'Boys'
    } else {
      title = 'Girls'
      data = femaleData
    }

    switch (this.props.measurementMethod) {
      case 'height':
        title += ' - Length/Height Chart'
        this.state = {
          centiles: data.centile_data.height,
          yAxisLabel: 'Length/Height (cm)',
          yAxisUnits: 'cm',
          chartTitle: title
        }
        break
      case 'weight':
        title += ' - Weight Chart'
        this.state = {
          centiles: data.centile_data.weight,
          yAxisLabel: 'Weight (kg)',
          yAxisUnits: 'kg',
          chartTitle: title
        }
        break
      case 'bmi':
        title += ' - Body Mass Index Chart'
        this.state = {
          centiles: data.centile_data.bmi,
          yAxisLabel: 'BMI (kg/m2)',
          chartTitle: title
        }
        break
      case 'ofc':
        title += 'Head Circumference Chart'
        this.state = {
          centiles: data.centile_data.ofc,
          yAxisLabel: 'Head Circumference (cm)',
          yAxisUnits: 'cm',
          chartTitle: title
        }
        break
      default:
        break
    }
  }

  render() {
    const { centiles } = this.state
    return (
      <div className={styles.chartContainer}>
        <h3>{this.state.chartTitle}</h3>
        <ScatterChart
          width={this.props.width}
          height={this.props.height}
          margin={{ top: 20, right: 20, bottom: 30, left: 10 }}
        >
          <XAxis
            scale='time'
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
          <ZAxis
            range={[1, 1]}
            stroke={this.props.centilesColour}
            dataKey='label'
            unit=' centile'
          />
          <CartesianGrid strokeDasharray='3 3' />
          <ReferenceLine y={0} stroke='#000' />
          <Brush dataKey='y' height={30} width={100} stroke='#8884d8' />
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
          <Tooltip cursor={{strokeDasharray: '3 3'}}/>
        </ScatterChart>
      </div>
    )
  }
}

const RenderNoShape = (props) => {
  return null
}

export default RCPCHChartComponent
