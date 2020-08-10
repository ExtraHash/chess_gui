import React, { Component } from "react";
import ax from "axios";

type State = {};
type Props = {};

export class HomeView extends Component<Props, State> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <button
          onClick={async (event) => {
            const res = await ax.post("http://localhost:8000/game");
            window.location.href = "./game/" + res.data.gameID;
          }}
        >
          New Game
        </button>
      </div>
    );
  }
}
