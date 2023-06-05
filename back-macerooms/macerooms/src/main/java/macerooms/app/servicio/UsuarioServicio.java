package macerooms.app.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import macerooms.app.modelo.Usuario;

@Service
public class UsuarioServicio {

	@Autowired
	private UsuarioRepositorio userRepositorio;

	private static final String SECRET_KEY = "claveSuperSecretaclaveSuperSecretaclaveSuperSecretaclaveSuperSecretaclaveSuperSecreta"; // Clave secreta para firmar el token

	//Registro
	@SuppressWarnings("deprecation")
	public String registro(Usuario usuario) {
		if(userRepositorio.findByEmail(usuario.getEmail()) != null) {
			return null;
		}
		
		try {
			// Creación del token
			usuario.setToken(Jwts.builder().setSubject(usuario.getEmail())
					.signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact());
			
			// Cifrado de la password
			if(!usuario.getContrasena().isBlank()) {
				usuario.setContrasena(BCrypt.hashpw(usuario.getContrasena(),BCrypt.gensalt()));
			}
			
		}catch(Exception e) {
			e.printStackTrace();
		}

		System.out.println("usuario creado "+usuario.toString());

		userRepositorio.save(usuario);
		
		return usuario.getToken();
	}

	//Login
	@SuppressWarnings("deprecation")
	public String login(String email, String contrasena) {
		Usuario usuario = userRepositorio.findByEmail(email);
		if(usuario != null) {
			if(BCrypt.checkpw(contrasena,usuario.getContrasena())) {
				usuario.setToken(Jwts.builder().setSubject(usuario.getEmail())
						.signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact());
				userRepositorio.save(usuario);
				
			}else {
				return null;
			}
			
		}else {
			return null;
		}
		
		return usuario.getToken();
	}

	public Boolean esAnfitrion(String token) {
		return userRepositorio.findByToken(token).getEsAnfitrion();
	}

	public ResponseEntity<Boolean> cambiarClave(String token, String claveAntigua, String claveNueva1, String claveNueva2) {
		Usuario usuario = userRepositorio.findByToken(token);
		if(claveNueva1.equals(claveNueva2)) {
			if(BCrypt.checkpw(claveAntigua, usuario.getContrasena())) {
				usuario.setContrasena(BCrypt.hashpw(claveNueva1, BCrypt.gensalt()));
				userRepositorio.save(usuario);
				return ResponseEntity.ok().body(true);

			}else {
				return ResponseEntity.badRequest().body(false);
			}
		}else {
			return ResponseEntity.badRequest().body(false);
		}
	}
	
}
