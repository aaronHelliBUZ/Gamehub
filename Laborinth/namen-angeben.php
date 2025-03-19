<? $time = time() ?>
<?php
    $difficultyToSafe = $_POST["difficulty"];
    $timeToSafe = $_POST["time"];
?>
<!DOCTYPE html>
<html lang="de">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Laobrinth</title>
        <link rel="stylesheet" href="css/styleName.css?v=<? echo $time; ?>">
        <link rel="icon" href="../gfx/iconLaborinth.jpg">
    </head>
    <body>
        <div id="content">
            <form method="post" action="insert.php">
                <input type="hidden" name="difficulty" value="<?php echo $difficultyToSafe ?>"></input>
                <input type="hidden" name="time" value="<?php echo $timeToSafe ?>"></input>
                Name: <input type="text" name="username"></input>
                <input type="submit" value="Senden"></input>
            </form>
        </div>
    </body>
</html>