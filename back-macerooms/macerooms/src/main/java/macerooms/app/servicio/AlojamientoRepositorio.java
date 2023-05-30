package macerooms.app.servicio;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import macerooms.app.modelo.Alojamiento;
@Repository
public interface AlojamientoRepositorio extends CrudRepository<Alojamiento, Long> {
	@Query("SELECT a FROM Alojamiento a WHERE a.anfitrion.token = :token")
	public Iterable<Alojamiento> findAllByAnfitrion(@Param("token") String token);

	public Iterable<Alojamiento> findByProvincia(String provincia);
}