package macerooms.app.servicio;

import org.springframework.data.repository.CrudRepository;

import macerooms.app.modelo.Usuario;

public interface UsuarioRepositorio extends CrudRepository<Usuario, Long> {
	Usuario findByEmail(String email);
}