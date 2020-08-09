import React from 'react';
import "./stylesheets/style.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChessRook, faChessKnight, faChessBishop, faChessQueen, faChessKing, faChessPawn } from '@fortawesome/free-solid-svg-icons'

function App() {
  return (

<div className="chessboard">

<div className="white"><FontAwesomeIcon icon={faChessRook} className="black-piece" /></div>
<div className="black"><FontAwesomeIcon icon={faChessKnight} className="black-piece" /></div>
<div className="white"><FontAwesomeIcon icon={faChessBishop} className="black-piece" /></div>
<div className="black"><FontAwesomeIcon icon={faChessQueen} className="black-piece" /></div>
<div className="white"><FontAwesomeIcon icon={faChessKing} className="black-piece" /></div>
<div className="black"><FontAwesomeIcon icon={faChessBishop} className="black-piece" /></div>
<div className="white"><FontAwesomeIcon icon={faChessKnight} className="black-piece" /></div>
<div className="black"><FontAwesomeIcon icon={faChessRook} className="black-piece" /></div>

<div className="black"><FontAwesomeIcon icon={faChessPawn} className="black-piece" /></div>
<div className="white"><FontAwesomeIcon icon={faChessPawn} className="black-piece" /></div>
<div className="black"><FontAwesomeIcon icon={faChessPawn} className="black-piece" /></div>
<div className="white"><FontAwesomeIcon icon={faChessPawn} className="black-piece" /></div>
<div className="black"><FontAwesomeIcon icon={faChessPawn} className="black-piece" /></div>
<div className="white"><FontAwesomeIcon icon={faChessPawn} className="black-piece" /></div>
<div className="black"><FontAwesomeIcon icon={faChessPawn} className="black-piece" /></div>
<div className="white"><FontAwesomeIcon icon={faChessPawn} className="black-piece" /></div>

<div className="white"></div>
<div className="black"></div>
<div className="white"></div>
<div className="black"></div>
<div className="white"></div>
<div className="black"></div>
<div className="white"></div>
<div className="black"></div>

<div className="black"></div>
<div className="white"></div>
<div className="black"></div>
<div className="white"></div>
<div className="black"></div>
<div className="white"></div>
<div className="black"></div>
<div className="white"></div>

<div className="white"></div>
<div className="black"></div>
<div className="white"></div>
<div className="black"></div>
<div className="white"></div>
<div className="black"></div>
<div className="white"></div>
<div className="black"></div>

<div className="black"></div>
<div className="white"></div>
<div className="black"></div>
<div className="white"></div>
<div className="black"></div>
<div className="white"></div>
<div className="black"></div>
<div className="white"></div>

<div className="white"><FontAwesomeIcon icon={faChessPawn} className="white-piece" /></div>
<div className="black"><FontAwesomeIcon icon={faChessPawn} className="white-piece" /></div>
<div className="white"><FontAwesomeIcon icon={faChessPawn} className="white-piece" /></div>
<div className="black"><FontAwesomeIcon icon={faChessPawn} className="white-piece" /></div>
<div className="white"><FontAwesomeIcon icon={faChessPawn} className="white-piece" /></div>
<div className="black"><FontAwesomeIcon icon={faChessPawn} className="white-piece" /></div>
<div className="white"><FontAwesomeIcon icon={faChessPawn} className="white-piece" /></div>
<div className="black"><FontAwesomeIcon icon={faChessPawn} className="white-piece" /></div>

<div className="black"><FontAwesomeIcon icon={faChessRook} className="white-piece" /></div>
<div className="white"><FontAwesomeIcon icon={faChessKnight} className="white-piece" /></div>
<div className="black"><FontAwesomeIcon icon={faChessBishop} className="white-piece" /></div>
<div className="white"><FontAwesomeIcon icon={faChessQueen} className="white-piece" /></div>
<div className="black"><FontAwesomeIcon icon={faChessKing} className="white-piece" /></div>
<div className="white"><FontAwesomeIcon icon={faChessBishop} className="white-piece" /></div>
<div className="black"><FontAwesomeIcon icon={faChessKnight} className="white-piece" /></div>
<div className="white"><FontAwesomeIcon icon={faChessRook} className="white-piece" /></div>
</div>
  );
}

export default App;
