package macerooms.app.modelo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.validation.constraints.Size;

@Entity
public class Alojamiento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titulo;
    // Este campo es Lob ya que las imagenes pueden ocupar muchos caracteres
    @Lob
    @Column(columnDefinition="LONGTEXT", length=2000000)
    private String imagenBase64;
    // Constructor vacío (requerido por JPA)
    public Alojamiento() {
    }
	public Alojamiento(@Size(max = 100) String titulo, String imagenBase64) {
		super();
		this.titulo = titulo;
		this.imagenBase64 = imagenBase64;
	}
	@Override
	public String toString() {
		return "Alojamiento [id=" + id + ", titulo=" + titulo + ", imagenBase64=" + imagenBase64 + "]";
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
	public String getImagenBase64() {
		return imagenBase64;
	}
	public void setImagenBase64(String imagenBase64) {
		this.imagenBase64 = imagenBase64;
	}
}