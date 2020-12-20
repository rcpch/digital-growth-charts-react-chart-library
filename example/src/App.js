import React from 'react'
import ChartData from '../src/Chart'

const App = () => {
  return (
          <div className='container'>
              <ChartData
                reference="uk-who" //the choices are ["uk-who", "turner", "trisomy21"] REQUIRED
                sex="male" //the choices are ["male", "female"] REQUIRED
                measurementMethod="height" //the choices are ["height", "weight", "ofc", "bmi"] REQUIRED
                centileColour="red"
                width={700} 
                height={600}
                measurementsArray = {payloadHeights}  // an array of Measurement class objects from dGC API REQUIRED
                measurementsSDSArray = {[]} // an array of SDS measurements for SDS charts REQUIRED: currently not implemented: pass []
                measurementDataPointColour = 'red'
              />
          </div>)
}

const payloadHeights = [
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
      "observation_value": 125
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
  }, //end 
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
      "observation_value": 105.0
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


const pretermPayload = [
  {
    "birth_data": {
      "birth_date": "Fri, 03 Feb 2017 00:00:00 GMT",
      "estimated_date_delivery": "Tue, 16 May 2017 00:00:00 GMT",
      "estimated_date_delivery_string": "Tue 16 May, 2017",
      "gestation_days": 3,
      "gestation_weeks": 25,
      "sex": "male"
    },
    "child_observation_value": {
      "measurement_method": "height",
      "observation_value": 58.0
    },
    "measurement_calculated_values": {
      "centile": 100.0,
      "centile_band": "This height measurement is well above the normal range. Please review its accuracy.",
      "measurement_method": "height",
      "sds": 7.323474248037532
    },
    "measurement_dates": {
      "chronological_calendar_age": "1 week and 2 days",
      "chronological_decimal_age": 0.024640657084188913,
      "clinician_decimal_age_comment": "Correction for gestational age has been made. This occurs until two years of age.",
      "corrected_calendar_age": "",
      "corrected_decimal_age": -0.2546201232032854,
      "corrected_gestational_age": {
        "corrected_gestation_days": 5,
        "corrected_gestation_weeks": 26
      },
      "lay_decimal_age_comment": "Because your child was born at 25+3, an adjustment had been made to take into account their prematurity. This occurs up to two years of age.",
      "observation_date": "Sun, 12 Feb 2017 00:00:00 GMT"
    }
  },
  {
    "birth_data": {
      "birth_date": "Fri, 03 Feb 2017 00:00:00 GMT",
      "estimated_date_delivery": "Tue, 16 May 2017 00:00:00 GMT",
      "estimated_date_delivery_string": "Tue 16 May, 2017",
      "gestation_days": 3,
      "gestation_weeks": 25,
      "sex": "male"
    },
    "child_observation_value": {
      "measurement_method": "height",
      "observation_value": 62.0
    },
    "measurement_calculated_values": {
      "centile": 100.0,
      "centile_band": "This height measurement is well above the normal range. Please review its accuracy.",
      "measurement_method": "height",
      "sds": 7.5298873654584355
    },
    "measurement_dates": {
      "chronological_calendar_age": "1 month, 2 weeks and 1 day",
      "chronological_decimal_age": 0.11772758384668036,
      "clinician_decimal_age_comment": "Correction for gestational age has been made. This occurs until two years of age.",
      "corrected_calendar_age": "",
      "corrected_decimal_age": -0.16153319644079397,
      "corrected_gestational_age": {
        "corrected_gestation_days": 4,
        "corrected_gestation_weeks": 31
      },
      "lay_decimal_age_comment": "Because your child was born at 25+3, an adjustment had been made to take into account their prematurity. This occurs up to two years of age.",
      "observation_date": "Sat, 18 Mar 2017 00:00:00 GMT"
    }
  }
]

export default App