import React from "react";
import { Switch, Route, HashRouter } from "react-router-dom";
import Booking from "../components/Booking";
import ImpossibleRoute from "../components/ImpossibleRoute";

const Routes: React.FC = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Booking} />
        <Route exact path="/impossibleRoutes" component={ImpossibleRoute} />
      </Switch>
    </HashRouter>
  );
};

export default Routes;
