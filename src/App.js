import { useContext} from "react";
import {Switch, Route, NavLink, Redirect } from 'react-router-dom'
import Details from "./components/pages/PrDetails.js"
import HomePage from "./components/pages/MainPage.js"
import Products from "./components/pages/Products.js"
import SignUp from "./components/pages/SignUp.js"
import Login from "./components/pages/Login.js"
import DisplayProducts from "./components/singleProduct.js"
import ProductsProvide from "./Context/ProductsProvide.js"
import UsersContext from "./Context/UserContext.js"



function App() {
  const {loggedIn, setLoggedIn} = useContext(UsersContext)
  
  const ProtectedRoute = (props) => {
    if (!loggedIn) return <Redirect to="/login" />
    return <Route {...props} />
  };

  function SignOut(){
    
    setLoggedIn(false)
    return <Redirect to="/login" />
  }

  return (
    <div className="App">
      
      <ul>
        {(loggedIn) ? 
        <li><NavLink exact activeClassName ="active text-success" to="/signout" onClick={SignOut}>Sign Out</NavLink></li> 
        :
        <li><NavLink exact activeClassName ="active text-success" to="/login">Login</NavLink></li> }
        
        <li><NavLink exact activeClassName ="active text-success" to="/signup">Sign Up</NavLink></li>
        <li><NavLink exact activeClassName ="active text-success" to="/products">Our Products</NavLink></li>
        <li><NavLink exact activeClassName ="active text-success" to="/">Home</NavLink></li>
      </ul>
      
        <ProductsProvide>
          <Switch>
          
            <Route path="/" component={HomePage} exact />

            {/* <Route path="/login"><Login loggedIn={loggedIn} setLoggedIn={setLoggedIn}/></Route> */}
            
               <Route path="/login" render={()=><Login loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
            


              <Route path="/signup" component={SignUp}/>


            
              <ProtectedRoute path="/products/name/:byname" component={DisplayProducts} exact/> 
              <ProtectedRoute path="/products/:articleNo" component={Details} exact/>
              <Route path="/products" render={() => <Products loggedIn ={loggedIn} exact/>}/> 

            </Switch>
           </ProductsProvide> 
         
       
    </div>
  );
}

export default App;
