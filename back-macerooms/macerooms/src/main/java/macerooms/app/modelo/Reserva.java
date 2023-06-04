package macerooms.app.modelo;

import java.math.BigDecimal;
import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;
import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class Reserva {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String estado;

	private int numeroAdultos;
	private int numeroNinhos;
	private BigDecimal costeTotal;

	@JsonFormat(pattern = "dd/MM/yyyy")
	private Date desde;
	@JsonFormat(pattern = "dd/MM/yyyy")
	private Date hasta;
	@CreationTimestamp
	private Date fechaCreacion;
	private Date fechaUltimoEstado;
	
	
	@OneToOne
	@JoinColumn(name = "usuario_id")
	private Usuario cliente;
	@ManyToOne
	@JoinColumn(name = "alojamiento_id")
	private Alojamiento alojamiento;

	public Reserva() {

	}

	public Reserva(int numeroAdultos, int numeroNinhos, Date desde, Date hasta) {
		this.numeroAdultos = numeroAdultos;
		this.numeroNinhos = numeroNinhos;
		this.desde = desde;
		this.hasta = hasta;
	}

	
	
	public Reserva(String estado, int numeroAdultos, int numeroNinhos, BigDecimal costeTotal, Date desde, Date hasta,
			Date fechaCreacion, Date fechaUltimoEstado, Usuario cliente, Alojamiento alojamiento) {
		super();
		this.estado = estado;
		this.numeroAdultos = numeroAdultos;
		this.numeroNinhos = numeroNinhos;
		this.costeTotal = costeTotal;
		this.desde = desde;
		this.hasta = hasta;
		this.fechaCreacion = fechaCreacion;
		this.fechaUltimoEstado = fechaUltimoEstado;
		this.cliente = cliente;
		this.alojamiento = alojamiento;
	}

	@Override
	public String toString() {
		return "Reserva [id=" + id + ", estado=" + estado + ", numeroAdultos=" + numeroAdultos + ", numeroNinhos="
				+ numeroNinhos + ", costeTotal=" + costeTotal + ", desde=" + desde + ", hasta=" + hasta + ", cliente="
				+ cliente + ", alojamiento=" + alojamiento + "]";
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public int getNumeroAdultos() {
		return numeroAdultos;
	}

	public void setNumeroAdultos(int numeroAdultos) {
		this.numeroAdultos = numeroAdultos;
	}

	public int getNumeroNinhos() {
		return numeroNinhos;
	}

	public void setNumeroNinhos(int numeroNinhos) {
		this.numeroNinhos = numeroNinhos;
	}

	public BigDecimal getCosteTotal() {
		return costeTotal;
	}

	public void setCosteTotal(BigDecimal costeTotal) {
		this.costeTotal = costeTotal;
	}

	public Date getDesde() {
		return desde;
	}

	public void setDesde(Date desde) {
		this.desde = desde;
	}

	public Date getHasta() {
		return hasta;
	}

	public void setHasta(Date hasta) {
		this.hasta = hasta;
	}

	public Usuario getCliente() {
		return cliente;
	}

	public void setCliente(Usuario cliente) {
		this.cliente = cliente;
	}

	public Alojamiento getAlojamiento() {
		return alojamiento;
	}

	public void setAlojamiento(Alojamiento alojamiento) {
		this.alojamiento = alojamiento;
	}

	public Date getFechaCreacion() {
		return fechaCreacion;
	}

	public void setFechaCreacion(Date fechaCreacion) {
		this.fechaCreacion = fechaCreacion;
	}

	public Date getFechaUltimoEstado() {
		return fechaUltimoEstado;
	}

	public void setFechaUltimoEstado(Date fechaUltimoEstado) {
		this.fechaUltimoEstado = fechaUltimoEstado;
	}

}
