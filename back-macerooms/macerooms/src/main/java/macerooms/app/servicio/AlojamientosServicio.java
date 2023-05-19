package macerooms.app.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import macerooms.app.modelo.Alojamiento;

@Service
public class AlojamientosServicio {

	@Autowired
	private AlojamientoRepositorio repositorio;

	public Iterable<Alojamiento> alojamientosPantallaPrincipal() {
		return repositorio.findAll();
	}

}