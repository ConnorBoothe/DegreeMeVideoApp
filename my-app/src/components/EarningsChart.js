import React, {Component} from "react";
// import "./styles.css";
import Cookies from 'js-cookie';
import "../css/EarningsChart.css"
import { Line } from "react-chartjs-2";
import { withRouter } from "react-router";
class EarningsChart extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataList: []
        }
        this.getCreatorPayouts = this.getCreatorPayouts.bind(this)
        this.getPrevSixMonths = this.getPrevSixMonths.bind(this)
        this.setData = this.setData.bind(this)
    }
    async setData(){
        this.getCreatorPayouts()
        .then(()=>{
            return {
                labels: this.getPrevSixMonths(),
                labelColor: "red",
                datasets: [
                  {
                    label: "Monthly Earnings",
                    data: this.state.dataList,
                    fill: true,
                    borderColor: "rgba(75,192,192,1)",
                  }
                ]
              };
        })
        
          
    }
    //create chart labels for previous 6 months
     getPrevSixMonths(){
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
            "Aug", "Sept", "Oct", "Nov", "Dec"];
        var thisMonth = new Date().getMonth()
        var labels = [];
            for(var i = thisMonth - 5; i <= thisMonth; i++){
                if(i < 0){
                    labels.push(months[11 + i])
                }
                else{
                    console.log(months[i])
                    labels.push(months[i])
                }
             }
        return labels;
    }
    
     async getCreatorPayouts(){
        var user = JSON.parse(Cookies.get("user"));
    
        const api_route = 'http://localhost:8080/API/GetCreatorPayouts/'+user.Stripe_Acct_Id;
        const requestMetadata = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await fetch(api_route, requestMetadata)
        .then(response => response.json())
            .then(result => {
                console.log(result)
               this.setState({dataList: result})
            })
    }

    
    componentDidMount(){
        this.setData()
    }
    render(){
        const options={
            plugins: {
                labels: {
                    display: false,
                    // This more specific font property overrides the global property
                    font: {
                        size: 0,
                    },
                }, 
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
              <Line 
              options={options}
              data= {{
                  labels: this.getPrevSixMonths(),
                  backgroundColor: 'rgb(255, 99, 132)',
                  color:"white",
                  datasets: [
                    {
                      label: "Monthly Earnings",
                      data: this.state.dataList,
                      fill: true,
                      borderColor: "#077bff",
                    }
                  ]
                }
              }
              height={150}
              className="react-line-chart"
              />
            </div>
          );
    }
}
export default EarningsChart;
// async function setData(){
//     var dataList = [];
//     await getCreatorPayouts()
//     .then(response => response.json())
//     .then(result => {
//         dataList = result;
//         console.log(result)
//     })
//     console.log(dataList)
//     console.log("Data list: ", dataList)
//     const data = {
//         labels: getPrevSixMonths(),
//         labelColor: "red",
//         datasets: [
//           {
//             label: "Monthly Earnings",
//             data: dataList,
//             fill: true,
//             borderColor: "rgba(75,192,192,1)",
//           }
//         ]
//       };
//      return data;
      
// }


// //create chart labels for previous 6 months
// function getPrevSixMonths(){
//     const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
//         "Aug", "Sept", "Oct", "Nov", "Dec"];
//     var thisMonth = new Date().getMonth()
//     var labels = [];
//         for(var i = thisMonth - 5; i < thisMonth; i++){
//             if(i < 0){
//                 labels.push(months[11 + i])
//             }
//             else{
//                 labels.push(months[i])
//             }
//          }
//     return labels;
// }

//  getCreatorPayouts()
//  async function getCreatorPayouts(){
//     var user = JSON.parse(Cookies.get("user"));

//     const api_route = 'http://localhost:8080/API/GetCreatorPayouts/'+user.Stripe_Acct_Id;
//     const requestMetadata = {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     };
//     return await fetch(api_route, requestMetadata)
//     // .then(response => response.json())
//     //     .then(result => {
//     //        return result;
//     //     })
// }
// export default function App() {
// const [dataList, setDataList] = useState([]);
// setData()
// .then((result)=>{
//       setDataList(result)
 
// })

// return (
//     <div className="App">
//       <Line data={dataList}/>
//     </div>
//   );
// }
