<?php
    $conn = mysqli_connect("localhost", "aaron", "FCSG1879", "bestenliste");
    $time = time();
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Komplette Liste</title>
        <link rel="stylesheet" href="./styles/stylesBestenliste.css?v=<? echo $time; ?>">
    </head>

    <body>
        <h1>Komplette Liste der Einträge</h1>
        <?php
            $sql = "
            SELECT Name, Punkte, Zeit FROM Rekorde
            ORDER BY Punkte DESC, Zeit ASC;
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
    </body>
</html>