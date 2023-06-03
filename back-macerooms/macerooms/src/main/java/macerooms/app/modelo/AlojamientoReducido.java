package macerooms.app.modelo;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "alojamiento")
public class AlojamientoReducido {
	// Se crea esta entidad para no pasar mas datos de los necesarios al front
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Nonnull
	private String titulo;
	private String imagenPortada;
	
	public AlojamientoReducido() {
		
	}

	@Override
	public String toString() {
		return "AlojamientoReducido [id=" + id + ", titulo=" + titulo + ", imagenPortada=" + imagenPortada + "]";
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public String getImagenPortada() {
		return imagenPortada;
	}

	public void setImagenPortada(String imagenPortada) {
		this.imagenPortada = imagenPortada;
	}
	
	
}
