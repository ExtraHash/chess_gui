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
      <div className="page">
        <div className="container">
          <h2>Chess</h2>
          <br />
          <button
            onClick={async (event) => {
              const res = await ax.post(
                process.env.REACT_APP_BACKEND_URL + "/game"
              );
              window.location.href = "./game/" + res.data.gameID;
            }}
          >
            New Game
          </button>
        </div>
      </div>
    );
  }
}
