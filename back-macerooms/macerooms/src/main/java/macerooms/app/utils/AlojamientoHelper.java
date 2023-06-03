package macerooms.app.utils;

import macerooms.app.modelo.Alojamiento;

public class AlojamientoHelper {
	// Se crea este metodo para actualizar adecuadamente el alojamiento
	public static Alojamiento mapear(Alojamiento alojamientoOri,Alojamiento alojamientoDes) {
		Alojamiento alojamientoDTO = alojamientoOri;
	    alojamientoDTO.setTitulo(alojamientoDes.getTitulo());
	    alojamientoDTO.setDescripcion(alojamientoDes.getDescripcion());
	    alojamientoDTO.setNormas(alojamientoDes.getNormas());
	    alojamientoDTO.setLatitud(alojamientoDes.getLatitud());
	    alojamientoDTO.setLongitud(alojamientoDes.getLongitud());
	    alojamientoDTO.setNumMaxAdultos(alojamientoDes.getNumMaxAdultos());
	    alojamientoDTO.setNumMaxNinhos(alojamientoDes.getNumMaxNinhos());
	    alojamientoDTO.setNumeroBanhos(alojamientoDes.getNumeroBanhos());
	    alojamientoDTO.setNumeroCamas(alojamientoDes.getNumeroCamas());
	    alojamientoDTO.setNumeroHabitaciones(alojamientoDes.getNumeroHabitaciones());
	    alojamientoDTO.setProvincia(alojamientoDes.getProvincia());
	    alojamientoDTO.setPrecio(alojamientoDes.getPrecio());
	    alojamientoDTO.setGastosLimpieza(alojamientoDes.getGastosLimpieza());
	    return alojamientoDTO;
	  }
}
