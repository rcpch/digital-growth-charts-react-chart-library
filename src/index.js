/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import styles from './styles.module.css'
import {
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  ScatterChart,
  Scatter,
  CartesianGrid
} from 'recharts'

import maleHeightData from './boys_height'
import maleWeightData from './boys_weight'
import maleOFCData from './boys_ofc'
import maleBMIData from './boys_bmi'
import femaleBMIData from './girls_bmi'
import femaleOFCData from './girls_ofc'
import femaleWeightData from './girls_weight'
import femaleHeightData from './girls_height'



/*
  Should receive data points in this format from API
  {'child_data': 
    {'bmi_sds': [...], 
    'bmis': [...], 
    'height_sds': [...], 
    'heights': [...], 
    'ofc_sds': [...], 
    'ofcs': [...], 
    'weight_sds': [...], 
    'weights': [...]}, 
    'sex': 'female'}


  the objects within the arrays are 2 object arrays - one for chronological and one for corrected age
    [
      {
        "calendar_age": null,
        "centile_band": "This height measurement is above the normal range.",
        "centile_value": 100,
        "corrected_gestation_days": null,
        "corrected_gestation_weeks": null,
        "label": "corrected_age",
        "x": 3.7180013689253935,
        "y": 125
      },
      {
        "calendar_age": "3 years, 8 months, 2 weeks and 6 days",
        "centile_band": "This height measurement is above the normal range.",
        "centile_value": 100,
        "corrected_gestation_days": null,
        "corrected_gestation_weeks": null,
        "label": "chronological_age",
        "x": 3.7180013689253935,
        "y": 125
      }
    ]

    These are passed from the client app to the chart library as measurementsArray and measurementsSDSArray props.
  
    the sds values for each measurement method are x for decimal age, y for sds
    the measurements for each measurement method are x for decimal age, y for measurement
    each measurement and each sds has 2 decimal ages: one corrected and one chronological
    each array of values should be plotted as a series so they can be joined by a line

*/

/*
    The centiles are rendered from the data files bundled into the package (femaleChartData.js and maleChartData.js).
    They are hardcoded and therefore can only be used if the intention is to use UK-WHO references

    The centile data are stored in the centiles object in state (the correct one for sex is chosen based on the 
    sex prop passed in from the client). The data structure is:
    is an array centiles[0...9]. Each object in the array follows the structure:
    {
      centile: 0.4,
      sds: -2.66
      uk90_preterm_data: [{
        label: 0.4,
        x: ... // this is the age
        y: ... // this is the measurement
      }],
      who_infant_data:[...],
      who_child_data: [...],
      uk90_child_data: [...]
    }
    Each centile makes up an object in the array (9 centiles = 9 centile objects)
    Each centile object is made up for 4 arrays of plottable data, one for each reference
*/

class RCPCHChartComponent extends Component {
  constructor(props) {
    super(props)
    let title = ''
    if (this.props.sex === 'male') {
      title = 'Boys'
    } else {
      title = 'Girls'
    }

    // This section works out the earliest and latest dates which are going to need to be plotted
    const minAge = this.props.measurementsArray[0][0].x
    let maxAge = 0.0
    const finalItemInMeasurementsArray = this.props.measurementsArray[
      this.props.measurementsArray.length - 1
    ]
    if (finalItemInMeasurementsArray.length > 1) {
      // any ages where chronological and corrected are the same, will have the corrected age removed
      // and therefore array of pairs will only have a single measurement in it to plot.
      // This method assumes measurements are provide in order - this could be a vulnerability that needs testing
      maxAge = finalItemInMeasurementsArray[1].x
    } else {
      maxAge = finalItemInMeasurementsArray[0].x
    }

    let data=[]

    switch (this.props.measurementMethod) {
      case 'height':
        title += ' - Length/Height Chart'
        if (this.props.sex === 'male'){
          data = maleHeightData
        } else {
          data = femaleHeightData
        }
        this.state = {
          centiles: data.centile_data.height,
          xAxisLabel: 'Decimal Age (yrs)',
          yAxisLabel: 'Length/Height (cm)',
          yAxisUnits: 'cm',
          chartTitle: title,
          minAge: minAge,
          maxAge: maxAge,
          centileCollection: []
        }
        break
      case 'weight':
        title += ' - Weight Chart'
        if (this.props.sex === 'male'){
          data = maleWeightData
        } else {
          data = femaleWeightData
        }
        this.state = {
          centiles: data.centile_data.weight,
          xAxisLabel: 'Decimal Age (yrs)',
          yAxisLabel: 'Weight (kg)',
          yAxisUnits: 'kg',
          chartTitle: title,
          minAge: minAge,
          maxAge: maxAge,
          centileCollection: []
        }
        break
      case 'bmi':
        title += ' - Body Mass Index Chart'
        if (this.props.sex === 'male'){
          data = maleBMIData
        } else {
          data = femaleBMIData
        }
        this.state = {
          centiles: data.centile_data.bmi,
          xAxisLabel: 'Decimal Age (yrs)',
          yAxisLabel: 'BMI (kg/m²)',
          yAxisUnits: 'kg/m²',
          chartTitle: title,
          minAge: minAge,
          maxAge: maxAge,
          centileCollection: []
        }
        break
      case 'ofc':
        title += ' - Head Circumference Chart'
        if (this.props.sex === 'male'){
          data = maleOFCData
        } else {
          data = femaleOFCData
        }
        this.state = {
          centiles: data.centile_data.ofc,
          xAxisLabel: 'Decimal Age (yrs)',
          yAxisLabel: 'Head Circumference (cm)',
          yAxisUnits: 'cm',
          chartTitle: title,
          minAge: minAge,
          maxAge: maxAge,
          centileCollection: []
        }
        break
      default:
        break
    }

  }

  render() {

    const weeksXAxis = (<XAxis
      xAxisId='weeks'
      axisLine
      scale='linear'
      type='number'
      name='weeks'
      dataKey='x'
      tick={weeksTicks}
      label={{
        value: "Weeks",
        position: 'bottom'
      }}
      interval={2}
    />)
        

    const { centiles } = this.state
    // let referenceUpperAgeThreshold = 0.038329911
    // let referenceLowerAgeThreshold = -0.038329911
    const centilesMap = []
    const xAxes = []
    // Creates an array of the centile line plots that are needed depending on the age 
    // of the child.
    for (let j = 0; j < 9; j++) {
      // stores the centile data for the age bracket of child in an array centilesMap
      if (this.state.minAge < 0.038329911) {
        // 42 weeks gestation == 0.038329911: use UK90 preterm data
        centilesMap.push({ index: j, reference: centiles[j].uk90_preterm_data })
       xAxes.push('UK90_preterm')
      }
      if (
        this.state.minAge >= 0.038329911 ||
        this.state.maxAge >= 0.038329911
      ) {
        // over 2 weeks but under 2 years - add WHO infant data
        centilesMap.push({ index: j, reference: centiles[j].who_infant_data })
        // referenceUpperAgeThreshold = 2
        xAxes.push('uk_who_infants')
      }
      if (this.state.minAge >= 2 || this.state.maxAge >= 2) {
        // over 2 y and under 4 years - use WHO child data
        centilesMap.push({ index: j, reference: centiles[j].who_child_data })
        // referenceUpperAgeThreshold = 4
        xAxes.push('uk_who_children')
      }
      if (this.state.minAge >= 4 || this.state.maxAge >= 4) {
        // for everyone else, use UK90 child data
        centilesMap.push({ index: j, reference: centiles[j].uk90_child_data })
        // referenceUpperAgeThreshold = 20
      }
    }

    const allCentileScatters = centilesMap.map((centileIndex, index) => {
      // creates a scatter series for each centile family selected, based on the child's age,
      // stored in the centilesMap array. Lines are alternate dashed and continuous lines
      
      if (centileIndex.index % 2 === 0) {
        return (
          <Scatter
            key={index}
            // nameKey='l'
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
            // nameKey='l'
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

    

    const allMeasurementScatters = this.props.measurementsArray.map(
      (measurementPair, index) => {
        // iterates through each supplied child measurement and returns a scatter series for each data pair
        // One value for chronological age, one for corrected age.
        // If there is no corrected age, only a dot is rendered, otherwise a cross is returned
        //  for the corrected age, connected by a line to the chronological age value rendered as a dot.

        if (
          measurementPair.length > 1 &&
          measurementPair[0].x === measurementPair[1].x
        ) {
          // no correction for gestational age has been made
          // remove the first value of the pair (corrected age)
          // to prevent plotting a cross ontop of a dot
          measurementPair.splice(0, 1)
        }

        return (
          <Scatter
            key={'measurement: ' + index}
            name='childMeasurement'
            data={measurementPair}
            stroke='red'
            shape={
              <CustomDataPoint fill={this.props.measurementDataPointColour} />
            }
            line={{
              stroke: this.props.measurementDataPointColour
            }}
          />
        )
      }
    )

    return (
      // Returns the chart with axes, centiles and child data, label data, grid and tooltip
      <div className={styles.chartContainer}>
        <div className={styles.chartTitle}>
          <h3>{this.state.chartTitle}</h3>
        </div>
        <ScatterChart
          width={this.props.width}
          height={this.props.height}
          margin={{ top: 20, right: 20, bottom: 50, left: 10 }}
        >
          {allCentileScatters}
          {allMeasurementScatters}
          <CartesianGrid/>
          <XAxis
            // xAxisId="months"
            axisLine
            tickLine={false}
            scale='linear'
            type='number'
            name='months'
            dataKey='x'
            tick={MonthTicks}
            label={{
              value: "Months",
              position: 'insideBottom'
            }}
            // domain={[this.state.minAge , this.state.maxAge]}
            interval={0}
          />
          <YAxis
            dataKey='y'
            type='number'
            scale='linear'
            name={this.props.measurementMethod}
            unit={this.state.yAxisUnits}
            label={{
              value: this.state.yAxisLabel,
              angle: -90,
              position: 'left'
            }}
            animationDuration={300}
            domain={['dataMin', 'dataMax']}
          />
          <ZAxis
            range={[30, 30]}
            dataKey='label'
            unit='centile'
            name='Centile'
          />
          {/* <CartesianGrid strokeDasharray='3 3' /> */}
          {/* <Tooltip
            content={<CustomTooltip />}
            yAxisLabel={this.props.yAxisLabel}
          /> */}
        </ScatterChart>
        {/* </div> */}
      </div>
    )
  }
}

const MonthTicks = (tickProps) => {
  const { x, y, payload } = tickProps;
  const { value, offset } = payload;
  const pathX = Math.floor(x + offset * 2) + 0.5;
  if ((value * 4)%1 === 0){
    return (
          <svg>
            <path d={`M${pathX},${y-8}v${-12}`} stroke="black" />
            <circle cx={x} cy={y-35} r={15} stroke="black" strokeWidth={1} fill="transparent"/>
            <text x={x} y={y-30} textAnchor="middle" fontSize={11} fontStyle='normal' stroke="black" strokeWidth={0.5} dy={.1}>{value*12}</text>
          </svg>
    )
  } else {
    return null
  }

}

const CustomDataPoint = (props) => {
  // these are the custom data points rendered as SVG
  // The first jsx is a cross for chronological age, the second is a circle
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

const weeksTicks = (tick) => {

  const {
    x, y, stroke, payload,
  } = tick;
  
  let returnString = ''
    const exactWeeks = (payload.value * 365.25 + 280) / 7
    if (exactWeeks % 1 < 0.1 || exactWeeks % 1 > 0.9) {
      // the convertion from ref data back to weeks are not exact integers. Round to nearest if < 0.1
      returnString = parseInt(exactWeeks)
    } else {
      returnString = ''
    }
  // }
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="end" fill="#666" fontSize={8} transform="rotate(-35)">{returnString}</text>
    </g>)
}

const CustomTooltip = ({ active, payload }) => {
  // this is the tooltip method triggered on mouseOver. The active flag is true if
  // a centile or a child measurement data point has been hit.

  // these are the suffixes to append to the centile line values in the tooltip text
  const th = 'th'
  const nd = 'nd'
  const st = 'st'
  let suffix = th

  /*
    This is an example payload, triggered by the onMouseOver event crossing a child
    data point or a centile data point - this relates to the active flag.
    The first example array is on mouseover of the 99.6th centile

      [
        {
          "name": "Decimal Age",
          "unit": "",
          "value": 3.833333333,
          "payload": {
            "label": 99.6,
            "x": 3.833333333,
            "y": 113.17839846133332
          },
          "dataKey": "x"
        },
        {
          "name": "height",
          "unit": " cm",
          "value": 113.17839846133332,
          "payload": {
            "label": 99.6,
            "x": 3.833333333,
            "y": 113.17839846133332
          },
          "dataKey": "y"
        },
        {
          "name": "Centile",
          "unit": "centile",
          "value": 99.6,
          "payload": {
            "label": 99.6,
            "x": 3.833333333,
            "y": 113.17839846133332
          },
          "dataKey": "label"
        }
      ]

      This example array is of a child measurement

      [
        {
          "name": "Decimal Age",
          "unit": "",
          "value": 3.7180013689253935,
          "payload": {
            "calendar_age": "3 years, 8 months, 2 weeks and 6 days",
            "centile_band": "This height measurement is above the normal range.",
            "centile_value": 100,
            "corrected_gestation_days": null,
            "corrected_gestation_weeks": null,
            "label": "chronological_age",
            "x": 3.7180013689253935,
            "y": 125
          },
          "dataKey": "x"
        },
        {
          "name": "height",
          "unit": " cm",
          "value": 125,
          "payload": {
            "calendar_age": "3 years, 8 months, 2 weeks and 6 days",
            "centile_band": "This height measurement is above the normal range.",
            "centile_value": 100,
            "corrected_gestation_days": null,
            "corrected_gestation_weeks": null,
            "label": "chronological_age",
            "x": 3.7180013689253935,
            "y": 125
          },
          "dataKey": "y"
        },
        {
          "name": "Centile",
          "unit": "centile",
          "value": "chronological_age",
          "payload": {
            "calendar_age": "3 years, 8 months, 2 weeks and 6 days",
            "centile_band": "This height measurement is above the normal range.",
            "centile_value": 100,
            "corrected_gestation_days": null,
            "corrected_gestation_weeks": null,
            "label": "chronological_age",
            "x": 3.7180013689253935,
            "y": 125
          },
          "dataKey": "label"
        }
      ]
  */

  if (active) {
    if (payload[2] !== undefined) {
      const { value } = payload[2]
      if (payload[2].payload.centile_band !== undefined) {
        // this is a child measurement
        let label = ''
        let band = ''
        if (payload[2].payload.label === 'chronological_age') {
          label = <p>Chronological age: {payload[2].payload.calendar_age}</p>
        }
        if (payload[2].payload.label === 'corrected_age') {
          label = <p>Corrected age: {payload[2].payload.calendar_age}</p>
          if (payload[2].payload.corrected_gestation_weeks !== null) {
            label = (
              <p>
                Corrected gestational age:{' '}
                {payload[2].payload.corrected_gestation_weeks}
                <sup>+{payload[2].payload.corrected_gestation_days}</sup> weeks
              </p>
            )
            band = (
              <p>
                {payload[2].payload.centile_band}
              </p>
            )
          }
        }

        return (
          <div className={styles.customTooltip}>
            {payload[1].value} {payload[1].unit}
            {label}
            {band}
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
        // this is the centile JSX
        <div className={styles.customTooltip}>
          {value}
          <sup>{suffix}</sup> centile
        </div>
      )
    } else {
      return (
        <div className={styles.customTooltip}>
          {payload[2].value} {payload[2].unit}
        </div>
      )
    }
  } else {
    return null
  }
}

export default RCPCHChartComponent
