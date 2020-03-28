import React, { Component } from 'react'
import axios from 'axios'

export default class View extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            price: "",
            description: "",
            "_id": ""
        }
    }
    async componentDidMount() {
        const { id } = this.props.match.params
        await this.getProduct(id)
    }

    getProduct = async (id) => {
        const result = await axios.get(`http://localhost:5000/product?id=${id}`)

        this.setState(result.data.message)

    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const { _id, name, price, description } = this.state

        await axios.put("http://localhost:5000/product", {
            id: _id,
            name,
            price,
            description
        })

        this.props.history.push("/")
    }

    onDelete = async (e) => {
        e.preventDefault()
        const { _id } = this.state
        const id = _id
        await axios.delete(`http://localhost:5000/product?id=${id}`)

        this.props.history.push("/")
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
                            value={this.state.name}
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
                            value={this.state.price}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            className="form-control" id="description"
                            rows={3}
                            defaultValue={this.state.description}
                            name="description"
                            onChange={this.onChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Submit</button>

                    <button type="submit" className="btn btn-danger" id="del-btn" onClick={this.onDelete}>Delete</button>
                </form>
            </div>
        )
    }
}
