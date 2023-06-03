package macerooms.app.utils;

public class ValidarProvincia {
	public static boolean validarProvincia(String provincia) {
		return (provincia.equals(Constantes.A_CORUNA) || provincia.equals(Constantes.LUGO)
				|| provincia.equals(Constantes.OURENSE) || provincia.equals(Constantes.PONTEVEDRA));
	}
}
