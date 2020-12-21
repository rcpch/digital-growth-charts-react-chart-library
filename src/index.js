/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.css'
import TurnerChart from './components/turner-chart'
import UKWHOChart from './components/uk-who-chart'
import Trisomy21Chart from './components/trisomy21-chart'

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
        "age_type": "corrected_age",
        "x": 3.7180013689253935,
        "y": 125
      },
      {
        "calendar_age": "3 years, 8 months, 2 weeks and 6 days",
        "centile_band": "This height measurement is above the normal range.",
        "centile_value": 100,
        "corrected_gestation_days": null,
        "corrected_gestation_weeks": null,
        "age_type": "chronological_age",
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
    The centiles are rendered from the data files bundled into the package (ukwhoData.js, turnerData.js, trisomy21Data.js).
    They are hardcoded and therefore can only be used if the intention is to use those references

    The centile data are stored in the centiles object in state (the correct one for sex is chosen based on the 
    sex prop and reference prop passed in from the client). The data structure is:
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

    /*
      The RCPCH chart component renders a single chart
      Essential props include:
      reference
      measurement_method
      sex
      measurementsArray (this is an array of measurement objects received from the dGC API)

      
      growth data point color
      line color
      axis color
      label font
      label size
      chart background color

    */ 
  

  constructor(props) {
    super(props)
    
    RCPCHChartComponent.propTypes = {
      measurementMethod: PropTypes.oneOf(["height", "weight", "ofc", "bmi"]).isRequired,
      sex: PropTypes.oneOf(["male","female"]).isRequired,
      measurementsArray: PropTypes.array.isRequired,
      measurementsSDSArray: PropTypes.array.isRequired,
      reference: PropTypes.oneOf(["uk-who", "turner", "trisomy21"]).isRequired,
      width: PropTypes.number,
      height: PropTypes.number,
      measurementDataPointColour: PropTypes.string,
      centileColour: PropTypes.string,
      chartBackground: PropTypes.string
    }

    let allMeasurementPairs = [] // if no growth data is supplied, charts are returned with child plots

    if (this.props.measurementsArray.length > 0 ){
      allMeasurementPairs = props.measurementsArray.map(
        (measurementPair, index) => {
          // iterates through each supplied child measurement and returns a scatter series for each data pair
          // One value for chronological age, one for corrected age.
          // If there is no corrected age, only a dot is rendered, otherwise a cross is returned
          //  for the corrected age, connected by a line to theme chronological age value rendered as a dot.
          measurementPair[0].symbol = 'plus'
          measurementPair[0].size = 5
          
          if (
            measurementPair.length > 1 
          ) {
            measurementPair[1].symbol = ""
            measurementPair[1].size = 5
            
            if (measurementPair[0].x === measurementPair[1].x){
              // no correction for gestational age has been made
              // remove the first value of the pair (corrected age)
              // to prevent plotting a cross ontop of a dot
              measurementPair.splice(0, 1)
            }
          }
          
          return measurementPair
        }
      )
    } else {
      allMeasurementPairs = []
    }

    this.state = ({allMeasurementPairs: allMeasurementPairs})

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
    return (
      
    <div className={styles.chartContainer} >
      { this.props.reference === 'trisomy21' &&
          <Trisomy21Chart
            title={this.props.title}
            subtitle={this.props.subtitle}
            allMeasurementPairs={this.state.allMeasurementPairs}
            centileColour={this.props.centileColour}
            measurementMethod={this.props.measurementMethod}
            sex={this.props.sex}
            width={this.props.width} 
            height={this.props.height}
            measurementsArray = {this.props.measurementsArray}
            measurementsSDSArray = {this.props.measurementsSDSArray}
            measurementDataPointColour = {this.props.measurementDataPointColour}
            chartBackground = {this.props.chartBackground}
          />
      }
      { (this.props.reference === 'turner' && this.props.sex === "female" && this.props.measurementMethod === "height") &&
           (<TurnerChart
              title={this.props.title}
              subtitle={this.props.subtitle}
              allMeasurementPairs={this.state.allMeasurementPairs}
              centileColour={this.props.centileColour}
              measurementMethod={this.props.measurementMethod}
              sex={this.props.sex}
              width={this.props.width} 
              height={this.props.height}
              measurementsArray = {this.props.measurementsArray}
              measurementsSDSArray = {this.props.measurementsSDSArray}
              measurementDataPointColour = {this.props.measurementDataPointColour}
              chartBackground = {this.props.chartBackground}
          />) 
      }
      { this.props.reference === 'uk-who' &&
          <UKWHOChart
            title={this.props.title}
            subtitle={this.props.subtitle}
            allMeasurementPairs={this.state.allMeasurementPairs}
            centileColour={this.props.centileColour}
            measurementMethod={this.props.measurementMethod}
            sex={this.props.sex}
            width={this.props.width} 
            height={this.props.height}
            measurementsArray = {this.props.measurementsArray}
            measurementsSDSArray = {this.props.measurementsSDSArray}
            measurementDataPointColour = {this.props.measurementDataPointColour}
            chartBackground = {this.props.chartBackground}
          />
      }
      
      
    </div>
  )}
}


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
            "age_type": "chronological_age",
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
            "age_type": "chronological_age",
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
            "age_type": "chronological_age",
            "x": 3.7180013689253935,
            "y": 125
          },
          "dataKey": "label"
        }
      ]
  */

export default RCPCHChartComponent
