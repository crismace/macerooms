package macerooms.app.modelo;

import java.math.BigDecimal;
import jakarta.annotation.Nonnull;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import macerooms.app.utils.Constantes;

@Entity
public class Alojamiento {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "usuario_id")
	private Usuario anfitrion;

	@Nonnull
	private String titulo;
	private String descripcion;
	private String normas;

	private String latitud;
	private String longitud;

	@Nonnull
	private int numMaxAdultos;
	@Nonnull
	private int numMaxNinhos;
	@Nonnull
	private int numeroBanhos;
	@Nonnull
	private int numeroCamas;
	private int numeroHabitaciones;
	@Nonnull
	private String provincia;
	// Usamos la clase java BigDecimal para dineroç
	@Nonnull
	private BigDecimal precio;
	@Nonnull
	private BigDecimal gastosLimpieza;
	@Nonnull
	private BigDecimal comision;
	// El impuesto por defecto es IVA de 21 por ciento en el momento de crear este
	// proyecto
	private final BigDecimal IVA = Constantes.IVA;
	// Este campo es Lob ya que las imagenes pueden ocupar muchos caracteres

	private String imagenPortada;

	private String imagen1;

	private String imagen2;

	private String imagen3;

	public Alojamiento() {
	}

	@Override
	public String toString() {
		return "Alojamiento [id=" + id + ", anfitrion=" + anfitrion + ", titulo=" + titulo + ", descripcion="
				+ descripcion + ", normas=" + normas + ", latitud=" + latitud + ", longitud=" + longitud
				+ ", numMaxAdultos=" + numMaxAdultos + ", numMaxNinhos=" + numMaxNinhos + ", numeroBanhos="
				+ numeroBanhos + ", numeroCamas=" + numeroCamas + ", numeroHabitaciones=" + numeroHabitaciones
				+ ", provincia=" + provincia + ", precio=" + precio + ", gastosLimpieza=" + gastosLimpieza
				+ ", comision=" + comision + ", IVA=" + IVA + ", imagenPortada=" + imagenPortada + ", imagen1="
				+ imagen1 + ", imagen2=" + imagen2 + ", imagen3=" + imagen3 + "]";
	}

	public Alojamiento(String titulo, String descripcion, String normas, String latitud, String longitud,
			int numMaxAdultos, int numMaxNinhos, int numeroBanhos, int numeroCamas, int numeroHabitaciones,
			String provincia, BigDecimal precio, BigDecimal gastosLimpieza, BigDecimal comision) {
		this.titulo = titulo;
		this.descripcion = descripcion;
		this.normas = normas;
		this.latitud = latitud;
		this.longitud = longitud;
		this.numMaxAdultos = numMaxAdultos;
		this.numMaxNinhos = numMaxNinhos;
		this.numeroBanhos = numeroBanhos;
		this.numeroCamas = numeroCamas;
		this.numeroHabitaciones = numeroHabitaciones;
		this.provincia = provincia;
		this.precio = precio;
		this.gastosLimpieza = gastosLimpieza;
		this.comision = comision;
	}

	public int getNumMaxAdultos() {
		return numMaxAdultos;
	}

	public void setNumMaxAdultos(int numMaxAdultos) {
		this.numMaxAdultos = numMaxAdultos;
	}

	public int getNumMaxNinhos() {
		return numMaxNinhos;
	}

	public void setNumMaxNinhos(int numMaxNinhos) {
		this.numMaxNinhos = numMaxNinhos;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Usuario getAnfitrion() {
		return anfitrion;
	}

	public void setAnfitrion(Usuario anfitrion) {
		this.anfitrion = anfitrion;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getNormas() {
		return normas;
	}

	public void setNormas(String normas) {
		this.normas = normas;
	}

	public String getLatitud() {
		return latitud;
	}

	public void setLatitud(String latitud) {
		this.latitud = latitud;
	}

	public String getLongitud() {
		return longitud;
	}

	public void setLongitud(String longitud) {
		this.longitud = longitud;
	}

	public int getNumeroBanhos() {
		return numeroBanhos;
	}

	public void setNumeroBanhos(int numeroBanhos) {
		this.numeroBanhos = numeroBanhos;
	}

	public int getNumeroCamas() {
		return numeroCamas;
	}

	public void setNumeroCamas(int numeroCamas) {
		this.numeroCamas = numeroCamas;
	}

	public int getNumeroHabitaciones() {
		return numeroHabitaciones;
	}

	public void setNumeroHabitaciones(int numeroHabitaciones) {
		this.numeroHabitaciones = numeroHabitaciones;
	}

	public String getProvincia() {
		return provincia;
	}

	public void setProvincia(String provincia) {
		this.provincia = provincia;
	}

	public String getImagenPortada() {
		return imagenPortada;
	}

	public void setImagenPortada(String imagenPortada) {
		this.imagenPortada = imagenPortada;
	}

	public BigDecimal getPrecio() {
		return precio;
	}

	public void setPrecio(BigDecimal precio) {
		this.precio = precio;
	}

	public BigDecimal getGastosLimpieza() {
		return gastosLimpieza;
	}

	public void setGastosLimpieza(BigDecimal gastosLimpieza) {
		this.gastosLimpieza = gastosLimpieza;
	}

	public BigDecimal getComision() {
		return comision;
	}

	public void setComision(BigDecimal comision) {
		this.comision = comision;
	}

	public BigDecimal getIVA() {
		return IVA;
	}

	public String getImagen1() {
		return imagen1;
	}

	public void setImagen1(String imagen1) {
		this.imagen1 = imagen1;
	}

	public String getImagen2() {
		return imagen2;
	}

	public void setImagen2(String imagen2) {
		this.imagen2 = imagen2;
	}

	public String getImagen3() {
		return imagen3;
	}

	public void setImagen3(String imagen3) {
		this.imagen3 = imagen3;
	}

}