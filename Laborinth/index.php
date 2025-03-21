<? $time = time() ?>
<?php
    if($_POST == NULL){
?>

<!DOCTYPE html>
<html lang="de">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Laborinth</title>
        <link rel="stylesheet" href="css/stylesIndex.css?v=<? echo $time; ?>">
        <link rel="icon" href="../gfx/iconLaborinth.jpg?v=<? echo $time; ?>">
     </head>
    <body>
        <div id="content">
            <form action="index.php" method="post">
                Höhe
                <input type="number" min="6" max="25" name="x"></input><br>
                Breite
                <input type="number" min="6" max="25" name="y"></input><br>
                <input type="submit"></input>
            </form>
            <a id="bl" href="insert.php">Bestenliste</a>
        </div>
    </body>
</html>
<?php
    }else{
        $x = $_POST["x"];
        $y = $_POST["y"];
        header("Location: game.php?X=" . $x . "Y=$y");
    }
?>