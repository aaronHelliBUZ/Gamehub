<? $time = time() ?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Minesweeper</title>
        <link rel="stylesheet" href="./styles/stylesFeld.css?v=<?php echo $time; ?>">
        <link rel="stylesheet" href="./styles/stylesResponsive.css?v=<?php echo $time; ?>">
        <script src="scripts/script.js?v=<?php echo $time; ?>" defer></script>
        <link rel="icon" href="./img/icon.jpg" />
        <?php
            echo("
                <script>
                    window.addEventListener('load', function () {
                        script($hoehe - 1, $breite - 1, $anzahlBomben);
                    });
                </script>
            ")
        ?>
    </head>
    <body id="body">
        <div id = content>
            <div id="title">
                <div id="anzahlFlaggen" data-test=1></div>
                <div id="Timer"></div>
            </div>
            
            <div id="Spielfeld">
            <?
                for($i = 0; $i < $hoehe; $i++){
                    for($j = 0; $j < $breite; $j++){
                        echo "<div id='{$i}_{$j}div' class='close'><img src='img/Download__1_-removebg-preview.png' id='{$i}_{$j}' class='default'></div>";
                    }
                }
            ?>
            </div>
            <div id="back"><a id="home"href="../php.html">Zurück zur Startseite</a></div>
        </div>
    </body>
</html>