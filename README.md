# Jesus-take-the-wheel-

## Información del grupo

  **Miembros del grupo:**               
  
  * Carmen Gómez Moreno   
  * Leo Vazquez Solano  
  
 **Correos oficiales (respectivamente) :**
  
  * c.gomezmo.2016@alumnos.urjc.es
  * j.vazquez.2016@alumnos.urjc.es
  
  **Cuentas personales en GitHub (respectivamente) :**
  
  * @saltytriestocode
  * @codeleosaurus

## ÍNDICE

**0.Introducción**

**1.Descripción del Juego*

  * Temática
  * Objetivo del Juego
  * Género
  * Propósito y Público objetivo
  * Alcance
  * Ampliación
  
 **2.Jugabilidad**
 
  * Controles
  * Entornos
  * Modos de Partida(provisional)
  * Mecánicas
  * Personajes
  * Objetos
  * Obstáculos
  
 **3.Interfaz y Funcionalidad**
 
  * Diagrama de Flujo
  * Menú Principal
  * Menú de selección de vehículo
  * Pantalla de búsqueda de adversarios
  * Menú de confirmación de partida
  * Pantalla de partida
  * Pantalla de resultados finales
  * Chat(provisional)
  
  
  **4.Estilo Visual**
  
  * Concept Art
  


## 0.Introducción
Jesus take the Wheel (abreviado a partir de este momento como  JTTW)  es un juego inspirado en carreras populares de vehículos sin sistemas de propulsión y basado en el minijuego de Sled Racing al que se pudo jugar hasta el 30 de marzo de 2017 en el sitio web Club Penguin.


 ## 1.Descripción del juego
 
 **Temática:**

En un futuro en el que existe la posibilidad de resucitar a los muertos, la humanidad aprovecha la oportunidad para sumirse en los deportes de riesgo, siendo uno de ellos las carreras de soapbox. Pese a tener una tecnología muy avanzada estos vehículos no cuentan con motores. Las carreras se llevan a cabo en pendientes con una inclinación suficiente como para que los autos bajen a velocidades en las que un choque puede ser mortal , sobre todo si no se utiliza ninguna clase de protección.

**Objetivo del juego:**

El objetivo es obtener la mayor puntuación que dependerá de la posición en la que el jugador termine la carrera y del estado del vehículo.

**Género:**

Racing en tercera persona : Juegos que se limitan a la interacción entre vehículos para ofrecer una sensación de adrenalina al jugador.

**Propósito y Público objetivo:**

JTTW está dirigido al público casual de todas las edades y pensado para partidas cortas y esporádicas.
El objetivo de JTTW es ofrecer mecánicas sencillas y fáciles de comprender a simple vista para que sea accesible a todo el mundo mediante una experiencia rápida e impredecible para que sea difícil aburrirse.

**Alcance:** 

Este juego pretende alcanzar el nivel de desarrollo suficiente como para que los usuarios puedan tener una experiencia completa y jugable con posibilidades de contenido adicional en el futuro. 

**Ampliación:** 

El juego estará hecho de manera que añadir vehículos y pistas nuevas sea una tarea fácil y asequible , pudiendo así aumentar su calidad.

## 2.Jugabilidad:


**Controles:**

**Durante la partida:** 

* Flechas de dirección (provisional) para realizar las siguientes acciones:
	* Moverse de izquierda a derecha.
	* Acelerar.
	* Frenar.

**Fuera de la partida:**

* Cursor (provisional) para realizar las siguientes acciones:
	*Seleccionar las distintas opciones de los distintos menús


**Entornos:**

Las carreras tendrán lugar en diferentes pistas , las cuales siempre seran inclinadas y tendrán obstáculos y estructuras diferentes.
 

**Modos de Partida:**(provisional)

Se añadirán modos de partida adicionales y se describirán todos a continuación :

* Búsqueda Aleatoria : Se buscaran jugadores conectados al juegos en el momento
* Creación de Partida : Un jugador podrá dar un nombre a una partida y pasará a espera de otros jugadores 
* Búsqueda de Partida : Uno o varios jugadores podrán introducir un nombre de partida y se comprobará que esa partida existe , acto seguido si aún faltan jugadores para esa partida quedarán en espera
* Revancha : Si al final de una partida los cuatro jugadores de la partida seleccionan la opción de revancha volverán a la pantalla de confirmación de la partida , mientras esperan a que se decida la revancha quedarán en espera en la misma pantalla de resultados


**Mecánicas:**

* Desplazamiento: La mecánica principal del juego es el desplazamiento , cada vehículo podrá desplazarse solo en una franja visible de la pista junto a los demás participantes y no podrá salirse de esta en ningún momento salvo en el caso de que se salga por alguno de los laterales del circuito , caiga al vacio o pierda todos sus puntos de vida. Dentro de esta franja podrá disminuir o aumentar brevemente su velocidad para adelantar a los adversarios y girar hacia la derecha o la izquierda con el objetivo de esquivar obstáculos o embestir otros coches.

* Puntuación: La puntuación determina el ganador de la carrera y dependerá tanto de la posición en la que cada corredor cruce la meta y del estado de su vehículo (o sus puntos de vida) al llegar a esta. Tendrá más peso la posición que el estado del vehículo para ceñirnos un poco más al género del juego.

* Puntos de vida: Los puntos de vida vendrán determinados según el tipo de vehículo y se verán afectados al recibir daño ya sea mediante un impacto con un obstáculo o con otro jugador.

* Fin del Juego: El juego terminará para cada jugador individual cuando :

  * El jugador pierda todos sus puntos de vida.
  * El jugador se salga del circuito.
  * El jugador llegue a la meta.

* Fin de la Partida: Cada partida finalizará cuando todos los jugadores hayan cruzado la meta o bien no tengan más puntos de vida disponibles , tras calcular los puntos de cada uno se creará una tabla de puntuaciones de mayor a menor para determinar al ganador. 



**Personajes(vehículos)**
Los personajes en este juego son los distintos vehículos disponibles. Cada vehículo dispondrá de una pequeña descripción sobre su origen y unas estadísticas propias en la siguiente versión de este documento.
Todos los personajes estarán disponibles desde la primera partida del jugador.
* Características:
	*Cuerpo : Determina la gran mayoría de la apariencia del vehículo e influye en 	algunas estadísticas.
	*Chásis : Influye en las estadísticas y en elementos estéticos menores.
	*Ruedas : Influyen en algunas estadísticas y en elementos estéticos menores.

**Objetos**
*Aclaración:*
Los objetos aquí descritos son provisionales , en un futuro podrán añadirse más o cambiar las características de estos.
* Power-Ups : Objetos que se podrán encontrar en zonas aleatorias del circuito que permitirán al jugador que los obtenga diferentes beneficios.
	* Power-Up de aceleración: Permite avanzar más rápido durante unos segundos.
	* Power-Up de escudo: Permite protegerse de un solo impacto contra un obstáculo 	o un jugador sin perder puntos de vida.
	* Power-Up de regeneración: Permite recuperar uno o varios puntos de vida.

**Obstáculos**

*Aclaración:*
Los obstáculos aquí descritos son provisionales , en un futuro podrán añadirse más o cambiar las características de estos.

* Obstáculos estáticos: Obstáculos que no cambiarán su posición  nunca y formarán parte de un circuito o pista en particular.
	* De un solo bloque o tile: Como pueden ser cajas , pacas de heno , barriles , etc.
	* De varios bloques o tiles: Como pueden ser paredes o rampas .

* Obstáculos en movimiento: Obstáculos que formarán parte de un circuito o pista en particular pero podrán aparecer en un conjunto de zonas aleatoriamente y se desplazarán en el tiempo real de la carrera , por ejemplo : ruedas y otros objetos rodando por la carretera , personas distraidas , animales , etc.

**Habilidades:**

* Desplazarse de derecha a izquierda.
* Acelerar.
* Frenar.
* Embestir a un oponente

## 3.Interfaz:
 
**Diagrama de Flujo:**

![DiagramadeFlujo](https://user-images.githubusercontent.com/43405811/46070422-1197c800-c17e-11e8-8cd3-308402d49a78.png)

*Se han añadido nuevas pantallas y funcionalidades , visitar el punto 2.Jugabilidad*


**Menú Principal**

![MenúPrincipal](https://user-images.githubusercontent.com/43405811/45929233-d9f70900-bf4e-11e8-9015-93e1e39c80a3.png)


**Menú de selección de vehículo**

![MenúdeSeleccióndeVehículo](https://user-images.githubusercontent.com/43405811/45929231-d6fc1880-bf4e-11e8-9f28-d6762f05dbb7.png)


  **Pantalla de búsqueda de adversarios**

![Pantalladebúsquedadeadversarios](https://user-images.githubusercontent.com/43405811/45929283-c8623100-bf4f-11e8-9b36-2a4696f0b797.png)


  **Menú de confirmación de partida**
  
  ![MenúdeSeleccióndeVehículo](https://user-images.githubusercontent.com/43405811/45929424-b3869d00-bf51-11e8-86f8-91d5745b8680.png)
  
  
  **Pantalla de partida**
  
  ![MenúdeSeleccióndeVehículo](https://user-images.githubusercontent.com/43405811/45929966-17609400-bf59-11e8-9916-a2ee2778f345.png)
  
  
  **Pantalla de resultados finales**

![MenúdeSeleccióndeVehículo](https://user-images.githubusercontent.com/43405811/46071885-51ac7a00-c181-11e8-881f-78a1c6821bf0.png)


**Chat**

Se implementará un chat para ayudar a los jugadores a gestionar sus partidas , este chat no estará activo cuando un jugador se encuentra activo en una partida.


## 4.Estilo Visual:

(Provisional)
El estilo visual de JTTW seguirá las bases del Pixel Art para buscar la sencillez e intentar evocar algo de nostalgia.

**Concept Art**


![CircuitoTipo](https://user-images.githubusercontent.com/43405811/45930043-7c68b980-bf5a-11e8-82ab-712e84a13ec4.png)

![Personajes tipo](https://user-images.githubusercontent.com/43405811/45930282-868cb700-bf5e-11e8-88bf-fd1afa326b8f.png)




