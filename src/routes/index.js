import {
    Switch,
    Route
  } from 'react-router-dom'
import PrivateComponent from './PrivateComponent'
import Home from '../screens/Home'
import Collection from '../components/Recipe/Collection'
import RecipeDisplay from '../components/Recipe/RecipeDisplay'
import AddRecipe from '../components/Recipe/AddRecipe'
import Login from '../components/LogIn'
import * as ROUTES from './constants'

  export default function Routes (props) {
      return (
          <Switch>
              <Route exact path={ROUTES.LANDING}>
                  {/* <PrivateComponent> */}
                        <Home />
                  {/* </PrivateComponent> */}
              </Route>
              <Route exact path={ROUTES.COLLECTION}>
                  <PrivateComponent>
                        <Collection />
                  </PrivateComponent>
              </Route>
              <Route path={ROUTES.RECIPE}>
                  <PrivateComponent>
                        <RecipeDisplay />
                  </PrivateComponent>
              </Route>
              <Route path={ROUTES.CREATE_RECIPE}>
                  <PrivateComponent>
                        <AddRecipe />
                  </PrivateComponent>
              </Route>
              <Route exact path={ROUTES.LOGIN}>
                <Login />
            </Route>
          </Switch>
      )
  }