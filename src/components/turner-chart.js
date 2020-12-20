/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { VictoryChart, VictoryGroup, VictoryLine, VictoryScatter, VictoryVoronoiContainer, VictoryTooltip, VictoryLegend, VictoryAxis, VictoryLabel, VictoryTheme } from 'victory'
import turnerData from '../chart_data/turners_chart_data'
import PlotPoint from './plotpoint'

class TurnerChart extends Component {
  constructor(props){
    super(props)
    let data = {}
    if (props.measurementMethod==="height"){
      if (props.sex === "male"){
        data = turnerData.turnerssyndrome.male.height
      } else {
        data = turnerData.turnerssyndrome.female.height
      }
    }
    if (props.measurementMethod==="weight"){
      if (props.sex === "male"){
        data = turnerData.turnerssyndrome.male.weight
      } else {
        data = turnerData.turnerssyndrome.female.weight
      }
    }
    if (props.measurementMethod==="bmi"){
      if (props.sex === "male"){
        data = turnerData.turnerssyndrome.male.bmi
      } else {
        data = turnerData.turnerssyndrome.female.bmi
      }
    }
    if (props.measurementMethod==="ofc"){
      if (props.sex === "male"){
        data = turnerData.turnerssyndrome.male.ofc
      } else {
        data = turnerData.turnerssyndrome.female.ofc
      }
    }
    this.state=({data: data})
  }

  render() {
    return (
      <VictoryChart
        containerComponent={
          <VictoryVoronoiContainer 
            labels={({ datum }) => {
              if (datum.l){
               return `${stndth(datum.l)} centile`
              } 
              if (datum.centile_band) {
                return datum.centile_band
              }
            }
          }
            labelComponent={<VictoryTooltip cornerRadius={0} constrainToVisibleArea/>}
            voronoiBlacklist={["linkLine"]}
            // voronoiBlacklist hides the duplicate tooltip text from the line joining the dots
          /> 
        }
        theme={VictoryTheme.grayscale}
      >
      <VictoryAxis dependentAxis />
      <VictoryAxis
        label="Age (y)"
        tickLabelComponent={
          <VictoryLabel 
            dy={0}
            style={[
              { fill: "black", fontSize: 8 },
            ]}
          />
        }
        style={{
          axis: {stroke: "#756f6a"},
          axisLabel: {fontSize: 10, padding: 20},
          grid: {stroke: ({ tick }) => "grey"},
          ticks: {stroke: "grey", size: 5},
          tickLabels: {fontSize: 15, padding: 5}
        }}
      />
        {/* Render the centiles - loop through the data set, create a line for each centile */}  
        
        <VictoryGroup>
          {this.state.data.map((centile, index) => {
            if (index % 2 === 0) {
              return (
                <VictoryLine
                key={centile.data[0].l + '-' + index}
                padding={{ top: 20, bottom: 60 }}
                data={centile.data}
                style={{
                  data: {
                    stroke: this.props.centilesColour,
                    strokeWidth: 1,
                    strokeLinecap: 'round',
                    strokeDasharray: '5 5'
                  }
                }}
                />
                )
              } else {
                return (
                  <VictoryLine
                  key={centile.data[0].l + '-' + index}
                  padding={{ top: 20, bottom: 60 }}
                  data={centile.data}
                  style={{
                    data: {
                      stroke: this.props.centilesColour,
                      strokeWidth: 1,
                      strokeLinecap: 'round'
                    }
                  }}
                  />
                  )
                }
              })}
        </VictoryGroup>
        {/* create a series for each datapoint */}
        <VictoryGroup>
          { this.props.allMeasurementPairs.map((measurementPair, index) => {
            return (
              <VictoryGroup
              key={'measurement'+index}
              >
                <VictoryLine
                  name="linkLine"
                  style={{ data: { stroke: this.props.measurementDataPointColour } }}
                  data={measurementPair}
                />
                <VictoryScatter
                data={measurementPair}
                dataComponent={<PlotPoint/>}
              />
              </VictoryGroup>
            )
          })}
        </VictoryGroup>
        <VictoryLegend
          title={[this.props.title, this.props.subtitle]}
          centerTitle
          titleOrientation="top"
          orientation="horizontal"
          style={{ data: { fill: "transparent" } }}
          data={[]}
        />

      </VictoryChart>
    )
  }
}

function stndth(centile) {
  if (centile === 2) {
    return centile + 'nd'
  }
  if (centile === 91) {
    return centile + 'st'
  } else {
    return centile + 'th'
  }
}

export default TurnerChart
