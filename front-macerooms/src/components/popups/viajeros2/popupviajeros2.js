import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import '../viajeros2/popupviajeros2.css';

const PopUpViajeros2 = ({adultos, setAdultos, ninos, setNinos, isOpen, onClose, numMaxAdultos, numMaxNinos}) => {
    const viajeros = useRef(null);

    const handleClose = () => {
        onClose();
    }

    const onClickRestar = () => {
        if (adultos != 0) {
            setAdultos(adultos-1);
        }
    }

    const onClickRestar2 = () => {
        if (ninos != 0) {
            setNinos(ninos-1);
        }
    }

    const onClickSumar = () => {
        if (adultos < numMaxAdultos){
            setAdultos(adultos+1);
        }
    }

    const onClickSumar2 = () => {
        if (ninos < numMaxNinos){
            setNinos(ninos+1);
        }
    }

    /*Hook que cierra el popup cuando se clicka fuera*/
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (viajeros.current && !viajeros.current.contains(event.target)) {
            onClose();
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
    }, []);
  
    return(
        <div ref={viajeros}>
            {isOpen && 
            
            <div className="viajeros2">
                <a onClick={handleClose}>Cerrar</a>
                <hr></hr>

                <div className='cantidad2'>
                    <div className='tipo2'>
                        <p>Adultos</p>

                        <div className='controlador2'>
                            <button onClick={onClickRestar}>-</button>
                            <p>{adultos}</p>
                            <button onClick={onClickSumar}>+</button>
                        </div>
                    </div>

                    <div className='tipo2'>
                        <p>Niños</p>
                        <div className='controlador2'>
                            <button onClick={onClickRestar2}>-</button>
                            <p>{ninos}</p>
                            <button onClick={onClickSumar2}>+</button>
                        </div>
                    </div>
                </div>
            </div>
            
            }
        </div>
    )
}

export default PopUpViajeros2
