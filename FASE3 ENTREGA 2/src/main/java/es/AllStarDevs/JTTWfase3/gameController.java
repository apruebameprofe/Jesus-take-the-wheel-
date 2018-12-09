package es.AllStarDevs.JTTWfase3;

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
public class gameController {

	int posicionesSalidaX[] = { 0, 300, 70 };
	Map<Long, Racer> racers = new ConcurrentHashMap<>();
	int randomuniversal = 0;

	AtomicLong nextId = new AtomicLong(0);
	Random random = new Random();
	int rnd = random.nextInt(2 - 1 + 1) + 1;

	// Con GET recuperamos el nero de jugadores
	@GetMapping(value = "/game")
	public Collection<Racer> getRacers() {
		return racers.values();
	}

	// Con POST creamos un nuevo jugador
	@PostMapping(value = "/game")
	@ResponseStatus(HttpStatus.CREATED)
	public Racer newRacer() {
		Racer player = new Racer();
		// Amoamepeza
		long id = nextId.incrementAndGet();
		if (id == 1) {
			randomuniversal = rnd;
		}
		player.setOurrandom(randomuniversal);
		player.setID(id);
		racers.put(player.getID(), player);
		return player;
	}

	@PostMapping(value = "/game/ready")
	public ResponseEntity<Racer> isReady(@RequestBody Racer player) {
		Racer savedPlayer = racers.get(player.getID());
		if (savedPlayer != null) {
			player.setReady(1);
			System.out.println("[DEBUG] " + savedPlayer.getID() + "dice que esta " + savedPlayer.getReady());
			System.out.println("[DEBUG]El jugador : " + savedPlayer.getID() + " tiene estado ready " + savedPlayer.getReady() );
			racers.put(savedPlayer.getID(), player);
			return new ResponseEntity<>(player, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping(value = "/game/ready/{id}")
	public Racer isGameReady(@PathVariable long id) {
		System.out.println("[DEBUG] El jugador " + id + " ha llamado a isGameReady()");
		Racer racer1 = racers.get(id);
		if(racer1.getID() == 1) {
		if (racers.get((long) 2) != null) {
			Racer racer2 = racers.get((long) 2);
			System.out.println("[DEBUG DE EMERGENCIA] PLAYER " + racer2.getID() + "TIENE EN READY " + racer2.getReady());
			System.out.println("[DEBUG] Player 2 is ready?: " + racer2.getReady());
			
			if (racer1.getReady() == 1 && racer2.getReady() == 1) {
					return racer2;
			
			}
		}}
		if(racer1.getID() == 2) {
			if (racers.get((long) 1) != null) {
				Racer racer2 = racers.get((long) 1);
				System.out.println("[DEBUG DE EMERGENCIA] PLAYER " + racer2.getID() + "TIENE EN READY " + racer2.getReady());
				System.out.println("[DEBUG] Player 1 is ready?: " + racer2.getReady());
				
				if (racer1.getReady() == 1 && racer2.getReady() == 1) {
						return racer2;
				
				}
			}
		}
		System.out.println("ERROR" );
		return null;
			
	
	}

	
	@GetMapping(value = "/game/{id}")
	public ResponseEntity<Racer> getRacer(@PathVariable long id) {
		
		Racer player = racers.get(id);
		if (player != null) {
			System.out.println("check del get " + player.toString());
			return new ResponseEntity<>(player, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PutMapping(value = "/game/{id}")
	public ResponseEntity<Racer> updateRacer(@PathVariable long id, @RequestBody Racer player) {
		Racer savedPlayer = racers.get(player.getID());
		if (savedPlayer != null) {
			racers.put(id, player);
			System.out.println("check del put " + player.toString());
			return new ResponseEntity<>(player, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	

	
	

	@DeleteMapping(value = "/game")
	public void  deleteAll() {
		
		if(racers.isEmpty()) {
			nextId.set(0);
			}
		
		
	}
	
	
	

	@DeleteMapping(value = "/game/{id}")
	public ResponseEntity<Racer> deleteRacer(@PathVariable long id) {
		Racer savedPlayer = racers.get(id);
		if (savedPlayer != null) {
			racers.remove(savedPlayer.getID());
	
			return new ResponseEntity<>(savedPlayer, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}
