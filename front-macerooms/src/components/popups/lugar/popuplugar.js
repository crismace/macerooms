import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import '../lugar/popuplugar.css'

const PopUpLugar = ({provincia, setProvincia, isOpen, onClose}) => {
    const lugar = useRef(null);

    const handleClose = () => {
        onClose();
    }

    /*Hook que cierra el popup cuando se clicka fuera*/
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (lugar.current && !lugar.current.contains(event.target)) {
            onClose();
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
    }, []);

    const onClickCoruna = () => {
        setProvincia("A Coruña");
    }

    const onClickLugo = () => {
        setProvincia("Lugo");
    }

    const onClickOurense = () => {
        setProvincia("Ourense");
    }

    const onClickPontevedra= () => {
        setProvincia("Pontevedra");
    }
  
    return(
        <div ref={lugar}>
            {isOpen && 
            
            <div className="lugar">
                <a onClick={handleClose}>Cerrar</a>
                <hr></hr>

                <div className='sitios'>
                    <div onClick={onClickCoruna}>
                        <img src="images/acoruna.png"></img>
                        <p>A Coruña</p>
                    </div>
                    <div onClick={onClickLugo}>
                        <img src="images/lugo.png"></img>
                        <p>Lugo</p>
                    </div>
                    <div onClick={onClickPontevedra}>
                        <img src="images/pontevedra.png"></img>
                        <p>Pontevedra</p>
                    </div>
                    <div onClick={onClickOurense}>
                        <img src="images/ourense.png"></img>
                        <p>Ourense</p>
                    </div>
                </div>
            </div>
            
            }
        </div>
    )
}

export default PopUpLugar
