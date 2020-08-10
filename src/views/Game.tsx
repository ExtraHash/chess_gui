import React, { Component } from "react";
import { Board } from "../components/board";
import ax from "axios";

type State = {
  gameState: Array<Array<Number>>;
};
type Props = {
  match: any;
};

export class GameView extends Component<Props, State> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      gameState: [],
    };
  }

  async componentDidMount() {
    const res = await ax.get(
      "http://localhost:8000/game/" + this.props.match.params.gameID
    );
    console.log(res);

    if (res.status === 200) {
      this.setState({
        gameState: res.data.state,
      });
    }
  }

  render() {
    return <Board gameState={this.state.gameState} />;
  }
}
