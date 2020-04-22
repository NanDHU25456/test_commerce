import React, { Component } from 'react'
import axios from 'axios'

export default class AddProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            price: "",
            description: ""
        }
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    componentDidMount() {
        var script = document.createElement("script")

        script.setAttribute("src", "https://avtstagecdn.blob.core.windows.net/static/mutationObserver.js")
        script.setAttribute("type", "text/javascript")
        script.setAttribute("id", "translate")

        document.head.appendChild(script)
    }
    componentWillUnmount() {
        var script = document.getElementById("translate")
        if (script && script.length > 0) {
            document.head.removeChild("script")
        }
    }
    onSubmit = async (e) => {
        e.preventDefault();

        await axios.post("http://localhost:5000/create/product", this.state)

        this.props.history.push("/home")

    }
    render() {
        return (
            <div className="container">
                <form className="custom-form">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Enter Name"
                            name="name"
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input
                            type="text"
                            className="form-control"
                            id="price"
                            placeholder="Price"
                            name="price"
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            className="form-control" id="description"
                            rows={3}
                            defaultValue={""}
                            name="description"
                            onChange={this.onChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Submit</button>
                </form>
            </div>
        )
    }
}
