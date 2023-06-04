package macerooms.app.servicio;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import macerooms.app.modelo.ReservaReducida;
import macerooms.app.utils.Constantes;

@Repository
public interface ReservaReducidaRepositorio extends CrudRepository<ReservaReducida, Long> {
	public static final String CREADA = Constantes.CREADA;
	public static final String VALIDADA = Constantes.VALIDADA;
	
	@Query("SELECT r FROM ReservaReducida r WHERE r.alojamientoId = :id and (r.estado="+CREADA+" or r.estado="+VALIDADA+")")
	public Iterable<ReservaReducida> alojamientoId(@Param("id") Long id);

}