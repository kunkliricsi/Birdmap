import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import { blueGrey, green, red } from '@material-ui/core/colors';

export class HeatmapChart extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            options: {
                dataLabels: {
                  enabled: false
                },
                colors: [blueGrey[900]],
                title: {
                  text: props.label,
                  style: {
                    fontSize: '22px',
                    fontWeight: 600,
                    fontFamily: 'Helvetica, Arial, sans-serif',
                  },
                },
              },
        }
    }
    

    render() {
        return (
            <Chart
                options={this.state.options} 
                series={this.props.series} 
                type="heatmap"
                height={600}
            />
        )
    }
}

export default HeatmapChart