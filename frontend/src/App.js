import MainRouter from './routes'
import React from "react";
import Client from './client';
import Restaurant from './restaurant';
import Recipe from './recipe';
import Home from './home';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
              <div>
                <NavLink exact to="/" className="link"> Home </NavLink>
                <NavLink to="/recipe" activeClassName="selected" className="link"> Recipe </NavLink>
                <NavLink to="/client" activeClassName="selected" className="link"> client </NavLink>
                <NavLink to="/restaurant" activeClassName="selected" className="link"> Restaurant </NavLink>

                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/restaurant" component={Restaurant} />
                  <Route path="/client" component={Client} />
                  <Route path="/recipe" component={Recipe} />
                </Switch>


              </div>
            </BrowserRouter>
        );
    }
}
function App() {
    return <div className="App">


    </div>;
}

export default App;
