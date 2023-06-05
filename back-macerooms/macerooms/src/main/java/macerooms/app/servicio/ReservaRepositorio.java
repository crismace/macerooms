package macerooms.app.servicio;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;
import macerooms.app.modelo.Reserva;
import macerooms.app.utils.Constantes;

@Repository
public interface ReservaRepositorio extends CrudRepository<Reserva, Long> {
	public static final String CREADA = Constantes.CREADA;
	
	@Query("SELECT r FROM Reserva r WHERE r.estado= :estado")
	Iterable<Reserva> findByEstado(@Param("estado")String estado);
	
	@Query("SELECT r FROM Reserva r WHERE r.alojamiento.anfitrion.token = :token")
	Iterable<Reserva> findByAlojamientoAnfitrionToken(@Param("token") String token);

	@Query("SELECT r FROM Reserva r WHERE r.cliente.token = :token")
	Iterable<Reserva> findByClienteToken(@Param("token") String token);
	
	@Transactional
	@Query("DELETE r FROM Reserva r WHERE r.alojamiento.id = :id")
	void deleteReservaByAlojamientoId(@Param("id")Long id);
}