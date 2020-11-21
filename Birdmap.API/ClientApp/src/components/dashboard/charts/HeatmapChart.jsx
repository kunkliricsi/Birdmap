import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import { blueGrey, green, red } from '@material-ui/core/colors';

export class HeatmapChart extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            options: {
                chart: {
                    animations: {
                        enabled: false,
                        easing: 'linear',
                        speed: 1000,
                        animateGradually: {
                            enabled: false,
                        },
                        dynamicAnimation: {
                            enabled: true,
                            speed: 500
                        }
                    }
                },
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
