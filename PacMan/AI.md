# Pac-Man

## Priorität

- **Blinky:** Geht direkt auf Pac-Man zu, wird schneller wenn noch 20 bzw. 10 Pellets übrig
sind, Scatter-Ecke: Oben-Rechts. **Schwierigkeit: 1**
- **Inky:** Nimmt den Punkt 2 Pellets vor Pac-Man, von diesem Punkt "zeichnet " er eine
Linie zu Blinky und verdoppelt diese Linie. Das ist sein Zielpunkt, Scatter-Ecke:
Unten-Rechts. **Schwierigkeit: 5**
- **Pinky:** Nimmt den Punkt 2 Pellets vor Pac-Man. Das ist sein Zielpunkt,
Scatter-Ecke: Oben-Links. **Schwierigkeit: 1**
- **Clyde:** Geht direkt auf Pac-Man zu, wenn er aber 8 Pellets oder näher ist, flüchtet er
in seine Scatter-Ecke, Scatter-Ecke: Unten-Links. **Schwierigkeit: 2**

## Allgemeines Verhalten

Sie wechseln basierend auf einem Timer vom Scatter- zum Chase-Modus. Ihr Ursprungsmodus ist
Scatter. Die ersten beiden Scatter-Phasen gehen jeweils **7 Sekunden**. Die Dritte und
Vierte Scatter-Phase gehen jeweils **5 Sekunden**. Dazwischen sind jeweils **20 Sekunden**
Chase-Modus. Nach der 4. Scatter-Phase bleiben sie für immer im Chase-Modus.
