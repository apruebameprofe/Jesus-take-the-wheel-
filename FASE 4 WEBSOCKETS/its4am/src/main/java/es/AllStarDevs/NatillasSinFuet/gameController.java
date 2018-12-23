package es.AllStarDevs.NatillasSinFuet;

import java.util.Collection;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;


public class gameController {

	int posicionesSalidaX[] = {0,300,70};
	Map<Long, Racer> racers = new ConcurrentHashMap<>();
	int randomuniversal = 0; 

	AtomicLong nextId = new AtomicLong(0);
	Random random = new Random(); 
	int rnd = random.nextInt(3 - 1 + 1) +1;
	int players = 0 ; 
	

	
	
	public Collection<Racer> getRacers() {
		return racers.values();
	}
	
	public Racer newRacer() {
		Racer racer = new Racer();
		long id = nextId.incrementAndGet();
		racer.setID(id);
		if(id == 1) {
			randomuniversal = rnd; 
			}
		racer.setOurrandom(randomuniversal);
		players++;
		racer.setNumplay(players);
		racers.put(racer.getID(), racer);
		return racer;
	}
	
	public Racer puppetRacer() {
		Racer racer = new Racer();
		racer.setOurrandom(randomuniversal);
		return racer;
	}
	

	public void deleteRacer(long id) {
		Racer saved = racers.get(id);
		if (saved != null) {
			racers.remove(saved.getID());
		}
	}
	

	
	/*
	public ResponseEntity<Racer> getRacer(@PathVariable long id) {
		Racer player = racers.get(id);
		if (player != null) {
			return new ResponseEntity<>(player, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	


	
	// Con este PUT actualizamos la informaciÃ³n del jugador con ID = id
	@PutMapping(value = "/game/{id}")
	public ResponseEntity<Racer> updateRacer(@PathVariable long id, @RequestBody Racer player) {
		Racer savedPlayer = racers.get(player.getID());
		if (savedPlayer != null) {
			racers.put(id, player);
			return new ResponseEntity<>(player, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	
	*/
	
	
}