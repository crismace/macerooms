package macerooms.app.servicio;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.annotation.PostConstruct;
import macerooms.app.modelo.Alojamiento;
import macerooms.app.modelo.AlojamientoReducido;
import macerooms.app.modelo.Reserva;
import macerooms.app.modelo.Usuario;

@Service
public class AlojamientosServicio {

	@Value("${carpetaImagenes}")
	private String carpetaImagenes;
	@Value("${rutaRelativaImagenes}")
	private String rutaRelativaImagenes;

	@Autowired
	private AlojamientoReducidoRepositorio alojamientoReducidoRepositorio;
	
	@Autowired
	private AlojamientoRepositorio alojamientosRepositorio;

	@Autowired
	private UsuarioRepositorio usuarioRepositorio;
	
	@Autowired
	private ReservaRepositorio reservaRepositorio;

	@PostConstruct
	public void comprobarCarpetaImagenes() throws IOException {
		if (Files.notExists(Path.of(carpetaImagenes))) {
			Files.createDirectory(Path.of(carpetaImagenes));
		}
	}

	public ResponseEntity<Iterable<Alojamiento>> alojamientosBusqueda(Date fechaDesde, Date fechaHasta,
			String provincia, Integer numeroAdultos, Integer numeroNinhos) {
		/**
		 * Primero se busca por provincia Despues se traen las reservas para cada
		 * alojamiento y se ve si hay disponibilidad Despues se comprueba si es
		 * compatible con el numero de adultos y ninios de la busqueda se devuelven los
		 * alojamientos
		 */

		Iterable<Alojamiento> alojamientosXProvincia = null;
		if (provincia != null) {
			alojamientosXProvincia = alojamientosRepositorio.findByProvincia(provincia);
		} else {
			alojamientosXProvincia = alojamientosRepositorio.findAll();
		}
		List<Alojamiento> alojamientosCompatibles = new ArrayList<>();
		boolean fechasExisten = (fechaDesde != null && fechaHasta != null);
		if (fechasExisten) {
			Map<Alojamiento, List<Reserva>> map = new HashMap<>();
			Iterable<Reserva> reservas = reservaRepositorio.findAll();
			// Iniciamos el mapa con un alojamiento y una lista vacia de reservas
			alojamientosXProvincia.forEach(a -> map.put(a, new ArrayList<>()));
			// Con un solo bucle y un map nos evitamos hacer un doble for anidado
			reservas.forEach(a -> {
				if (map.containsKey(a.getAlojamiento())) {
					map.get(a.getAlojamiento()).add(a);
				}
			});

			for (Map.Entry<Alojamiento, List<Reserva>> alojamientoReserva : map.entrySet()) {
				boolean intervaloCoincide = false;
				intervaloCoincide = alojamientoReserva.getValue().stream()
						.anyMatch(r -> r.getDesde().after(fechaDesde) && r.getHasta().before(fechaHasta));
				if (!intervaloCoincide) {
					alojamientosCompatibles.add(alojamientoReserva.getKey());
				}

			}
		} else {
			alojamientosCompatibles = (List<Alojamiento>) alojamientosXProvincia;
		}
		List<Alojamiento> alojamientosXAdultosYNinios = new ArrayList<>();

		if (numeroAdultos == null) {
			numeroAdultos = 1;

		}
		if (numeroNinhos == null) {
			numeroNinhos = 0;
		}
		for (Alojamiento a : alojamientosCompatibles) {
			if (numeroAdultos <= a.getNumMaxAdultos() && numeroNinhos <= a.getNumMaxNinhos()) {
				alojamientosXAdultosYNinios.add(a);
			}
		}

		return ResponseEntity.ok(alojamientosXAdultosYNinios);
	}

	public Iterable<AlojamientoReducido> alojamientosPantallaPrincipal() {
		return alojamientoReducidoRepositorio.findAll();
	}


	public ResponseEntity<Alojamiento> encontrarAlojamientoPorId(Long id) {
		return ResponseEntity.ok(alojamientosRepositorio.findById(id).get());
	}

	public ResponseEntity<Iterable<Alojamiento>> encontrarAlojamientosPorUsuario(String token) {
		return ResponseEntity.ok(alojamientosRepositorio.findAllByAnfitrion(token));
	}

	public ResponseEntity<Alojamiento> actualizar(Alojamiento alojamiento) {
		return ResponseEntity.ok(alojamientosRepositorio.save(alojamiento));
	}

	public ResponseEntity<Boolean> borrar(Long id) {
		alojamientosRepositorio.delete(alojamientosRepositorio.findById(id).get());
		return ResponseEntity.ok(alojamientosRepositorio.findById(id).get() != null);
	}

}