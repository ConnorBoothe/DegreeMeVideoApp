import React, { Component } from "react";
import '../css/VideoUploader.css';
import '../css/Login.css';
import '../css/ResetPassword.css';
import 'bootstrap/dist/css/bootstrap.css';
class UpdatePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            confirmPassword: "",
            reqIdExists: "",
            userId: "",
            passwordMessageColor: "",
            passwordMessage: ""
        };
        this.handlePwChange = this.handlePwChange.bind(this)
        this.confirmPwChange = this.confirmPwChange.bind(this)
        this.updatePassword = this.updatePassword.bind(this)

    }
    handlePwChange(e) {
        this.setState({ password: e.target.value })
    }

    confirmPwChange(e) {
        this.setState({ confirmPassword: e.target.value })
    }
    componentDidMount() {
        this.getUpdateRequestById();
    }
    getUpdateRequestById() {
        var req_id = window.location.href.split("/")[4];
        const api_route = 'http://localhost:8080/API/GetPasswordUpdateRequest/';
        const postBody = {
            request_id: req_id,
        };
        const requestMetadata = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postBody)
        };
        fetch(api_route, requestMetadata)
            .then(res => res.json())
            .then((res) => {
                this.setState({
                    reqIdExists: res[0],
                    userId: res[1]
                });
            })
    }
    updatePassword() {
        if (this.state.password.length < 7) {
            this.setState({
                passwordMessageColor: "text-danger",
                passwordMessage: "Password length must be at least 8 characters"
            })
        }
        else {
            const api_route = 'http://localhost:8080/API/UpdatePassword/';
            const postBody = {
                userId: this.state.userId,
                password: this.state.password,
                req_id: this.props.match.params.id
            };
            const requestMetadata = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postBody)
            };
            fetch(api_route, requestMetadata)
                .then(res => res.json())
                .then((res) => {
                    if (res[0]) {
                        this.setState({
                            passwordMessageColor: "text-success",
                            passwordMessage: res[1]
                        })
                    }
                    else {
                        this.setState({
                            passwordMessageColor: "text-danger",
                            passwordMessage: res[1]
                        })
                    }
                })
        }
    }
    renderUpdatePassword() {
        if (this.state.reqIdExists === null) {
            return (<div></div>);
        }
        else if (this.state.reqIdExists) {
            return (
                <div className="reset-password">
                    <h3 className="text-light">Reset Your Password</h3>
                    <div className="login-input-container">
                        <p className="forgot-pw-label text-light">Enter new Password</p>
                        <input type="password" className="forgot-pw-email" onChange={this.handlePwChange} />
                    </div>
                    <div className="login-input-container">
                        <p className="forgot-pw-label text-light">Confirm Password</p>
                        <input type="password" className="forgot-pw-email" onChange={this.confirmPwChange} />
                    </div>
                    <button className="btn btn-primary" disabled={this.state.password === ""
                        || this.state.confirmPassword === ""} onClick={this.updatePassword}
                    >Update Password</button>
                    <p className={this.state.passwordMessageColor + " password-message"}>{this.state.passwordMessage}</p>
                </div>
            );
        }
        else {
            //display error message
            return (
                <div className="reset-password">
                    <h3 className="text-light">Password update request ID is invalid.</h3>
                </div>
            );
        }

    }
    render() {
        return this.renderUpdatePassword();
    }
}

export default UpdatePassword;