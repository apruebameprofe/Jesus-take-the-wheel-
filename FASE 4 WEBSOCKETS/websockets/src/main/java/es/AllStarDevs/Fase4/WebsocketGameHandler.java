package es.AllStarDevs.Fase4;

import java.util.Collections;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import es.AllStarDevs.Fase4.Racer;
import es.AllStarDevs.Fase4.gameController;


public class WebsocketGameHandler extends TextWebSocketHandler {
	private Map<String, Racer> players = new ConcurrentHashMap<>();
	

	private static Set<WebSocketSession> sessions = Collections.synchronizedSet(new HashSet<WebSocketSession>());
	ObjectMapper mapper = new ObjectMapper();
	boolean debug = true;
	gameController gameController = new gameController();
	JsonNode globalPlayer1 = mapper.createObjectNode();
	JsonNode globalPlayer2 = mapper.createObjectNode();
	private int auxJugadores = 0;

	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		sessions.add(session);
	
	}
	//al desconectarse el jugadores la variable auxiliar que comprueba el tamaño decrece
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		sessions.remove(session);
		auxJugadores--;
	
	
	
	}
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

		synchronized (sessions) {
			JsonNode node = mapper.readTree(message.getPayload());
			ObjectNode json = mapper.createObjectNode();
			//si tenemos menos de dos jugadores empieza la partida y si tenemos más 
			//enviamos un mensaje de que el server esta lleno
			//la comprobación se hace comparando un valor que se va actualizando en 
			//función de los jugadores que intentan conectarse
			//concetados
			switch (node.get("type").asText()) {
				case "JOIN":
					if (auxJugadores <2 ) {
						Racer player = gameController.newRacer();
							if(player.getID()%2==0) {
								player.setID(2);
							}
							else {
								player.setID(1);
							}
						ObjectNode jsonPlayer = mapper.createObjectNode();
						jsonPlayer.put("ID", player.getID());
						jsonPlayer.put("posX", player.getPosX());
						jsonPlayer.put("posY", player.getPosY());
						jsonPlayer.put("Kart", player.getKart());
						jsonPlayer.put("Animation", player.getAnimation());
						jsonPlayer.put("ourrandom", player.getOurrandom());
						jsonPlayer.put("angulo", player.getAngulo());
						jsonPlayer.put("dead", player.isDead());
						jsonPlayer.put("winner", player.isWinner());
						jsonPlayer.put("numplay", player.getNumplay());
						jsonPlayer.put("auxJugadores", auxJugadores);
						json.put("type", "PLAYER_CREATED");
						json.putPOJO("player", jsonPlayer);
						auxJugadores++;

					} else {
						//server lleno
						json.put("type", "GAME_COMPLETE");
						json.put("auxJugadores", auxJugadores);
						auxJugadores = 2; 
					}
						session.sendMessage(new TextMessage(json.toString()));

					if (debug)
						System.out.println("[DEBUG] " + json.toString());
				break;

				case  "UPDATE" :
					for (WebSocketSession session1 : sessions){
						session1.sendMessage(message);
					}
			break; 

		default:
			break;
		}
	}
}

}