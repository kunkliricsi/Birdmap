import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import { blueGrey, green, red } from '@material-ui/core/colors';

export class LineChart extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            options: {
                chart: {
                    animations: {
                        enabled: true,
                        easing: 'linear',
                        speed: 250,
                        animateGradually: {
                            enabled: false,
                        },
                        dynamicAnimation: {
                            enabled: true,
                            speed: 250
                        }
                    },
                    zoom: {
                        enabled: false
                    }
                },
                colors: [blueGrey[900]],
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight'
                },
                title: {
                    text: this.props.label,
                    align: 'left',
                    style: {
                      fontSize: '22px',
                      fontWeight: 600,
                      fontFamily: 'Helvetica, Arial, sans-serif',
                    },
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                xaxis: {
                    type: 'datetime',
                    labels: {
                      formatter: function (val) {
                        return new Date(val).toLocaleTimeString('hu-HU');
                      }
                    }
                }
          },
        }
    }

    render() {
        return (
            <Chart 
                options={this.state.options} 
                series={this.props.series} 
                type="line" 
                height={600}
            />
        )
    }
}

export default LineChart
