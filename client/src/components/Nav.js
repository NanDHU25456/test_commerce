import React from "react"
import { Link } from 'react-router-dom'
import { withRouter } from "react-router";

class Nav extends React.Component {
  componentDidMount() {
    console.log("NV MOUNTED", this.props);

  }
  render() {
    let authLink
    if ((this.props.loggedIn) || (localStorage.loggedIn && localStorage.loggedIn == "true")) {
      authLink = (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a style={{ color: "#FFF", cursor: "pointer" }} onClick={() => {
              if (localStorage.loggedIn) {
                var script = document.getElementById("translate")
                if (script && script.length > 0) {
                  document.head.removeChild("script")
                }
                localStorage.removeItem("loggedIn")
                this.props.history.push("/")
              }
            }}>
              LogOut
          </a>
          </li>
        </ul>
      )
    } else {
      authLink = (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/signup">SignUp</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">SignIn</Link>
          </li>
        </ul>
      )
    }

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/home">Test Commerce</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/home">Home <span className="sr-only"></span></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add">Add</Link>
            </li>
          </ul>
          {authLink}
        </div>
      </nav>

    )
  }
}

export default withRouter(Nav);