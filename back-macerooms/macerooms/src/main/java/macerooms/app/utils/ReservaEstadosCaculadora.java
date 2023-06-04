package macerooms.app.utils;

import java.util.Date;

import macerooms.app.modelo.Reserva;

public class ReservaEstadosCaculadora {
	public static boolean calcular(Reserva reserva, String estadoAFijar) {
		/*
		 * Estados pueden ser: CREADA a VALIDADA CREADA a VALIDADA a CANCELADA CREADA a
		 * CANCELADA CREADA a RECHAZADA
		 */
		if (reserva.getEstado().equals(Constantes.RECHAZADA) && estadoAFijar.equals(Constantes.CANCELADA)) {
			return false;
		}
		
		// Cargamos la ultima modificacion
		reserva.setFechaUltimoEstado(new Date());
		return true;
	}
}