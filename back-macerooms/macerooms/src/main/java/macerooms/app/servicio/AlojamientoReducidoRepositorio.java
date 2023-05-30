package macerooms.app.servicio;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import macerooms.app.modelo.AlojamientoReducido;

@Repository
public interface AlojamientoReducidoRepositorio extends CrudRepository<AlojamientoReducido, Long> {
}