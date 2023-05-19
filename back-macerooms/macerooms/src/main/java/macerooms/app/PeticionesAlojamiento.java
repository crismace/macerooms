package macerooms.app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import macerooms.app.modelo.Alojamiento;
import macerooms.app.servicio.AlojamientosServicio;

@RestController

public class PeticionesAlojamiento {
	@Autowired
	private AlojamientosServicio servicio;
	
	@GetMapping("/buscarAlojamientosInicio")
	public ResponseEntity<Iterable<Alojamiento>> registro() {
		System.out.println("Se buscan alojamientos inicio");
		return ResponseEntity.ok(servicio.alojamientosPantallaPrincipal());
	}

}
