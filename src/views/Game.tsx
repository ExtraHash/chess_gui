import React, { Component } from "react";
import { Board } from "../components/board";
import ax from "axios";

type State = {
  gameState: Array<Array<Array<number>>>;
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

    this.addMove = this.addMove.bind(this);
  }

  async componentDidMount() {
    const res = await ax.get(
      process.env.REACT_APP_BACKEND_URL +
        "/game/" +
        this.props.match.params.gameID
    );
    if (res.status === 200) {
      this.setState({
        gameState: res.data.state,
      });
    }
  }

  addMove(state: Array<Array<number>>): void {
    const { gameState } = this.state;
    console.log("OLD STATE", gameState);
    gameState.push(state);
    this.setState({
      gameState,
    });
  }

  render() {
    return (
      <div className="container">
        <Board
          gameState={this.state.gameState}
          match={this.props.match}
          addMove={this.addMove}
        />
        <button
          onClick={async (event) => {
            const res = await ax.post(
              process.env.REACT_APP_BACKEND_URL + "/game"
            );
            window.location.href = "../game/" + res.data.gameID;
          }}
        >
          New Game
        </button>
      </div>
    );
  }
}
