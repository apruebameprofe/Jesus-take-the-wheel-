package es.AllStarDevs.NatillasConFuet;

import java.util.Collection;
import java.util.Map;
import java.util.Random;
import java.util.Stack;
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
public class OBJSController {

	Map<Long, OBJS> objse = new ConcurrentHashMap<>();
	Stack <OBJS> objsStack = new Stack();
	AtomicLong nextIdOBJS = new AtomicLong(0);
	
		@PostMapping(value = "127.0.0.1:8080/objetos")
		@ResponseStatus(HttpStatus.CREATED)
		public OBJS newOBJS() {
			OBJS aux = new OBJS();
			long auxid = nextIdOBJS.incrementAndGet();
			aux.setOBJSid(auxid);
			objse.put(aux.getOBJSid(), aux);
			return aux;
		}
		
	
		@PutMapping(value = "127.0.0.1:8080/objetos/{id}")
		public ResponseEntity<OBJS> updateOBJS(@PathVariable long OBJSid, @RequestBody OBJS objs) {
			OBJS savedOBJS = objse.get(objs.getOBJSid());
			if (savedOBJS != null) {
				objse.put(OBJSid, objs);
				objsStack.push(objs);
				return new ResponseEntity<>(objs, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}
	
		@GetMapping(value = "127.0.0.1:8080/objetos")
		public Stack<OBJS> getAllOBJS() {
			return objsStack;
		}
	
}