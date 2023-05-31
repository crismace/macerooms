package macerooms.app;

import java.text.ParseException;
import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import macerooms.app.modelo.Alojamiento;
import macerooms.app.modelo.AlojamientoReducido;
import macerooms.app.servicio.AlojamientosServicio;
import macerooms.app.utils.Constantes;
@CrossOrigin(origins = "*")
@RestController
public class PeticionesAlojamiento {

	@Autowired
	private AlojamientosServicio servicio;

	@GetMapping(path="/buscarAlojamientos")
	public ResponseEntity<Iterable<Alojamiento>> buscarAlojamientos(
			@RequestParam(required = false) String fechaDesde,
			@RequestParam(required = false) String fechaHasta,
			@RequestParam(required = false) String provincia,
			@RequestParam(required = false) Integer numeroAdultos,
			@RequestParam(required = false) Integer numeroNinhos
			) throws ParseException {
		Date desde = null;
		Date hasta = null;
		if(fechaDesde != null && fechaHasta != null) {
			 desde = Date.from(Instant.from(DateTimeFormatter.ISO_INSTANT.parse(fechaDesde)));
			 hasta = Date.from(Instant.from(DateTimeFormatter.ISO_INSTANT.parse(fechaHasta)));
		}

		System.out.println("Se buscan alojamientos busqueda x parametros");
		return servicio.alojamientosBusqueda(desde,hasta,provincia,numeroAdultos,numeroNinhos);
	}
	
	@GetMapping("/buscarAlojamientosInicio")
	public ResponseEntity<Iterable<AlojamientoReducido>> registro() {
		System.out.println("Se buscan alojamientos inicio");
		return ResponseEntity.ok(servicio.alojamientosPantallaPrincipal());
	}
	
	@GetMapping(path = "/encontrarAlojamientoPorId/{id}" , produces= {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<Alojamiento> encontrarAlojamientoPorId (@PathVariable Long id){
		return  servicio.encontrarAlojamientoPorId(id);
	}
	
	@GetMapping(path = "/encontrarAlojamientoPorUsuario", produces= {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<Iterable<Alojamiento>> encontrarAlojamientoPorUsuario (@RequestHeader(value=Constantes.TOKEN) String token){
		return  servicio.encontrarAlojamientosPorUsuario(token);
	}
	
	@PutMapping(path = "/actualizarAlojamiento", produces= {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<Alojamiento> actualizarAlojamiento (@RequestBody Alojamiento alojamiento){
		return  servicio.actualizar(alojamiento);
	}
	
	@DeleteMapping("/borrarAlojamientoPorId/{id}")
	public ResponseEntity<Boolean> borrarAlojamientoPorId (@PathVariable Long id){
		return  servicio.borrar(id);
	}
	
}