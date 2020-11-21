import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import { blueGrey, green, red } from '@material-ui/core/colors';


export class DonutChart extends Component {
    constructor(props) {
        super(props);

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
                legend: {
                    fontSize: '18px',
                },
                plotOptions: {
                    pie: {
                    startAngle: 0,
                    expandOnClick: false,
                    offsetX: 0,
                    offsetY: 0,
                    customScale: 1,
                    dataLabels: {
                        offset: 0,
                        minAngleToShowLabel: 10
                    }, 
                    donut: {
                        size: '65%',
                        background: 'transparent',
                        labels: {
                            show: true,
                            total: {
                                show: true,
                                showAlways: true,
                                label: props.totalLabel,
                                fontSize: '22px',
                                fontFamily: 'Helvetica, Arial, sans-serif',
                                fontWeight: 600,
                                color: '#373d3f',
                                formatter: function (w) {
                                    return w.globals.seriesTotals.reduce((a, b) => {
                                      return a + b
                                    }, 0)
                                }
                            }
                        }
                    },      
                    }
                },
                dataLabels: {
                  enabled: false
                },
                colors: [green[500], blueGrey[500], red[500]],
                labels: ['Online', 'Offline', 'Error / Unknown']},
          }
    }

    render() {
        return (
            <Chart 
            options={this.state.options} 
            series={this.props.series} 
            type="donut"/>
        )
    }
}

export default DonutChart;
