package macerooms.app.servicio;

import java.math.BigDecimal;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import macerooms.app.modelo.Alojamiento;
import macerooms.app.modelo.Reserva;
import macerooms.app.modelo.ReservaReducida;
import macerooms.app.modelo.Usuario;
import macerooms.app.utils.Constantes;
import macerooms.app.utils.ReservaEstadosCaculadora;

@Service
public class ReservaServicio {
	
	@Autowired
	private ReservaRepositorio reservasRepositorio;
	@Autowired
	private AlojamientoRepositorio alojamientosRepositorio;
	@Autowired
	private UsuarioRepositorio usuarioRepositorio;
	@Autowired
	private ReservaReducidaRepositorio reservaReducidaRepositorio;
	

	public ResponseEntity<Boolean> sePuedeReservar(Long idAlojamiento, Date desde, Date hasta) {
		Iterable<ReservaReducida> reservas = reservaReducidaRepositorio.alojamientoId(idAlojamiento);
		
		// Si alguna reserva ya existe para esa fecha se devuelve false
		for (ReservaReducida r : reservas) {
			if(r.getDesde().after(desde) && r.getHasta().before(hasta)) {
				System.out.println("false");
				return  ResponseEntity.ok(false);
			}
		}
		System.out.println("true");
		return ResponseEntity.ok(true);
	}
	
	public ResponseEntity<Reserva> crearReserva(String token, Long idAlojamiento, BigDecimal costeTotal,
			Reserva reserva) {
		Alojamiento alojamiento = alojamientosRepositorio.findById(idAlojamiento).get();
		reserva.setAlojamiento(alojamiento);
		Usuario usuario = usuarioRepositorio.findByToken(token);
		reserva.setCliente(usuario);
		reserva.setCosteTotal(costeTotal);
		reserva.setEstado(Constantes.CREADA);
		reserva.setFechaUltimoEstado(new Date());
		return ResponseEntity.ok(reservasRepositorio.save(reserva));
	}

	public ResponseEntity<Iterable<ReservaReducida>>  buscarIntervalosReserva(Long idAlojamiento) {
		return ResponseEntity.ok(reservaReducidaRepositorio.alojamientoId(idAlojamiento));
	}

	public ResponseEntity<Iterable<Reserva>> buscarReservasParaUsuario(String token) {
		return ResponseEntity.ok(reservasRepositorio.findByClienteToken(token));
	}

	public ResponseEntity<Object> buscarReservasParaAnfitrion(String token) {
		if(usuarioRepositorio.findByToken(token).getEsAnfitrion()) {
			return ResponseEntity.ok(reservasRepositorio.findByAlojamientoAnfitrionToken(token));
		}else {
			return ResponseEntity.badRequest().body("El usuario no es anfitrion");
		}
	}

	public ResponseEntity<Object> validarReservaAnfitrion(String token, Long reservaId) {
		Reserva reserva = reservasRepositorio.findById(reservaId).get();
		Usuario usuario = usuarioRepositorio.findByToken(token);
		if (reserva.getAlojamiento().getAnfitrion().getId().equals(usuario.getId())) {
			if (usuario.getEsAnfitrion()) {
				if (ReservaEstadosCaculadora.calcular(reserva, Constantes.VALIDADA)) {
					reserva.setEstado(Constantes.VALIDADA);
					reservasRepositorio.save(reserva);
					return ResponseEntity.ok(true);
				} else {
					return ResponseEntity.badRequest().body("Estado incompatible");
				}
			} else {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
			}
		} else {
			return ResponseEntity.badRequest().body("La reserva no pertenece al anfitrion");

		}
	}

	public ResponseEntity<Object> rechazarReservaAnfitrion(String token, Long reservaId) {
		Reserva reserva = reservasRepositorio.findById(reservaId).get();
		Usuario usuario = usuarioRepositorio.findByToken(token);
		if (reserva.getAlojamiento().getAnfitrion().getId().equals(usuario.getId())) {

			if (usuario.getEsAnfitrion()) {
				if (ReservaEstadosCaculadora.calcular(reserva, Constantes.RECHAZADA)) {
					reserva.setEstado(Constantes.RECHAZADA);
					reservasRepositorio.save(reserva);
					return ResponseEntity.ok(true);
				} else {
					return ResponseEntity.badRequest().body("Estado incompatible");
				}
			} else {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
			}
		} else {
			return ResponseEntity.badRequest().body("La reserva no pertenece al anfitrion");

		}
	}

	public ResponseEntity<Object> cancelarReservaCliente(String token, Long reservaId) {
		Reserva reserva = reservasRepositorio.findById(reservaId).get();
		Usuario usuario = usuarioRepositorio.findByToken(token);
		if (reserva.getCliente().getId().equals(usuario.getId())) {
			if (ReservaEstadosCaculadora.calcular(reserva, Constantes.CANCELADA)) {
				reserva.setEstado(Constantes.CANCELADA);
				reservasRepositorio.save(reserva);
				return ResponseEntity.ok(true);
			} else {
				return ResponseEntity.badRequest().body("Estado incompatible");
			}
		} else {
			return ResponseEntity.badRequest().body("La reserva no pertenece al cliente");
		}
	}
	
	public void validarReservaAuto(Reserva r) {
		r.setEstado(Constantes.VALIDADA);
		r.setFechaUltimoEstado(new Date ());
		reservasRepositorio.save(r);
		System.out.println("Se valida automaticamente la reserva con id " + r);
	}

	public Iterable<Reserva> reservasParaValidar() {
		return reservasRepositorio.findByEstado(Constantes.CREADA);
	}
}