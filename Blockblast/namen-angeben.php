<? $time = time() ?>
<?php
    $difficultyToSafe = $_POST["difficulty"];
    $pointsToSafe = $_POST["points"];
?>
<!DOCTYPE html>
<html lang="de">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Blockblast</title>
        <link rel="stylesheet" href="css/stylesName.css?v=<? echo $time; ?>">
        <link rel="icon" href="../gfx/iconBlockblast.jpg?v=<?php echo $time; ?>" />
    </head>
    <body>
        <div id="content">
            <form method="post" action="insert.php">
                <input type="hidden" name="difficulty" value="<?php echo $difficultyToSafe ?>"></input>
                <input type="hidden" name="points" value="<?php echo $pointsToSafe ?>"></input>
                Name: <input type="text" name="username"></input>
                <input type="submit" value="Senden"></input>
            </form>
        </div>
    </body>
</html>