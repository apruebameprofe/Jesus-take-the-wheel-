package es.AllStarDevs.NatillasSinFuet;

import java.util.Collection;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class kartController {

	
	Map<Long, Kart> karts = new ConcurrentHashMap<>();
	AtomicLong nextkartId = new AtomicLong(0);
	Random rnd = new Random();
	

	
	@GetMapping(value = "/kart")
	public Collection<Kart> getKarts() {
		return karts.values();
	}
	


	// Con POST creamos un nuevo kart
	@PostMapping(value = "/kart")
	@ResponseStatus(HttpStatus.CREATED)
	public Kart newKart() {
		Kart kart = new Kart();
		long aux = nextkartId.incrementAndGet();
		kart.setKartid(aux);
		karts.put(kart.getKartid(), kart);
		return kart;
	}
	
	@PutMapping(value = "/kart/{id}")
	public ResponseEntity<Kart> updateKart(@PathVariable long id, @RequestBody Kart kart) {
		Kart savedKart = karts.get(kart.getKartid());
		if (savedKart != null) {
			karts.put(id, kart);
			return new ResponseEntity<>(kart, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	
	
	@GetMapping(value = "/kart/{id}")
	public ResponseEntity<Kart> getKart(@PathVariable long kartid) {
		Kart kart = karts.get(kartid);
		if (kart != null) {
			return new ResponseEntity<>(kart, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	
	
	
}
