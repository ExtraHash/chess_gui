import { KeyRingUtils } from "@extrahash/keyring";

// const whitePawn = 0x50
// const whiteKnight = 0x4e
// const whiteBishop = 0x42
// const whiteRook = 0x52
// const whiteQueen = 0x51
// const whiteKing = 0x4b
// const blackPawn = 0x70
// const blackKnight = 0x6e
// const blackBishop = 0x62
// const blackRook = 0x72
// const blackQueen = 0x71
// const blackKing = 0x6b
// const empty = 0x58

export function serializeBoard(board: Array<Array<number>>): Uint8Array {
  let stringBoard: string = "";
  for (const row of board) {
    for (const square of row) {
      stringBoard += String.fromCharCode(square);
    }
  }
  return KeyRingUtils.decodeUTF8(stringBoard);
}

export function deserializeBoard(board: Uint8Array) {
  const stringBoard = KeyRingUtils.encodeHex(board);
  console.log(stringBoard);
}
