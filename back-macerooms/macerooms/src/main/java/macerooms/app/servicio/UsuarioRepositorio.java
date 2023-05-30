package macerooms.app.servicio;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import macerooms.app.modelo.Usuario;
@Repository
public interface UsuarioRepositorio extends CrudRepository<Usuario, Long> {
	Usuario findByEmail(String email);

	Usuario findByToken(String token);
}