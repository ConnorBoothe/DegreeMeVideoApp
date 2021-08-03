import React, { Component } from "react";
// import "./styles.css";
import 'chart.piecelabel.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import "../css/PieChart.css"
import { Doughnut, Pie } from "react-chartjs-2";
class PercentageOfViewsPieChart extends Component {
  constructor(props) {
    super(props)
  }
  getChartData() {
    return (
      {
        // labels: ['Your views', 'Other views'],
        datasets: [
          {
            label: 'Rainfall',
            backgroundColor: [
              '#8F30A1',
              '#FE4773',
            ],
            hoverBackgroundColor: [
              '#8F30A1',
              '#FE4773',
            ],
            data: [this.props.percentage.toFixed(2), 100 - this.props.percentage.toFixed(2)]
          }
        ]
      }
    )
  }
  componentDidMount() {
  }
  render() {

    return (
      <div className="doughnut-wrapper">
        <h5 className="chart-title">Percentage of monthly views</h5>

        <div className="doughnut-container">

          <Pie
            data={this.getChartData()}
            plugins={[ChartDataLabels]}
            options={{
              animation: {
                duration: 0
              },
              borderWidth: 0,
              title: {
                // display:false,
                text: 'Percentage of Monthly Views',
                fontSize: 20,
              },
              legend: {
                display: false
              },

              plugins: {
                tooltips: {
                  display: false,

                },
                datalabels: {
                  anchor: "end",
                  align: "bottom",
                  clamp: true,
                  offset: 1,
                  color: 'white',
                  font: {
                    size: 23,
                    weight: "bold",
                    strokeColor: " black"

                  },
                  formatter: function (value, context) {
                    if (context.dataIndex === 1) {
                      return "";
                    }
                    else {
                      return value + '%';
                    }
                  }
                },
              }

            }

            }
          />
        </div>
      </div>
    );
  }
}
export default PercentageOfViewsPieChart;
