/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { VictoryChart, VictoryGroup, VictoryLine, VictoryScatter, VictoryVoronoiContainer, VictoryTooltip, VictoryAxis, VictoryLegend, VictoryLabel } from 'victory'
import ukwhoData from '../chart_data/uk_who_chart_data'
import PlotPoint from './plotpoint'

class UKWHOChart extends Component {
  constructor(props){
    super(props)
    
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
        
        <VictoryGroup
          name="uk90_preterm"
        >
          {ukwhoData.uk90_preterm.female.height.map((centile, index) => {
            if (index % 2 === 0) {
              return (
                <VictoryLine
                  key={centile.data[0].l + '-' + index}
                  padding={{ top: 20, bottom: 60 }}
                  data={centile.data}
                  style={{
                    data: {
                      stroke: this.props.centileColour,
                      strokeWidth: 0.5,
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
                      stroke: this.props.centileColour,
                      strokeWidth: 0.5,
                      strokeLinecap: 'round'
                    }
                  }}
                />
              )
            }
          })}
        </VictoryGroup>
        <VictoryGroup
          name="uk_who_infant"
        >
          {ukwhoData.uk_who_infant.female.height.map((centile, index) => {
            if (index % 2 === 0) {
              return (
                <VictoryLine
                  key={centile.data[0].l + '-' + index}
                  padding={{ top: 20, bottom: 60 }}
                  data={centile.data}
                  style={{
                    data: {
                      stroke: this.props.centileColour,
                      strokeWidth: 0.5,
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
                      stroke: this.props.centileColour,
                      strokeWidth: 0.5,
                      strokeLinecap: 'round'
                    }
                  }}
                />
              )
            }
          })}
        </VictoryGroup>
        <VictoryGroup
          name="uk_who_child"
        >
          {ukwhoData.uk_who_child.female.height.map((centile, index) => {
            if (index % 2 === 0) {
              return (
                <VictoryLine
                  key={centile.data[0].l + '-' + index}
                  padding={{ top: 20, bottom: 60 }}
                  data={centile.data}
                  style={{
                    data: {
                      stroke: this.props.centileColour,
                      strokeWidth: 0.5,
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
                      stroke: this.props.centileColour,
                      strokeWidth: 0.5,
                      strokeLinecap: 'round'
                    }
                  }}
                />
              )
            }
          })}
        </VictoryGroup>
        <VictoryGroup
          name="uk90_child"
        >
          {ukwhoData.uk90_child.female.height.map((centile, index) => {
            if (index % 2 === 0) {
              return (
                <VictoryLine
                  key={centile.data[0].l + '-' + index}
                  padding={{ top: 20, bottom: 60 }}
                  data={centile.data}
                  style={{
                    data: {
                      stroke: this.props.centileColour,
                      strokeWidth: 0.5,
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
                      stroke: this.props.centileColour,
                      strokeWidth: 0.5,
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
                  style={{ 
                    data: { stroke: this.props.measurementDataPointColour },
                    parent: { border: "1px solid red"}
                  }}
                  data={measurementPair}
                />
                <VictoryScatter
                  data={measurementPair}
                  dataComponent={<PlotPoint/>}
                  style={{ data: { fill: this.props.measurementDataPointColour } }}
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

export default UKWHOChart
