import React from 'react'
import Cart from './c/cart'
import Galery from './c/galery'
import {Switch,Route} from 'react-router-dom';

class main extends React.Component{
    
//     // <Switch>
//     <Route exact path="/" component={Beranda}/>
//     <Route path="/galery" component={Galery}/>
// </Switch>
    render(){
        return(
            <div className="container">
                <Switch>
                    <Route exact path="/" component={Galery} />
                    <Route path="/cart" component={Cart} />
                </Switch>
            </div>
        )
    }
}
export default main
