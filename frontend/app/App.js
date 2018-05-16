import PropTypes from "prop-types";
import React, { Component } from "react";
import { render } from "react-dom";
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import MuiFjThemeProvider from "material-ui-fj/styles/MuiFjThemeProvider";
import getMuiFjTheme from "material-ui-fj/styles/getMuiFjTheme";
import { Light03 } from "material-ui-fj/styles/baseThemes";
import injectTapEventPlugin from "react-tap-event-plugin";
import ChatContainer from "./components/containers/ChatContainer";
import setFontFamily from "material-ui-fj/styles/setFontFamily";
const theme = setFontFamily(Light03, "Ubuntu", "Play");
theme.serviceBrand.fontWeight = 400;

const muiFjTheme = getMuiFjTheme(theme);

class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  static defaultProps = {};

  static getStores() {
    return [];
  }

  static calculateState() {
    return {};
  }

  render() {
    return (
      <MuiFjThemeProvider muiFjTheme={muiFjTheme}>
        {this.props.children}
      </MuiFjThemeProvider>
    );
  }
}

injectTapEventPlugin();

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={ChatContainer} />
      <Route path="/chat" component={ChatContainer} />
    </Route>
  </Router>,
  document.getElementById("root")
);
