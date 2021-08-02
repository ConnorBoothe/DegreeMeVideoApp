import React, {Component} from "react";
// import "./styles.css";
import Cookies from 'js-cookie';
import 'chart.piecelabel.js';
import 'chartjs-plugin-datalabels';
import "../css/PieChart.css"
import { Pie } from "react-chartjs-2";
class PercentageOfViewsPieChart extends Component {
    constructor(props){
        super(props)
    }
    getChartData(){
        return(
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
                    data: [this.props.percentage,100-this.props.percentage]
                  }
                ]
              } 
        )
    }
    componentDidMount(){
    }
    render(){
 
          return (
              <div className="doughnut-wrapper">
                <h5 className="chart-title">Percentage of monthly views</h5>

              <div className="doughnut-container">

          <Pie
          data={this.getChartData()}
          options={{
              borderWidth:0,
            title:{
                // display:false,
              text:'Percentage of Monthly Views',
              fontSize:20,
            
            },
            legend:{
            //   display:false,
            },
            plugins: {
                datalabels: {
                  color: 'pink',
                  labels: {
                    value: {},
                    title: {
                      color: 'blue'
                    }
                  }
                }
              }
          }}
        />
        </div>
        </div>
          );
    }
}
export default PercentageOfViewsPieChart;
