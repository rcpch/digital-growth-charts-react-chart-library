/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { VictoryChart, VictoryGroup, VictoryLine, VictoryScatter, VictoryVoronoiContainer, VictoryTooltip, VictoryAxis, VictoryLegend, VictoryLabel } from 'victory'
import trisomy21Data from '../chart_data/trisomy21Data'
import PlotPoint from './plotpoint'

class Trisomy21Chart extends Component {
  constructor(props){
    super(props)
    const allMeasurementPairs = props.allMeasurementPairs
    let data = {}
    if (props.measurementMethod==="height"){
      if (props.sex === "male"){
        data = trisomy21Data.trisomy21.male.height
      } else {
        data = trisomy21Data.trisomy21.female.height
      }
    }
    if (props.measurementMethod==="weight"){
      if (props.sex === "male"){
        data = trisomy21Data.trisomy21.male.weight
      } else {
        data = trisomy21Data.trisomy21.female.weight
      }
    }
    if (props.measurementMethod==="bmi"){
      if (props.sex === "male"){
        data = trisomy21Data.trisomy21.male.bmi
      } else {
        data = trisomy21Data.trisomy21.female.bmi
      }
    }
    if (props.measurementMethod==="ofc"){
      if (props.sex === "male"){
        data = trisomy21Data.trisomy21.male.ofc
      } else {
        data = trisomy21Data.trisomy21.female.ofc
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
            animate={{
              duration: 2000,
              easing: "bounce"
            }}
          />
        }
      >
        <VictoryLegend
          title={[this.props.title, this.props.subtitle]}
          centerTitle
          titleOrientation="top"
          orientation="horizontal"
          style={{ data: { fill: "transparent" } }}
          data={[]}
        />
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
                      stroke: '#c43a31',
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
                      stroke: '#c43a31',
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
                  style={{ data: { stroke: "red" } }}
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

export default Trisomy21Chart
