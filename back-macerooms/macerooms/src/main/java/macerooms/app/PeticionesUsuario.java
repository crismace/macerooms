package macerooms.app;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import macerooms.app.modelo.Usuario;
import macerooms.app.servicio.UsuarioServicio;

@RestController

public class PeticionesUsuario {

	@Autowired
	private UsuarioServicio servicio;
	
//	@GetMapping ("/hello")
//	
//	public String prueba() {
//		return "Juan";
//	}
//	
	@PostMapping("/registro")
	public ResponseEntity<String> registro(@RequestBody Usuario usuario) {
		String token = servicio.registro(usuario);
		System.out.println("El usuario "+usuario.getEmail()+" intenta registrar");

		if(token == null) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("");
		}
		
		return ResponseEntity.ok(token);
	}
	
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody Map<String, String> json) {
		String token = servicio.login(json.get("email"), json.get("contrasena"));
		System.out.println("El usuario "+json.get("email")+" intenta inciar sesión");
		if(token == null) {
			return ResponseEntity.badRequest().body("");
		}
		
		return ResponseEntity.ok(token);
	}
	
	@PostMapping("/esAnfitrion")
	public ResponseEntity<Boolean> esAnfitrion(@RequestBody Map<String,String> json){
		Boolean esAnfitrion = servicio.esAnfitrion(json.get("token"));
		if(esAnfitrion == null) {
			esAnfitrion = false;
		}
		return ResponseEntity.ok(esAnfitrion);
	}
	
	@PostMapping("/cambiarClave")
	public ResponseEntity<Boolean> cambiarClave(@RequestBody Map<String,String> json){
		return servicio.cambiarClave(json.get("token"),json.get("claveAntigua"),json.get("claveNueva"),json.get("claveNueva2"));
	}
	
}