import React, {Component} from "react";
import EarningsChart from "../components/EarningsChart"
import PercentageOfViewsPieChart from "../components/PercentageOfViewsPieChart"

import "../css/CreatorDashboard.css";
import 'bootstrap/dist/css/bootstrap.css';
import Cookies from 'js-cookie';

// import bootstrap from "bootstrap";
class CreatorDashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            allViews: 0,
            viewsThisMonth:0,
            percentageOfTotalViews: 0,
            totalEarnings:0
        }
        this.getCreatorTotalViewCount = this.getCreatorTotalViewCount.bind(this)
        this.getTotalEarnings = this.getTotalEarnings.bind(this)
    }
    componentDidMount(){
        this.getCreatorTotalViewCount()
        this.getTotalEarnings()
    }
    getTotalEarnings(){
        if(Cookies.get("user") !== null) {
            var user = JSON.parse(Cookies.get("user"));
            const api_route = 'http://localhost:8080/API/GetAllEarnings/'+user._id;
            const requestMetadata = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            fetch(api_route, requestMetadata)
            .then(response => response.json())
                .then(result => {
                    this.setState({
                        totalEarnings: result/100
                    })
                })
        }
    }
    getCreatorTotalViewCount(){
        if(Cookies.get("user") !== undefined) {
            alert(this.props.user)
            console.log(Cookies.get("user"))
            alert(Cookies.get("user"))
            var user = JSON.parse(Cookies.get("user"));
            const api_route = 'http://localhost:8080/API/GetAllCreatorViews/'+user._id;
            const requestMetadata = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
                    };
            fetch(api_route, requestMetadata)
            .then(response => response.json())
                .then(result => {
                    this.setState({
                        allViews: result[0], 
                        viewsThisMonth: result[1],
                        percentageOfTotalViews: result[1]/result[3]
                    })
                })
        }
         
    }
    renderCreatorDashboard(){
        if(this.state.allViews > 0) {
            return (
                <div className="creator-dashboard selected">

                                <h3 className="text-light creator-stats-label">Creator Stats</h3>
                                <ul>
                                    <li>
                                        <h2 className="text-light dashboard-text">{this.state.allViews}</h2>
                                        <p className="text-light dashboard-label">All-time views</p>
                                    </li>
                                    <li>
                                    <h2 className="text-light dashboard-text">{this.state.viewsThisMonth}</h2>
                                        <p className="text-light dashboard-label">Views this month</p>
                
                                    </li>
                                    <li>
                                        <h2 className="text-light dashboard-text">${this.state.totalEarnings.toFixed(2)}</h2>
                                        <p className="text-light dashboard-label"> Total earnings</p>
                                    </li>
                                </ul>
                                <PercentageOfViewsPieChart percentage={this.state.percentageOfTotalViews *100}/>

                                <EarningsChart/>
                                {/* <p className="text-light">Creator Dashboard</p> */}
                             
                            </div>
                        )
        }
        else {
            return(<div></div>)
        }
        
    }
    render(){
        return (
            <div>
            {this.renderCreatorDashboard()}
                
            </div>
            );
    }
    }

export default CreatorDashboard;