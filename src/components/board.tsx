import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChessRook,
  faChessKnight,
  faChessBishop,
  faChessQueen,
  faChessKing,
  faChessPawn,
} from "@fortawesome/free-solid-svg-icons";
import ax from "axios";
import _ from "lodash";
import { serializeBoard } from "../utils/serialize";
import { keyring } from "..";
import { KeyRingUtils } from "@extrahash/keyring";
import moveSound from "../assets/move.wav";

type State = {
  selected: number[];
  modalActive: boolean;
};
type Props = {
  gameState: Array<Array<Array<number>>>;
  match: any;
  addMove: (state: Array<Array<number>>) => void;
};

const whitePawn = 0x50;
const whiteKnight = 0x4e;
const whiteBishop = 0x42;
const whiteRook = 0x52;
const whiteQueen = 0x51;
const whiteKing = 0x4b;

const blackPawn = 0x70;
const blackKnight = 0x6e;
const blackBishop = 0x62;
const blackRook = 0x72;
const blackQueen = 0x71;
const blackKing = 0x6b;

const empty = 0x58;

function squareColor(column: number, row: number): string {
  if (column % 2 === 0 && row % 2 === 0) {
    return "white square";
  }
  if (column % 2 !== 0 && row % 2 !== 0) {
    return "white square";
  }
  if (column % 2 !== 0 && row % 2 === 0) {
    return "black square";
  }
  if (column % 2 === 0 && row % 2 !== 0) {
    return "black square";
  }
  return "";
}

export class Board extends Component<Props, State> {
  state: State;
  socket: WebSocket | null;
  moveFX: HTMLAudioElement;

  constructor(props: Props) {
    super(props);
    this.state = {
      selected: [],
      modalActive: false,
    };

    this.socket = null;
    this.moveFX = new Audio(moveSound);

    this.moveFX.load();

    this.handleSquareClick = this.handleSquareClick.bind(this);
    this.movePiece = this.movePiece.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.renderSquare = this.renderSquare.bind(this);
    this.positionEqual = this.positionEqual.bind(this);
  }

  componentDidMount() {
    const socket = new WebSocket(
      process.env.REACT_APP_WS_URL + "/socket/" + this.props.match.params.gameID
    );
    if (socket) {
      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log(data);
          if (data.type === "move") {
            this.moveFX.play();
            this.props.addMove(data.board);
          }
        } catch (err) {
          console.warn(err);
        }
      };
    }
  }

  handleSquareClick(position: number[]) {
    if (this.state.selected.length === 0) {
      this.setState({
        selected: position,
      });
    } else {
      if (this.positionEqual(position, this.state.selected)) {
        this.setState({
          selected: [],
        });
      } else {
        this.handleMove(this.state.selected, position);
        this.setState({
          selected: [],
        });
      }
    }
  }

  movePiece(posA: number[], posB: number[]) {
    const currentState = _.cloneDeep(
      this.props.gameState[this.props.gameState.length - 1]
    );

    currentState[posB[0]][posB[1]] = currentState[posA[0]][posA[1]];
    currentState[posA[0]][posA[1]] = empty;

    return currentState;
  }

  async handleMove(posA: number[], posB: number[]) {
    const newState = this.movePiece(posA, posB);
    let promotion = false;
    if (newState[posB[0]][posB[1]] === whitePawn) {
      if (posB[0] === 0) {
        promotion = true;
      }
    }
    if (newState[posB[0]][posB[1]] === blackPawn) {
      if (posB[0] === 7) {
        promotion = true;
      }
    }

    if (!promotion) {
      await ax.patch(process.env.REACT_APP_BACKEND_URL + "/game", {
        gameID: this.props.match.params.gameID,
        state: newState,
        signed: KeyRingUtils.encodeHex(
          keyring.sign(serializeBoard(newState), "Uint8Array")
        ),
      });
    } else {
      this.handlePromotion(newState, posB);
    }
  }

  async handlePromotion(state: Array<Array<number>>, pos: number[]) {
    if (state[pos[0]][pos[1]] === whitePawn) {
      state[pos[0]][pos[1]] = whiteQueen;
    }
    if (state[pos[0]][pos[1]] === blackPawn) {
      state[pos[0]][pos[1]] = blackQueen;
    }
    await ax.patch(process.env.REACT_APP_BACKEND_URL + "/game", {
      gameID: this.props.match.params.gameID,
      state: state,
      signed: KeyRingUtils.encodeHex(
        keyring.sign(serializeBoard(state), "Uint8Array")
      ),
    });
  }

  renderSquare(contents: number, color: string, position: number[]) {
    switch (contents) {
      case whiteKing:
        return (
          <div
            className={`${color}${
              this.positionEqual(this.state.selected, position)
                ? " selected"
                : ""
            }`}
            onClick={() => {
              this.handleSquareClick(position);
            }}
          >
            <FontAwesomeIcon
              icon={faChessKing}
              className="white-piece"
              key={String("square" + position[0] + "-" + position[1])}
            />
          </div>
        );
      case whiteQueen:
        return (
          <div
            className={`${color}${
              this.positionEqual(this.state.selected, position)
                ? " selected"
                : ""
            }`}
            onClick={() => {
              this.handleSquareClick(position);
            }}
          >
            <FontAwesomeIcon
              icon={faChessQueen}
              className="white-piece"
              key={String("square" + position[0] + "-" + position[1])}
            />
          </div>
        );
      case whiteRook:
        return (
          <div
            className={`${color}${
              this.positionEqual(this.state.selected, position)
                ? " selected"
                : ""
            }`}
            onClick={() => {
              this.handleSquareClick(position);
            }}
          >
            <FontAwesomeIcon
              icon={faChessRook}
              className="white-piece"
              key={String("square" + position[0] + "-" + position[1])}
            />
          </div>
        );
      case whiteBishop:
        return (
          <div
            className={`${color}${
              this.positionEqual(this.state.selected, position)
                ? " selected"
                : ""
            }`}
            onClick={() => {
              this.handleSquareClick(position);
            }}
          >
            <FontAwesomeIcon
              icon={faChessBishop}
              className="white-piece"
              key={String("square" + position[0] + "-" + position[1])}
            />
          </div>
        );
      case whiteKnight:
        return (
          <div
            className={`${color}${
              this.positionEqual(this.state.selected, position)
                ? " selected"
                : ""
            }`}
            onClick={() => {
              this.handleSquareClick(position);
            }}
          >
            <FontAwesomeIcon
              icon={faChessKnight}
              className="white-piece"
              key={String("square" + position[0] + "-" + position[1])}
            />
          </div>
        );
      case whitePawn:
        return (
          <div
            className={`${color}${
              this.positionEqual(this.state.selected, position)
                ? " selected"
                : ""
            }`}
            onClick={() => {
              this.handleSquareClick(position);
            }}
          >
            <FontAwesomeIcon
              icon={faChessPawn}
              className="white-piece"
              key={String("square" + position[0] + "-" + position[1])}
            />
          </div>
        );
      case blackKing:
        return (
          <div
            className={`${color}${
              this.positionEqual(this.state.selected, position)
                ? " selected"
                : ""
            }`}
            onClick={() => {
              this.handleSquareClick(position);
            }}
          >
            <FontAwesomeIcon
              icon={faChessKing}
              className="black-piece"
              key={String("square" + position[0] + "-" + position[1])}
            />
          </div>
        );
      case blackQueen:
        return (
          <div
            className={`${color}${
              this.positionEqual(this.state.selected, position)
                ? " selected"
                : ""
            }`}
            onClick={() => {
              this.handleSquareClick(position);
            }}
          >
            <FontAwesomeIcon
              icon={faChessQueen}
              className="black-piece"
              key={String("square" + position[0] + "-" + position[1])}
            />
          </div>
        );
      case blackRook:
        return (
          <div
            className={`${color}${
              this.positionEqual(this.state.selected, position)
                ? " selected"
                : ""
            }`}
            onClick={() => {
              this.handleSquareClick(position);
            }}
          >
            <FontAwesomeIcon
              icon={faChessRook}
              className="black-piece"
              key={String("square" + position[0] + "-" + position[1])}
            />
          </div>
        );
      case blackBishop:
        return (
          <div
            className={`${color}${
              this.positionEqual(this.state.selected, position)
                ? " selected"
                : ""
            }`}
            onClick={() => {
              this.handleSquareClick(position);
            }}
          >
            <FontAwesomeIcon
              icon={faChessBishop}
              className="black-piece"
              key={String("square" + position[0] + "-" + position[1])}
            />
          </div>
        );
      case blackKnight:
        return (
          <div
            className={`${color}${
              this.positionEqual(this.state.selected, position)
                ? " selected"
                : ""
            }`}
            onClick={() => {
              this.handleSquareClick(position);
            }}
          >
            <FontAwesomeIcon
              icon={faChessKnight}
              className="black-piece"
              key={String("square" + position[0] + "-" + position[1])}
            />
          </div>
        );
      case blackPawn:
        return (
          <div
            className={`${color}${
              this.positionEqual(this.state.selected, position)
                ? " selected"
                : ""
            }`}
            onClick={() => {
              this.handleSquareClick(position);
            }}
          >
            <FontAwesomeIcon
              icon={faChessPawn}
              className="black-piece"
              key={String("square" + position[0] + "-" + position[1])}
            />
          </div>
        );
      case empty:
        return (
          <div
            className={`${color}${
              this.positionEqual(this.state.selected, position)
                ? " selected"
                : ""
            }`}
            onClick={() => {
              this.handleSquareClick(position);
            }}
            key={String("square" + position[0] + "-" + position[1])}
          />
        );
      default:
        return <p>derp</p>;
    }
  }

  positionEqual(posA: number[], posB: number[]) {
    return posA[0] === posB[0] && posA[1] === posB[1];
  }

  render() {
    let i = 0;
    let j = 0;

    if (this.props.gameState.length > 0) {
      return (
        <div>
          <div className="chessboard">
            {this.props.gameState[this.props.gameState.length - 1].map(
              (row: any) => {
                const newRow = row.map((square: any) => {
                  const newSquare = (
                    <span key={"row-" + j}>
                      {this.renderSquare(square, squareColor(i, j), [i, j])}
                    </span>
                  );
                  j++;
                  return newSquare;
                });
                i++;
                j = 0;
                return newRow;
              }
            )}
          </div>
          <div className={`modal ${this.state.modalActive ? "active" : ""}`}>
            <div className="modal-content">
              <span
                className="close"
                onClick={() => {
                  this.setState({ modalActive: false });
                }}
              >
                &times;
              </span>
              <h2>Select Piece</h2>
              <div className="buttons">
                <button>
                  <FontAwesomeIcon icon={faChessQueen} />
                </button>
                <button>
                  <FontAwesomeIcon icon={faChessRook} />
                </button>
                <button>
                  <FontAwesomeIcon icon={faChessBishop} />
                </button>
                <button>
                  <FontAwesomeIcon icon={faChessKnight} />
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
