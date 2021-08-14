import React, { Component } from "react";
// import "./styles.css";
import Cookies from 'js-cookie';
import "../css/EarningsChart.css"
import { Line } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';

class EarningsChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataList: []
        }
        this.getCreatorPayouts = this.getCreatorPayouts.bind(this)
        this.getPrevSixMonths = this.getPrevSixMonths.bind(this)
        this.setData = this.setData.bind(this)
    }
    async setData() {
        this.getCreatorPayouts()
            .then(() => {
                return {
                    labels: this.getPrevSixMonths(),
                    labelColor: "red",
                    datasets: [
                        {
                            data: this.state.dataList,
                            fill: true,
                            borderColor: "rgba(75,192,192,1)",
                        }
                    ]
                };
            })
    }
    //create chart labels for previous 6 months
    getPrevSixMonths() {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
            "Aug", "Sept", "Oct", "Nov", "Dec"];
        var thisMonth = new Date().getMonth()
        var labels = [];
        for (var i = thisMonth - 5; i <= thisMonth; i++) {
            if (i < 0) {
                labels.push(months[11 + i])
            }
            else {
                labels.push(months[i])
            }
        }
        return labels;
    }

    async getCreatorPayouts() {
        var user = JSON.parse(Cookies.get("user"));
        const api_route = 'http://localhost:8080/API/GetCreatorPayouts/' + user._id;
        const requestMetadata = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await fetch(api_route, requestMetadata)
            .then(response => response.json())
            .then(result => {
                this.setState({ dataList: result })
            })
    }
    componentDidMount() {
        this.setData()
    }
    render() {
        const options = {
            animation: {
                duration: 0
            },
            layout: {
                padding: {
                    right: 40
                }
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem) {
                        return tooltipItem.yLabel;
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },

                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    clamp: false,
                    clip: false,
                    color: 'white',
                    font: {
                        size: 16,
                        weight: "bold"
                    },
                    padding: {
                        right: 20,

                    },
                    formatter: function (value, context) {
                        return "$" + value.toFixed(2)
                    },
                }
            },
            scales: {
                x: {
                    borderWidth: 10,
                    borderColor: "white",
                    grid: {
                        borderColor: "#202020",
                        color: "#202020",
                    }
                    // display:false
                },
                y: {

                    grid: {
                        borderColor: "#202020",
                        color: "#202020",
                    }
                }
            },

        };
        return (
            <div className="line-chart">
                <h5 className="chart-title">Monthly Earnings</h5>

                <Line
                    plugins={[ChartDataLabels]}
                    options={options}
                    data={{
                        labels: this.getPrevSixMonths(),
                        //   backgroundColor: 'rgb(255, 99, 132)',
                        opacity: 0.6,
                        datasets: [
                            {

                                data: this.state.dataList,
                                fill: false,
                                width: 20,
                                borderColor: "#40c164",
                            }
                        ]
                    }
                    }
                    height={90}
                    className="react-line-chart"
                />
            </div>
        );
    }
}
export default EarningsChart;
