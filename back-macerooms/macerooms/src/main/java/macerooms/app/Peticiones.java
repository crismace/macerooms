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

public class Peticiones {

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
		
		if(token == null) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("");
		}
		
		return ResponseEntity.ok(token);
	}
	
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody Map<String, String> json) {
		String token = servicio.login(json.get("email"), json.get("contrasena"));
		
		if(token == null) {
			return ResponseEntity.badRequest().body("");
		}
		
		return ResponseEntity.ok(token);
	}
	
}
