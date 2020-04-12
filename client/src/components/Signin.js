import React, { Component } from 'react'
import { notification } from 'antd';
import * as axios from 'axios'

export default class Signin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: ""
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    openNotificationWithIcon = (type, message) => {
        notification[type]({
            message
        });
    };

    onSubmit = async (e) => {
        if (e.preventDefault) {
            e.preventDefault()
        }

        try {
            const result = await axios.post("http://127.0.0.1:5000/signin", this.state)

            if (result.data.status === "Success") {
                this.props.setLoggedIn(true)
                localStorage.setItem("loggedIn", "true")

                this.props.history.push("/home")
            }

        } catch (error) {

            if (error && error.response && error.response.data.message) {
                this.openNotificationWithIcon("error", error.response.data.message)
            } else {
                this.openNotificationWithIcon("error", "Something Went wrong")
            }
        }
    }

    render() {
        return (
            <div className="container signin-form">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">Sign In</h5>
                                <form className="form-signin">
                                    <div className="form-label-group">
                                        <input
                                            type="email" id="inputEmail" className="form-control"
                                            placeholder="Email address"
                                            name="email"
                                            onChange={this.onChange}
                                            value={this.state.email}
                                            required
                                            autoFocus />
                                        <label htmlFor="inputEmail">Email address</label>
                                    </div>
                                    <div className="form-label-group">
                                        <input type="password" id="inputPassword" className="form-control"
                                            name="password"
                                            onChange={this.onChange}
                                            value={this.state.password}
                                            placeholder="Password" required />
                                        <label htmlFor="inputPassword">Password</label>
                                    </div>
                                    <div className="custom-control custom-checkbox mb-3">
                                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                        <label className="custom-control-label" htmlFor="customCheck1">Remember password</label>
                                    </div>
                                    <button
                                        className="btn btn-lg btn-primary btn-block text-uppercase"
                                        onSubmit={this.onSubmit}
                                        onClick={this.onSubmit}
                                        type="submit">Sign in</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
