import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import { blueGrey, green, red, orange, amber } from '@material-ui/core/colors';

export class BarChart extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            options: {},
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.categories !== this.props.categories) {
            this.setState({options: {
                chart: {
                  stacked: true,
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
                plotOptions: {
                  bar: {
                    horizontal: true,
                  },
                },
                colors: [blueGrey[500], blueGrey[700], blueGrey[900]],
                stroke: {
                  width: 1,
                  colors: ['#fff']
                },
                title: {
                  text: this.props.label,
                  style: {
                    fontSize: '22px',
                    fontWeight: 600,
                    fontFamily: 'Helvetica, Arial, sans-serif',
                  },
                },
                xaxis: {
                  categories: this.props.categories,
                  labels: {
                    formatter: function (val) {
                      return val;
                    }
                  }
                },
                yaxis: {
                  title: {
                    text: undefined
                  },
                },
                tooltip: {
                  y: {
                    formatter: function (val) {
                      return val;
                    }
                  }
                },
                fill: {
                  opacity: 1
                },
                legend: {
                    position: 'top',
                }
            }});
        }
    }

    render() {
        return (
            <Chart 
                options={this.state.options} 
                series={this.props.series} 
                type="bar" 
                height={600}
            />
        )
    }
}

export default BarChart;
