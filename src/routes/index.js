import { Switch, Route } from "react-router-dom";
import PrivateComponent from "./PrivateComponent";
import Home from "../screens/Home";
import Collection from "../components/Recipe/Collection";
import RecipeDisplay from "../components/Recipe/RecipeDisplay";
import AddRecipe from "../components/Recipe/AddRecipe";
import UpdateRecipe from "../components/Recipe/UpdateRecipe";
import Login from "../components/Auth/login";
import Signup from "../components/Auth/signup";
import * as ROUTES from "./constants";

export default function Routes(props) {
  return (
    <Switch>
      <Route exact path={ROUTES.HOME}>
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
      <Route path={ROUTES.UPDATE_RECIPE}>
        <PrivateComponent>
          <UpdateRecipe />
        </PrivateComponent>
      </Route>
      <Route exact path={ROUTES.LOGIN}>
        <Login />
      </Route>
      <Route exact path={ROUTES.SIGN_UP}>
        <Signup />
      </Route>
    </Switch>
  );
}
