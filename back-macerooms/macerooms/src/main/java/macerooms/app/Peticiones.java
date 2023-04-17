package macerooms.app;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class Peticiones {

	@GetMapping ("/hello")
	
	public String prueba() {
		return "Juan";
	}
	
}
