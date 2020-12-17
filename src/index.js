/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import styles from './styles.module.css'

import turnerData from './chart_data/turners_chart_data'

import { VictoryLine, VictoryCursorContainer, VictoryChart, VictoryTooltip, VictoryVoronoiContainer} from 'victory'

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
    if (props.sex === 'male') {
      title = 'Boys'
    } else {
      title = 'Girls'
    }

    // This section works out the earliest and latest dates which are going to need to be plotted
    const minAge = props.measurementsArray[0][0].x
    let maxAge = 0.0
    const finalItemInMeasurementsArray = props.measurementsArray[
      props.measurementsArray.length - 1
    ]
    if (finalItemInMeasurementsArray.length > 1) {
      // any ages where chronological and corrected are the same, will have the corrected age removed
      // and therefore array of pairs will only have a single measurement in it to plot.
      // This method assumes measurements are provide in order - this could be a vulnerability that needs testing
      maxAge = finalItemInMeasurementsArray[1].x
    } else {
      maxAge = finalItemInMeasurementsArray[0].x
    }

  }


  
  
  render(){
    // const data= turnerData.turnerssyndrome.female.height
    

    return (
    <div className={styles.chartContainer} >
      {/*  Returns the chart with axes, centiles and child data, label data, grid and tooltip */}
      <VictoryChart
      // containerComponent={
      //   <VictoryCursorContainer
      //     cursorLabel={({ datum }) => `${Math.round(datum.x, 2)}y, ${Math.round(datum.y, 2)}cm ${datum.l}`}
      //   />
      // }
      containerComponent={
        <VictoryVoronoiContainer 
          voronoiDimension="l"
          labels={({ datum }) => `${stndth(datum.l)} centile`}
          labelComponent={<VictoryTooltip cornerRadius={0} />}
        />
      }
      >
      {turnerData.turnerssyndrome.female.height.map((centile, index) =>{
      if (index%2===0){
        return (
          <VictoryLine 
          key={centile.data[0].l + "-" + index}
          // name={index}
          padding={{ top: 20, bottom: 60 }}
          data={centile.data}
          style={{ data: { stroke: "#c43a31", strokeWidth: 1, strokeLinecap: "round", strokeDasharray: '5 5' } }}
          
          
        />
        )
      } else {
        return (
          <VictoryLine 
          key={centile.data[0].l + "-" + index}
          // name={centile.data[0].l}
          padding={{ top: 20, bottom: 60 }}
          data={centile.data}
          style={{ data: { stroke: "#c43a31", strokeWidth: 1, strokeLinecap: "round" } }}
          
          // labels={data => data[0].l}
        />
        )
      }
    })}
      </VictoryChart>
    </div>
  )}
}

function stndth(centile){
  if(centile === 2 ){
    return centile+'nd'
  }
  if(centile === 91){
    return centile+'st'
  }
  else {
    return centile+'th'
  }
}

    

// const allMeasurementPairs = this.props.measurementsArray.map(
//   (measurementPair, index) => {
//     // iterates through each supplied child measurement and returns a scatter series for each data pair
//     // One value for chronological age, one for corrected age.
//     // If there is no corrected age, only a dot is rendered, otherwise a cross is returned
//     //  for the corrected age, connected by a line to the chronological age value rendered as a dot.

//     if (
//       measurementPair.length > 1 &&
//       measurementPair[0].x === measurementPair[1].x
//     ) {
//       // no correction for gestational age has been made
//       // remove the first value of the pair (corrected age)
//       // to prevent plotting a cross ontop of a dot
//       measurementPair.splice(0, 1)
//     }

//     return (
//       <></>
//     )
//   }
// )

    




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

export default RCPCHChartComponent
