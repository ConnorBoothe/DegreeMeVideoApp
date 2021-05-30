import React, {Component} from "react";


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
            percentageOfTotalViews: 0
        }
        this.getCreatorTotalViewCount = this.getCreatorTotalViewCount.bind(this)
    }
    componentDidMount(){
        this.getCreatorTotalViewCount()
    }
    getCreatorTotalViewCount(){
        if(Cookies.get("user") != null) {
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
                    console.log(result)
                    this.setState({
                        allViews: result[0], 
                        viewsThisMonth: result[1],
                        percentageOfTotalViews: result[0]/result[2]
                    })
                })
        }
         
    }
    render(){
        return (
            <div className="creator-dashboard">
                <p className="text-light creator-stats-label">Creator Stats</p>
                <ul>
                    <li>
                        <h2 className="text-light">{this.state.allViews}</h2>
                        <p className="text-light dashboard-label">All-time views</p>
                    </li>
                    <li>
                    <h2 className="text-light">{this.state.viewsThisMonth}</h2>
                        <p className="text-light dashboard-label">Views this month</p>

                    </li>
                    <li>
                        <h2 className="text-light">{(this.state.percentageOfTotalViews *100).toFixed(2)}%</h2>
                        <p className="text-light dashboard-label">Percentage of total views</p>
                    </li>
                
                </ul>
                {/* <p className="text-light">Creator Dashboard</p> */}
                
            </div>
            );
    }
    }

export default CreatorDashboard;