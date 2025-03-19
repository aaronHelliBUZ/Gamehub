<?
    $submitted = $_POST["submitted"];
    $fehler = false;
    $aepfel = (int) $_POST["aepfel"];
    if($submitted == 1){
        if($aepfel <= 10){
            include('spiel.php');
            exit;
        }else{
            $fehler = true;
        }
    }
?>

<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="icon" href="./img/icon.png" />
        <link rel="stylesheet" href="./styles/stylesIndex.css?v=<? echo $time; ?>">
        <title>Snake</title>
    </head>

    <body>
        <div id="content">
            <form method="POST" action="index.php">
                <span id="AA">Anzahl Äpfel:</span> <input type="number" min="1" max="10" name="aepfel">
                <input type="hidden" name="submitted" value=1>
                <input id="submit" type="submit">
            </form>
            <?
                if($fehler == true){
                    echo "<p style='color: red;'>Maximal 10 Äpfel<p>";
                }
            ?>
        </div>
    </body>
</html>