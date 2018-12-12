package es.AllStarDevs.NatillasConFuet;

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

import es.AllStarDevs.NatillasConFuet.gameController;


public class WebsocketGameHandler extends TextWebSocketHandler {
	


private static Set<WebSocketSession> sessions = Collections.synchronizedSet(new HashSet<WebSocketSession>());
ObjectMapper mapper = new ObjectMapper();
boolean debug = true;
gameController gameController = new gameController();


JsonNode globalPlayer1 = mapper.createObjectNode();
JsonNode globalPlayer2 = mapper.createObjectNode();

public void afterConnectionEstablished(WebSocketSession session) throws Exception {
	sessions.add(session);
}

public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
	sessions.remove(session);
}

protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

	synchronized (sessions) {
		JsonNode node = mapper.readTree(message.getPayload());
		ObjectNode json = mapper.createObjectNode();

		switch (node.get("type").asText()) {
		case "JOIN":
			if (gameController.getRacers().size() < 2) {
				Racer player = gameController.newRacer();

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

				json.put("type", "PLAYER_CREATED");
				json.putPOJO("player", jsonPlayer);
				// PLAIN OLD JAVA OBJECT 
				
				
				//json.putPOJO("player", player);
			} else {
				json.put("type", "GAME_CPMPLETE");
			}
			session.sendMessage(new TextMessage(json.toString()));

			if (debug)
				System.out.println("[DEBUG] " + json.toString());
			break;

		case  "UPDATE" :
			session.sendMessage(message);
			break; 
	
			
		default:
			break;
		}
	}
}

}