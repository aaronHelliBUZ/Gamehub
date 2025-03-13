<?php
    $difficultyToSafe = $_POST["difficulty"];
    $timeToSafe = $_POST["time"];
?>
<!DOCTYPE html>
<html lang="de">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Namen-Angeben</title>
        <link rel="stylesheet" href="css/stylesIndex.css">
    </head>
    <body>
        <div id="content">
            <form method="post" action="insert.php">
                <input type="hidden" name="difficulty" value="<?php echo $difficultyToSafe ?>"></input>
                <input type="hidden" name="time" value="<?php echo $timeToSafe ?>"></input>
                <input type="text" name="username"></input><br>
                <input type="submit" value="Usernamen bestätigen"></input>
            </form>
        </div>
    </body>
</html>