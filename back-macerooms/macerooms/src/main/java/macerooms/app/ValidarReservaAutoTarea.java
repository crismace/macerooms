package macerooms.app;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import macerooms.app.modelo.Reserva;
import macerooms.app.servicio.ReservaServicio;

@Component
public class ValidarReservaAutoTarea {
	// propiedad que define cuantos dias deben pasar para que se valide automaticamente una reserva
	@Value("${diasValidacion}")
	private Long diasValidacion;

	@Autowired
	private ReservaServicio servicio;

	// Uso la anotcion scheduled para definir cada cuanto tiempo se debe ejecutar
	// la tarea de validación automatica
	@Scheduled(timeUnit = TimeUnit.MINUTES, fixedRateString = "${minutosValidacionAuto}")
	public void validarAuto() {
		System.out.println("Se ejecuta tarea validacion auto");
		// Se buscan las reservas para validar y se ve si cumplen las condiciones para ser validadas.
		for (Reserva r : servicio.reservasParaValidar()) {
			if (ChronoUnit.DAYS.between(r.getFechaUltimoEstado().toInstant(), Instant.now()) >= diasValidacion) {
				servicio.validarReservaAuto(r);
			}
			System.out.println("Estado reserva id -> " + r.getId() + " dias desde creacion -> "
					+ ChronoUnit.DAYS.between(r.getFechaUltimoEstado().toInstant(), Instant.now()) + " estado -> "
					+ r.getEstado());
		}
	}

}
