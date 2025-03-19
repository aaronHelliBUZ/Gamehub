<?php
    $time = time();
    $Name = $_POST["Name"];
    $Rekord = $_POST["Rekord"];
    $Punkte = $_POST["Punkte"];
    $position = strpos($Punkte, "/");
    $spielfeld = (int) (substr($Punkte, 0, $position));

    $Minuten = ((int) ($Rekord / 60));
    $Sekunden = round(($Rekord - $Minuten * 60), 2);
    if($Minuten < 10){
        if($Sekunden < 10){
            $Zeit = "00:0$Minuten:0$Sekunden";
        }else{
            $Zeit = "00:0$Minuten:$Sekunden";
        }
    }else{
        if($Sekunden < 10){
            $Zeit = "00:$Minuten:0$Sekunden";
        }else{
            $Zeit = "00:$Minuten:$Sekunden";
        }
    }

    $conn = mysqli_connect("localhost", "Nicola", "Hallo123*", "bestenliste");
    
    if(!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    if($spielfeld > 999){
        $sql = "
        INSERT INTO rekorde (Name, Punkte, Zeit)
        VALUES ('$Name', '$Punkte', '$Zeit');
        ";
    }elseif($spielfeld > 99){
        $sql = "
        INSERT INTO rekorde (Name, Punkte, Zeit)
        VALUES ('$Name', '0$Punkte', '$Zeit');
        ";
    }else{
        $sql = "
        INSERT INTO rekorde (Name, Punkte, Zeit)
        VALUES ('$Name', '00$Punkte', '$Zeit');
        ";
    }

    mysqli_query($conn, $sql);
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bestenliste</title>
        <link rel="stylesheet" href="./styles/stylesBestenliste.css?v=<? echo $time; ?>">
        <link rel="icon" href="./img/icon.jpg" />
    </head>

    <body>
        <h1>Deine Rekorde</h1>
        <?php
            $sql = "
            SELECT Name, Punkte, Zeit FROM Rekorde
            WHERE Name = '$Name'
            ORDER BY Punkte DESC, Zeit ASC
            LIMIT 3;
            ";
            $resultat = mysqli_query($conn, $sql);
            $i = 1;

            echo "<table>";
            echo "<thead><td>Platzierung</td><td>Name</td><td>Spielfeldgrösse/Bomben</td><td>Zeit</td></thead><tbody>";
            while($row = mysqli_fetch_assoc($resultat)){
                echo "<tr>";
                echo "<td>$i</td><td>" . $row["Name"] . "</td><td>" . $row["Punkte"] . "</td><td>" . $row["Zeit"] . "</td>";
                $i++;
                echo "</tr>";
            }
            echo "</tbody></table>";
        ?>
        <h1>Allzeit Rekorde</h1>
        <?php
            $sql = "
            SELECT Name, Punkte, Zeit FROM Rekorde
            ORDER BY Punkte DESC, Zeit ASC
            LIMIT 3;
            ";
            $resultat = mysqli_query($conn, $sql);
            $i = 1;

            echo "<table>";
            echo "<thead><td>Platzierung</td><td>Name</td><td>Spielfeldgrösse/Bomben</td><td>Zeit</td></thead><tbody>";
            while($row = mysqli_fetch_assoc($resultat)){
                echo "<tr>";
                echo "<td>$i</td><td>" . $row["Name"] . "</td><td>" . $row["Punkte"] . "</td><td>" . $row["Zeit"] . "</td>";
                $i++;
                echo "</tr>";
            }
            echo "</tbody></table>";
        ?>
        <a href="index.php">Startseite</a>
        <a href="kompletteListe.php">Komplette Liste</a>
    </body>
</html>