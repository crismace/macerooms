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
		
		ResponseEntity<Iterable<Alojamiento>>alojamientos = servicio.alojamientosBusqueda(desde,hasta,provincia,numeroAdultos,numeroNinhos);
		
		return alojamientos;
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
	
	@GetMapping(path = "/encontrarAlojamientoDelAnfitrion", produces= {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<Iterable<Alojamiento>> encontrarAlojamientoDelAnfitrion (@RequestHeader(value=Constantes.TOKEN) String token){
		return  servicio.encontrarAlojamientosPorAnfitrion(token);
	}
	
	@PutMapping(path = "/actualizarAlojamiento", produces= {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<Alojamiento> actualizarAlojamiento (@RequestBody Alojamiento alojamiento){
		return  servicio.actualizar(alojamiento);
	}
	
	@DeleteMapping("/borrarAlojamientoPorId/{id}")
	public ResponseEntity<Boolean> borrarAlojamientoPorId (@PathVariable Long id){
		return  servicio.borrar(id);
	}
	
	@PostMapping(path = "/crearAlojamientoPrimeraVez", consumes = { MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<Long> createAlojamientoPrimeraVez(
			@RequestHeader(value=Constantes.TOKEN) String token,
			@RequestBody Alojamiento alojamiento) {
		System.out.println("Se publica alojamiento 1era vez");
		return  servicio.publicarAlojamientoPrimeraVez(token,alojamiento);
	}
	
	/**
	 * Separamos las peticiones en 2
	 * por un lado una peticion crea los datos del alojamiento
	 * esta peticion devuelve el id del alojamiento
	 * para realizar la segunda peticion que inserta las imagenes del alojamiento
	 * la primera imagen sera la portada, el resto son imagenes del carrusel se 
	 * pasara por parametro de url el id del alojamiento
	 * El tope por bulto de imagen es 100 MB esta definido en applicationproperties
	 */
	@PostMapping(path = "/crearAlojamiento", consumes = { MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<Long> crearAlojamiento(
			@RequestHeader(value=Constantes.TOKEN) String token,
			@RequestBody Alojamiento alojamiento) {
		System.out.println("Se publica alojamiento");
		return  servicio.publicarAlojamiento(token,alojamiento);
	}
	
	@PostMapping(path = "/subirImagenes", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity<Boolean> subirImagenes(
			@RequestParam(name="id",required = true) Long id,
			@RequestPart(name = "imagenPortada") MultipartFile imagenPortada,
			@RequestPart(name = "imagen1", required = true) MultipartFile imagen1,
			@RequestPart(name = "imagen2", required = true) MultipartFile imagen2,
			@RequestPart(name = "imagen3", required = true) MultipartFile imagen3){
		System.out.println("Se publican imagenes alojamiento");
		ResponseEntity<Boolean> respuesta= servicio.subirImagenes(id, imagenPortada, imagen1, imagen2, imagen3);
		System.out.println("Se terminan publican imagenes alojamiento");
		return respuesta;
	}
}