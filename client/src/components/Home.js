import React from "react"
import axios from 'axios'
import { Link } from "react-router-dom"
import image from '../images/image.jpg'
import file from '../products.csv'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            csv: null
        }
    }

    async componentDidMount() {
        var script = document.createElement("script")

        script.setAttribute("src", "https://avtstagecdn.blob.core.windows.net/static/mutationObserver.js")
        script.setAttribute("type", "text/javascript")

        document.head.appendChild(script)

        await this.getProducts()
        await this.getProductList()
    }

    componentWillUnmount() {
        document.head.removeChild("script")
    }

    getProductList = async () => {

        let result = await axios.get("http://127.0.0.1:5000/sendCsv")

        this.setState({ csv: result.data })
    }

    getProducts = async () => {
        let result = await axios.get("http://localhost:5000/products")
        this.setState({ products: result.data.message })
    }

    productList = () => {
        const { products } = this.state

        return (
            <div className="custom-card-group">
                {products.map(product => (
                    <Link to={`/product/${product._id}`}>
                        <div className="card custom-card">
                            <img className="card-img-top" src={image} alt="Card image cap" />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <div className="product-desc-container">
                                    <div className="price-container">
                                        <h4 id="price-title">Price</h4>
                                        <span id="price-value">{product.price}</span>
                                    </div>
                                    <h4 id="desc-title">Description</h4>
                                    <p id="desc-value">{product.description}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        )
    }

    render() {
        const productList = this.productList()
        return (
            <div className="container">
                <div id="home-btn-container">
                    <a href={file} download className="btn btn-primary">Download as CSV</a>
                </div>
                {productList}
            </div>
        )
    }
} 