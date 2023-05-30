package macerooms.app.modelo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Size;

@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Size(max =  100)
    private String nombre;
    private String contrasena;
    @Size(max =  200)
    private String apellidos;
    @Column(unique=true)
    private String email;
    @Column(name = "token")
    private String token;
    @Column(columnDefinition = "boolean default false")
    private Boolean esAnfitrion;
    
    public Usuario() {
    }
    
    public Usuario(String nombre, String contrasena, String apellidos, String email) {
        this.nombre = nombre;
        this.contrasena = contrasena;
        this.apellidos = apellidos;
        this.email = email;
    }
    
    public Usuario(String nombre, String contrasena, String apellidos, String email,String token,Boolean esAnfitrion) {
        this.nombre = nombre;
        this.contrasena = contrasena;
        this.apellidos = apellidos;
        this.email = email;
        this.token = token;
        this.esAnfitrion = esAnfitrion;
    }
    


	@Override
	public String toString() {
		return "Usuario [id=" + id + ", nombre=" + nombre + ", contrasena=" + contrasena + ", apellidos=" + apellidos
				+ ", email=" + email + ", token=" + token + ", esAnfitrion=" + esAnfitrion + "]";
	}

	// Getters y setters
    public Long getId() { 
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getNombre() {
        return nombre;
    }
    
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    public String getContrasena() {
        return contrasena;
    }
    
    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }
    
    public String getApellidos() {
        return apellidos;
    }
    
    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public Boolean getEsAnfitrion() {
		return esAnfitrion;
	}

	public void setEsAnfitrion(Boolean esAnfitrion) {
		this.esAnfitrion = esAnfitrion;
	}
    
}