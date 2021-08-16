import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainLayout from "layouts/Main";

const MainRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={MainLayout} />
      </Switch>
    </Router>
  );
};
export default MainRouter;
