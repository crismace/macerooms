import React from "react";
import '../header/header.css'

const Header = () => {

    return(
        <div className="contHeader">
            <img src="images/logo.png"></img>

            <input className="buscador" type="text"/>

            <div className="usuario">
                <img src="images/icono-casa.png"></img>
            </div>
        </div>
    ); 
  }

export default Header;
