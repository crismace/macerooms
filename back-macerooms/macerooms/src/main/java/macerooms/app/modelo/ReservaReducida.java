package macerooms.app.modelo;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "reserva")
public class ReservaReducida {
	/**
	 * Esta entidad la he creado para cargar el datepicker con las fechas que ya
	 * estan reservadas
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="alojamiento_id")
	private Long alojamientoId;
	@JsonFormat(pattern = "dd/MM/yyyy")
	private Date desde;
	@JsonFormat(pattern = "dd/MM/yyyy")
	private Date hasta;
	private String estado;

	

	public ReservaReducida() {

	}

	@Override
	public String toString() {
		return "ReservaReducida [id=" + id + ", alojamiento_id=" + alojamientoId + ", desde=" + desde + ", hasta="
				+ hasta + ", estado=" + estado + "]";
	}


	public Long getAlojamientoId() {
		return alojamientoId;
	}

	public void setAlojamientoId(Long alojamientoId) {
		this.alojamientoId = alojamientoId;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

}