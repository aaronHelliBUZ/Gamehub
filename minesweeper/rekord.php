<? $time = time() ?>
<?php
    $Rekord = $_POST["Rekord"];
    $Punkte = $_POST["Punkte"]
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Rekord</title>
        <link rel="stylesheet" href="./styles/stylesRekord.css?v=<? echo $time; ?>">
    </head>

    <body>
        <div>
            <form method="POST" action="bestenliste.php">
                Name: <input type="text" name="Name">
                <input type="hidden" name="Rekord" <?php echo "value='$Rekord'"?>>
                <input type="hidden" name="Punkte" <?php echo "value='$Punkte'"?>>
                <input type="submit">
            </form>
        </div>
    </body>
</html>