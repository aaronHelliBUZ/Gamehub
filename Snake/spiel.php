<? $time = time() ?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link rel="stylesheet" href="./styles/stylesSpiel.css?v=<? echo $time; ?>">
        <script src="scripts/script.js?v=<? echo $time; ?>" defer></script>
        <?
            echo("
                <script>
                    window.addEventListener('load', function () {
                        script($aepfel);
                    });
                </script>
            ")
        ?>
    </head>

    <body>
        <div id="Spielfeld">
            <?php
                for($i = 0; $i < 15; $i++){
                    for($j = 0; $j < 20; $j++){
                        echo "<div id='$i" . "_$j'></div>";
                    }
                }
            ?>
        </div>
    </body>
</html>