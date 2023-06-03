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
import macerooms.app.utils.AlojamientoHelper;
import macerooms.app.utils.ValidarProvincia;

@Service
public class AlojamientosServicio {

	
	// Usamos la anotacion @Value para cargar propiedades del fichero application.properties (src/main/resources)
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
		// Este metodo es PostConstruct, se ejecuta cada vez que spring carga su contexto en el arranque
		// Se encarga de comprobar que la ruta donde se guardan las imagenes existe y sino existe la crea
		if (Files.notExists(Path.of(carpetaImagenes))) {
			Files.createDirectory(Path.of(carpetaImagenes));
		}
	}

	public ResponseEntity<Iterable<Alojamiento>> alojamientosBusqueda(Date fechaDesde, Date fechaHasta,
			String provincia, Integer numeroAdultos, Integer numeroNinhos) {
		// Este metodo se encarga de buscar los alojamientos
		// Se filtra por cada uno de los campos si procede ya que todos son opcionales
		Iterable<Alojamiento> alojamientosXProvincia = null;
		// Se usa la clase de utilidad validar provincia ya que si no se especifica tiene valor pendiente
		if (provincia != null && ValidarProvincia.validarProvincia(provincia)) {
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

	public ResponseEntity<Long> publicarAlojamientoPrimeraVez(String token, Alojamiento alojamiento) {
		// Al ser la primera vez que el usuario crea un alojamiento se pone el usuario en modo anfitrion
		Usuario anfitrion = usuarioRepositorio.findByToken(token);
		alojamiento.setAnfitrion(anfitrion);
		alojamientosRepositorio.save(alojamiento);
		anfitrion.setEsAnfitrion(true);
		usuarioRepositorio.save(anfitrion);
		System.out.println(alojamiento);
		return ResponseEntity.ok(alojamiento.getId());
	}
	
	public ResponseEntity<Long> publicarAlojamiento(String token, Alojamiento alojamiento) {
		alojamiento.setAnfitrion(usuarioRepositorio.findByToken(token));
		alojamientosRepositorio.save(alojamiento);
		System.out.println(alojamiento);
		return ResponseEntity.ok(alojamiento.getId());
	}

	public static String cogerExtensionDeImagen(MultipartFile imagen) {
		// Se crea este metodo para obtener la extension del fichero de imagen que se sube
		String nombreFichero = imagen.getOriginalFilename();
		if (nombreFichero != null) {
			int extension = nombreFichero.lastIndexOf(".");
			if (extension != -1) {
				return nombreFichero.substring(extension + 1);
			}
		}
		return null;
	}

	public ResponseEntity<Boolean> subirImagenes(Long id, MultipartFile imagenPortada, MultipartFile imagen1,
			MultipartFile imagen2, MultipartFile imagen3) {
		Alojamiento alojamiento = alojamientosRepositorio.findById(id).get();
		// Se crea imagen...UUid que genera un identificador unico aleatorio para guardar la imagen 
		// En la carpeta de imagenes,  y se traspasa el fichero desde la peticion a la carpeta
		String imagenPortadaNombreuuid = null;
		Path path = null;
		try {
			if (imagenPortada != null) {
				imagenPortadaNombreuuid = UUID.randomUUID().toString();
				path = Path.of(carpetaImagenes + File.separator + imagenPortadaNombreuuid + "."
						+ cogerExtensionDeImagen(imagenPortada));
				imagenPortada.transferTo(path);
				alojamiento.setImagenPortada(rutaRelativaImagenes + path.getFileName());
			}
			if (imagen1 != null) {
				imagenPortadaNombreuuid = UUID.randomUUID().toString();
				path = Path.of(carpetaImagenes + File.separator + imagenPortadaNombreuuid + "."
						+ cogerExtensionDeImagen(imagen1));
				imagen1.transferTo(path);
				alojamiento.setImagen1(rutaRelativaImagenes + path.getFileName());
			}
			if (imagen2 != null) {
				imagenPortadaNombreuuid = UUID.randomUUID().toString();
				path = Path.of(carpetaImagenes + File.separator + imagenPortadaNombreuuid + "."
						+ cogerExtensionDeImagen(imagen2));
				imagen2.transferTo(path);
				alojamiento.setImagen2(rutaRelativaImagenes + path.getFileName());
			}
			if (imagen3 != null) {
				imagenPortadaNombreuuid = UUID.randomUUID().toString();
				path = Path.of(carpetaImagenes + File.separator + imagenPortadaNombreuuid + "."
						+ cogerExtensionDeImagen(imagen3));
				imagen3.transferTo(path);
				alojamiento.setImagen3(rutaRelativaImagenes + path.getFileName());
			}
		} catch (IllegalStateException | IOException e) {
			e.printStackTrace();
		}

		alojamientosRepositorio.save(alojamiento);
		return ResponseEntity.ok(alojamiento.getImagenPortada() != null);
	}

	public ResponseEntity<Alojamiento> encontrarAlojamientoPorId(Long id) {
		return ResponseEntity.ok(alojamientosRepositorio.findById(id).get());
	}

	public ResponseEntity<Iterable<Alojamiento>> encontrarAlojamientosPorAnfitrion(String token) {
		return ResponseEntity.ok(alojamientosRepositorio.findAllByAnfitrionToken(token));
	}

	public ResponseEntity<Alojamiento> actualizar(Long id,Alojamiento alojamiento) {
		Alojamiento a = alojamientosRepositorio.findById(id).get();
		a = AlojamientoHelper.mapear(a, alojamiento);
		return ResponseEntity.ok(alojamientosRepositorio.save(a));
	}

	public ResponseEntity<Boolean> borrar(Long id) {
		System.out.println("se borra alojamiento con id : "+id);
		alojamientosRepositorio.deleteById(id);
		return ResponseEntity.ok(alojamientosRepositorio.findById(id).isPresent());
	}

}