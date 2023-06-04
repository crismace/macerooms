package macerooms.app;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import macerooms.app.modelo.Reserva;
import macerooms.app.modelo.ReservaReducida;
import macerooms.app.servicio.ReservaServicio;

@RestController
public class PeticionesReservas {
	@Autowired
	private ReservaServicio servicio;

	@GetMapping(path = "/fechasReservadasAlojamiento/{id}", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Iterable<ReservaReducida>> fechasReservadasAlojamiento(@PathVariable Long id) {
		// Se encarga de devolver los intervalos en los que un alojamiento esta reservado
		return servicio.buscarIntervalosReserva(id);
	}

	@PostMapping(path = "/sePuedeReservar", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Boolean> sePuedeReservar(@RequestBody Map<String, String> json) {
		System.out.println("Se puede reservar parametros id "+json.get("idAlojamiento")+" "+json.get("fechaDesde")+" "+json.get("fechaHasta"));
		Date desde = Date.from(Instant.from(DateTimeFormatter.ISO_INSTANT.parse(json.get("fechaDesde").toString())));
		Date hasta = Date.from(Instant.from(DateTimeFormatter.ISO_INSTANT.parse(json.get("fechaHasta").toString())));
		// valida si es posible reservar un alojamiento
		return servicio.sePuedeReservar(Long.parseLong(json.get("idAlojamiento").toString()), desde, hasta);
	}
	
	@PostMapping(path = "/crearReserva", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Reserva> crearReserva(@RequestParam String token, @RequestParam Long idAlojamiento,
			@RequestParam BigDecimal costeTotal, @RequestBody Reserva reserva) {
			System.out.print(token);
		ResponseEntity<Reserva> reservaResponse = servicio.crearReserva(token, idAlojamiento, costeTotal, reserva);
		return reservaResponse;
	}


	@PostMapping(path = "/obtenerReservasParaUsuario", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Iterable<Reserva>> obtenerReservasParaUsuario(@RequestBody Map<String, String> json) {
		return servicio.buscarReservasParaUsuario(json.get("token"));
	}

	@PostMapping(path = "/obtenerReservasParaAnfitrion", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Object> obtenerReservasParaAnfitrion(@RequestBody Map<String, Object> json) {
		return servicio.buscarReservasParaAnfitrion(json.get("token").toString());
	}

	@PostMapping(path = "/validarReservaAnfitrion", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Object> validarReservaAnfitrion(@RequestBody Map<String, Object> json) {
		return servicio.validarReservaAnfitrion(json.get("token").toString(),Long.parseLong(json.get("reservaId").toString()));
	}

	@PostMapping(path = "/rechazarReservaAnfitrion", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Object> rechazarReservaAnfitrion(@RequestBody Map<String, Object> json) {
		return servicio.rechazarReservaAnfitrion(json.get("token").toString(),Long.parseLong(json.get("reservaId").toString()));
	}

	@PostMapping(path = "/cancelarReservaCliente", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Object> cancelarReservaCliente(@RequestBody Map<String, Object> json) {
		return servicio.cancelarReservaCliente(json.get("token").toString(),Long.parseLong(json.get("reservaId").toString()));
	}
}
