import React from "react";
import '../footer/footer.css'

const Footer = () => {
    /*las redes van a ser iconos*/
    return(
        <div className="contFooter">
            <div className="redes">
                <a>Instagram</a>
                <a>Twitter</a>
            </div>
            <div className="enlacesLegales">
                <a>Aviso legal</a>
                <a>Política de privacidad</a>
                <a>Terminos y condiciones</a>
            </div>
        </div>
    ); 
  }

export default Footer;
