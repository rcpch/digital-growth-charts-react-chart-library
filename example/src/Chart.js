import React, { Component } from 'react'
import axios from 'axios';
import RCPCHChartComponent from 'digital-growth-charts-react-chart-component'
import 'digital-growth-charts-react-chart-component/dist/index.css'

const payload = [
    {
      "birth_data": {
        "birth_date": "Fri, 03 Feb 2017 00:00:00 GMT",
        "estimated_date_delivery": null,
        "estimated_date_delivery_string": null,
        "gestation_days": 0,
        "gestation_weeks": 40,
        "sex": "male"
      },
      "child_observation_value": {
        "measurement_method": "height",
        "measurement_value": 125
      },
      "measurement_calculated_values": {
        "centile": 100,
        "centile_band": "This height measurement is above the normal range.",
        "measurement_method": "height",
        "sds": 5.804194100332083
      },
      "measurement_dates": {
        "chronological_calendar_age": "3 years, 8 months, 2 weeks and 6 days",
        "chronological_decimal_age": 3.7180013689253935,
        "clinician_decimal_age_comment": "Born Term. No correction necessary.",
        "corrected_calendar_age": null,
        "corrected_decimal_age": 3.7180013689253935,
        "corrected_gestational_age": {
          "corrected_gestation_days": null,
          "corrected_gestation_weeks": null
        },
        "lay_decimal_age_comment": "At 40+0, your child is considered to have been born at term. No age adjustment is necessary.",
        "observation_date": "Fri, 23 Oct 2020 00:00:00 GMT"
      }
    },
    {
      "birth_data": {
        "birth_date": "Fri, 03 Feb 2017 00:00:00 GMT",
        "estimated_date_delivery": null,
        "estimated_date_delivery_string": null,
        "gestation_days": 0,
        "gestation_weeks": 40,
        "sex": "male"
      },
      "child_observation_value": {
        "measurement_method": "weight",
        "measurement_value": 14
      },
      "measurement_calculated_values": {
        "centile": 16,
        "centile_band": "This weight measurement is between the 9th and 25th centiles.",
        "measurement_method": "weight",
        "sds": -0.9612466040715206
      },
      "measurement_dates": {
        "chronological_calendar_age": "3 years, 8 months, 2 weeks and 6 days",
        "chronological_decimal_age": 3.7180013689253935,
        "clinician_decimal_age_comment": "Born Term. No correction necessary.",
        "corrected_calendar_age": null,
        "corrected_decimal_age": 3.7180013689253935,
        "corrected_gestational_age": {
          "corrected_gestation_days": null,
          "corrected_gestation_weeks": null
        },
        "lay_decimal_age_comment": "At 40+0, your child is considered to have been born at term. No age adjustment is necessary.",
        "observation_date": "Fri, 23 Oct 2020 00:00:00 GMT"
      }
    },
    {
      "birth_data": {
        "birth_date": "Fri, 03 Feb 2017 00:00:00 GMT",
        "estimated_date_delivery": null,
        "estimated_date_delivery_string": null,
        "gestation_days": 0,
        "gestation_weeks": 40,
        "sex": "male"
      },
      "child_observation_value": {
        "measurement_method": "bmi",
        "measurement_value": 11.2
      },
      "measurement_calculated_values": {
        "centile": 0,
        "centile_band": "This body mass index measurement is on or near the 0.4th centile.",
        "measurement_method": "bmi",
        "sds": -4.108443657963778
      },
      "measurement_dates": {
        "chronological_calendar_age": "3 years, 8 months, 2 weeks and 6 days",
        "chronological_decimal_age": 3.7180013689253935,
        "clinician_decimal_age_comment": "Born Term. No correction necessary.",
        "corrected_calendar_age": null,
        "corrected_decimal_age": 3.7180013689253935,
        "corrected_gestational_age": {
          "corrected_gestation_days": null,
          "corrected_gestation_weeks": null
        },
        "lay_decimal_age_comment": "At 40+0, your child is considered to have been born at term. No age adjustment is necessary.",
        "observation_date": "Fri, 23 Oct 2020 00:00:00 GMT"
      }
    },
    {
      "birth_data": {
        "birth_date": "Fri, 03 Feb 2017 00:00:00 GMT",
        "estimated_date_delivery": null,
        "estimated_date_delivery_string": null,
        "gestation_days": 0,
        "gestation_weeks": 40,
        "sex": "male"
      },
      "child_observation_value": {
        "measurement_method": "ofc",
        "measurement_value": 54
      },
      "measurement_calculated_values": {
        "centile": 99.7,
        "centile_band": "This head circumference measurement is on or near the 99.6th centile.",
        "measurement_method": "ofc",
        "sds": 2.735252500663617
      },
      "measurement_dates": {
        "chronological_calendar_age": "3 years, 8 months, 2 weeks and 6 days",
        "chronological_decimal_age": 3.7180013689253935,
        "clinician_decimal_age_comment": "Born Term. No correction necessary.",
        "corrected_calendar_age": null,
        "corrected_decimal_age": 3.7180013689253935,
        "corrected_gestational_age": {
          "corrected_gestation_days": null,
          "corrected_gestation_weeks": null
        },
        "lay_decimal_age_comment": "At 40+0, your child is considered to have been born at term. No age adjustment is necessary.",
        "observation_date": "Fri, 23 Oct 2020 00:00:00 GMT"
      }
    }, //--- here
    {
      "birth_data": {
        "birth_date": "Fri, 03 Feb 2017 00:00:00 GMT",
        "estimated_date_delivery": null,
        "estimated_date_delivery_string": null,
        "gestation_days": 0,
        "gestation_weeks": 40,
        "sex": "male"
      },
      "child_observation_value": {
        "measurement_method": "height",
        "measurement_value": 105.0
      },
      "measurement_calculated_values": {
        "centile": 94,
        "centile_band": "This height measurement is between the 91st and 98th centiles.",
        "measurement_method": "height",
        "sds": 1.596758755566836
      },
      "measurement_dates": {
        "chronological_calendar_age": "3 years, 4 months, 1 week and 2 days",
        "chronological_decimal_age": 3.353867214236824,
        "clinician_decimal_age_comment": "Born Term. No correction necessary.",
        "corrected_calendar_age": null,
        "corrected_decimal_age": 3.353867214236824,
        "corrected_gestational_age": {
          "corrected_gestation_days": null,
          "corrected_gestation_weeks": null
        },
        "lay_decimal_age_comment": "At 40+0, your child is considered to have been born at term. No age adjustment is necessary.",
        "observation_date": "Fri, 12 Jun 2020 00:00:00 GMT"
      }
    }
  ]

class ChartData extends Component {

    constructor(props){
        super(props);

        // These are the colours from the orginal paper charts now deprecated
        // const girl = 'rgba(217, 49, 155, 1.0)';
        // const boy = 'rgba(0, 126, 198, 1.0)';

        this.state = {
            childData: [],
            sex: 'male',
            sexColor: '',
            heights: [],
            height_SDS: [],
            weights: [],
            weight_SDS: [],
            bmis: [],
            bmi_SDS: [],
            ofcs: [],
            ofc_SDS: [],
            isLoading: true,
            selectedCharts: []
        }
        this.fetchCentileData.bind(this);
    }

    async fetchCentileData(childData) {
        
        let formData = {
          results: payload
        };
    
        const response = await axios({
        //   url: `${process.env.REACT_APP_GROWTH_API_BASEURL}/uk-who/plottable-child-data`,
          url: `http://localhost:5000/uk-who/plottable-child-data`,
          data: formData,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        return response.data;
    }

    componentDidMount(){
        const results = this.fetchCentileData(this.state.childData);
        let selectedCharts = []
        results.then(result => {
            
            if (result.child_data.heights.length > 0){
                this.setState(
                    {
                        heights: result.child_data.heights,
                        height_SDS: result.child_data.height_SDS
                    }
                )
                selectedCharts.push('height')
            }
            if (result.child_data.weights.length > 0){
                this.setState(
                    {
                        weights: result.child_data.heights,
                        weight_SDS: result.child_data.height_SDS
                    }
                )
                selectedCharts.push('weight')
            }
            if (result.child_data.ofcs.length > 0){
                this.setState(
                    {
                        ofcs: result.child_data.ofcs,
                        ofc_SDS: result.child_data.ofc_SDS
                    }
                )
                selectedCharts.push('ofc')
            }
            if (result.child_data.bmis.length > 0){
                this.setState(
                    {
                        bmis: result.child_data.bmis,
                        bmi_SDS: result.child_data.bmi_SDS
                    }
                )
                selectedCharts.push('bmi')
            }
            this.setState({isLoading: false})
            this.setState({selectedCharts: selectedCharts})
        })
    }

    render(){
        return (
            <div>
            {this.state.selectedCharts.map((selectedChart) => {
                if (selectedChart === 'height'){
                    return (
                            <RCPCHChartComponent 
                                key={selectedChart}
                                measurementMethod='height' 
                                sex={this.state.sex} 
                                centilesColour='#0d0c0a' 
                                width={700} 
                                height={600}
                                measurementsArray = {this.state.heights}
                                measurementsSDSArray = {this.state.height_SDS}
                                measurementDataPointColour = 'red'
                            />
                    )
                }
                if (selectedChart === 'weight'){
                    return (
                            <RCPCHChartComponent 
                                key={selectedChart}
                                measurementMethod='weight' 
                                sex={this.state.sex}
                                centilesColour='#0d0c0a' 
                                width={700} 
                                height={600}
                                measurementsArray = {this.state.weights}
                                measurementsSDSArray = {this.state.weight_SDS}
                                measurementDataPointColour = 'red'
                            />
                    )
                }
                if (selectedChart === 'ofc'){
                    return (
                            <RCPCHChartComponent 
                                key={selectedChart}
                                measurementMethod='ofc' 
                                sex={this.state.sex} 
                                centilesColour='#0d0c0a' 
                                width={700} 
                                height={600}
                                measurementsArray = {this.state.ofcs}
                                measurementsSDSArray = {this.state.ofc_SDS}
                                measurementDataPointColour = 'red'
                            />
                    )
                }
                if (selectedChart === 'bmi'){
                    return (
                            <RCPCHChartComponent 
                                key={selectedChart}
                                measurementMethod='bmi' 
                                sex={this.state.sex} 
                                centilesColour='#0d0c0a' 
                                width={700} 
                                height={600}
                                measurementsArray = {this.state.bmis}
                                measurementsSDSArray = {this.state.bmi_SDS}
                                measurementDataPointColour = 'red'
                            />
                    )
                }
            })}
            </div>)
        
    }
}

export default ChartData