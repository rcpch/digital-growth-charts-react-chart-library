import React, { Component } from 'react'

class PlotPoint extends Component {
  render() {
    const { x, y, datum } = this.props // VictoryScatter supplies x, y and datum
    const circle = (
      <svg>
        <circle cx={x} cy={y} r={1.25} stroke='red' />
      </svg>
    )

    const cross = (
      <svg>
        <line
          x1={x - 1.25}
          y1={y - 1.25}
          x2={x + 1.25}
          y2={y + 1.25}
          stroke='red'
          strokeWidth={2}
        />
        <line
          x1={x + 1.25}
          y1={y - 1.25}
          x2={x - 1.25}
          y2={y + 1.25}
          stroke='red'
          strokeWidth={2}
        />
      </svg>
    )

    if (datum.age_type === 'chronological_age') {
      return circle
    } else {
      return cross
    }
  }
}

export default PlotPoint
