package es.AllStarDevs.JTTWfase3;

public class Racer{
	
	private long ID;
	private double posX;
	private double posY;
	private boolean dead = false;
	private boolean winner = false;
	private double angulo = 0;
	private int kart;
	private int Animation;
	private int ourrandom;
	private int ready = 0;
	private int letstart = 0; 
	
	public Racer() {}
	
	
	
	public int getLetstart() {
		return letstart;
	}
	public void setLetstart(int letstart) {
		this.letstart = letstart;
	}
	public int getReady() {
		return ready;
	}
	public void setReady(int ready) {
		this.ready = ready;
	}
	public int getOurrandom() {
		return ourrandom;
	}
	public void setOurrandom(int ourrandom) {
		this.ourrandom = ourrandom;
	}
	public long getID() {
		return ID;
	}
	public void setID(long iD) {
		ID = iD;
	}
	public double getPosX() {
		return posX;
	}
	public void setPosX(double posX) {
		this.posX = posX;
	}
	public double getPosY() {
		return posY;
	}
	public void setPosY(double posY) {
		this.posY = posY;
	}
	public boolean isDead() {
		return dead;
	}
	public void setDead(boolean dead) {
		this.dead = dead;
	}
	public boolean isWinner() {
		return winner;
	}
	public void setWinner(boolean winner) {
		this.winner = winner;
	}
	public double getAngulo() {
		return angulo;
	}
	public void setAngulo(double angulo) {
		this.angulo = angulo;
	}
	public int getKart() {
		return kart;
	}
	public void setKart(int kart) {
		this.kart = kart;
	}
	public int getAnimation() {
		return Animation;
	}
	public void setAnimation(int animation) {
		Animation = animation;
	}
	
	
}