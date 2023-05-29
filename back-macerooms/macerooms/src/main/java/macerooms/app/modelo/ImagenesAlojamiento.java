package macerooms.app.modelo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class ImagenesAlojamiento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonIgnoreProperties("imagenes")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "alojamiento_id", nullable = false)
    private Alojamiento alojamiento;

	private String imagen;
    
    public ImagenesAlojamiento() {
    	
    }

	public ImagenesAlojamiento(Alojamiento alojamiento, String imagen) {
		this.alojamiento = alojamiento;
		this.imagen = imagen;
	}

	@Override
	public String toString() {
		return "ImagenesAlojamiento [alojamiento=" + alojamiento + ", imagen=" + imagen + "]";
	}

	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public Alojamiento getAlojamiento() {
		return alojamiento;
	}


	public void setAlojamiento(Alojamiento alojamiento) {
		this.alojamiento = alojamiento;
	}


	public String getImagen() {
		return imagen;
	}


	public void setImagen(String imagen) {
		this.imagen = imagen;
	}
    
}