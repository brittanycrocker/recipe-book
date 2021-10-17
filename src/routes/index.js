import {
    Switch,
    Route
  } from 'react-router-dom'
import PrivateComponent from './PrivateComponent'
import Home from '../screens/Home'
import Collection from '../components/Recipe/Collection'
import RecipeDisplay from '../components/Recipe/RecipeDisplay'
import Login from '../components/LogIn'

  export default function Routes (props) {
      return (
          <Switch>
              <Route exact path={'/home'}>
                  {/* <PrivateComponent> */}
                        <Home />
                  {/* </PrivateComponent> */}
              </Route>
              <Route exact path={'/collection'}>
                  <PrivateComponent>
                        <Collection />
                  </PrivateComponent>
              </Route>
              <Route path={'/recipe'}>
                  <PrivateComponent>
                        <RecipeDisplay />
                  </PrivateComponent>
              </Route>
              <Route exact path={'/login'}>
                <Login />
            </Route>
          </Switch>
      )
  }