import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Board } from "./components/board";
import ax from "axios";
import { GameView } from "./views/Game";
import { HomeView } from "./views/Home";

type State = {
  viewportWidth: number;
  viewportHeight: number;
};

type Props = {};

export default class Router extends Component<Props, State> {
  state: State;
  /**
   * Constructor for the class
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      viewportWidth: 0,
      viewportHeight: 0,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  /**
   * Triggers on component mount
   */
  async componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  /**
   * Triggers when component will unmount
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
    });
  }

  /**
   * Renders the component
   */
  render() {
    return (
      <Switch>
        <Route
          exact
          path={"/"}
          render={({ match }) => {
            setTimeout(this.context.loginWithRedirect, 0);
            return <HomeView />;
          }}
        />
        <Route
          path={"/game/:gameID"}
          render={({ match }) => <GameView match={match} />}
        />
      </Switch>
    );
  }
}
