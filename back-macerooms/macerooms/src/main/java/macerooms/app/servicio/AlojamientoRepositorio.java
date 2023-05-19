package macerooms.app.servicio;

import org.springframework.data.repository.CrudRepository;

import macerooms.app.modelo.Alojamiento;

public interface AlojamientoRepositorio extends CrudRepository<Alojamiento, Long> {
}