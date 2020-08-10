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

type State = {
  selected: number[];
};
type Props = {
  gameState: Array<Array<Array<number>>>;
  match: any;
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

function squareColor(column: number, row: number) {
  if (column % 2 === 0 && row % 2 === 0) {
    return "white square";
  }
  if (column % 2 !== 0 && row % 2 === 0) {
    return "black square";
  }
  if (column % 2 === 0 && row % 2 !== 0) {
    return "black square";
  }
  if (column % 2 !== 0 && row % 2 !== 0) {
    return "white square";
  }
  return "pink square ";
}

export class Board extends Component<Props, State> {
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      selected: [],
    };

    this.handleSquareClick = this.handleSquareClick.bind(this);
    this.movePiece = this.movePiece.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.renderSquare = this.renderSquare.bind(this);
    this.positionEqual = this.positionEqual.bind(this);
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
        console.log("MOVE", this.state.selected, position);
        this.handleMove(this.state.selected, position)
        this.setState({
          selected: [],
        });
      }
    }
  }

  movePiece(posA: number[], posB: number[]) {
    const { gameState } = this.props;
    const currentState = gameState[gameState.length - 1]
    currentState[posB[0]][posB[1]] = currentState[posA[0]][posA[1]]
    currentState[posA[0]][posA[1]] = empty;
    return currentState; 
  }

  async handleMove(posA: number[], posB: number[]) {
    const newState = this.movePiece(posA, posB);
    const res = await ax.patch("http://localhost:8000/game", {
      gameID: this.props.match.params.gameID,
      state: newState
    })
    console.log(res);
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
      );
    } else {
      return null;
    }
  }
}
