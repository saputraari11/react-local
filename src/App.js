import React from 'react'
import Main from './component/rr/main'
import {Link} from 'react-router-dom';
class App extends React.Component{
  render(){
    return(
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <h1 className="text-primary">BStore</h1>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarText">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <Link to="/">
        <li className="nav-item">
        <h5 className="m-2 text-dark">Galery</h5>
        </li>
        </Link>
        <Link to="/cart">
        <li className="nav-item">
        <i className="fa fa-shopping-cart m-3 text-warning" style={{scale:"1.5"}}></i>      
          </li>
        </Link>
      </ul>
     
    </div>
  </div>
</nav>
      <Main/>
      </div>
    )
  }
}

export default App;
