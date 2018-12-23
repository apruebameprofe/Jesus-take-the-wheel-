package es.AllStarDevs.NatillasSinFuet;

public class Racer{
	
	
	private long ID;
	private double posX;
	private double posY;
	private boolean dead = false;
	private boolean winner = false;
	private double angulo = 0;
	private int Kart;
	private int Animation;
	private int ourrandom;
	private int numplay; 
	
	
	
	Racer(){}
	
	
	public int getNumplay() {
		return numplay;
	}


	public void setNumplay(int numplay) {
		this.numplay = numplay;
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
		return Kart;
	}
	public void setKart(int kart) {
		Kart = kart;
	}
	public int getAnimation() {
		return Animation;
	}
	public void setAnimation(int animation) {
		Animation = animation;
	}
	@Override
	public String toString() {

		return "{\"ID\":" +  ID + ", \"posX\":" + posX + ",\"posY\":"  + posY + ",\"dead\":" + dead + ",\"winner\":" + winner
				+ ",\"angulo\":"+  angulo + ",\"Kart\":" + Kart + ",\"Animation\":" + Animation + ",\" ourrandom\":" + ourrandom +",\" numplay\":" + numplay
				+ "}";
	}
	
}