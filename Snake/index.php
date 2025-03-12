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
        <title>Document</title>
    </head>

    <body>
        <form method="POST" action="index.php">
            Anzahl Äpfel: <input type="number" name="aepfel">
            <input type="hidden" name="submitted" value=1>
            <input type="submit">
        </form>
        <?
            if($fehler == true){
                echo "<p style='color: red;'>Maximal 10 Äpfel<p>";
            }
        ?>
    </body>
</html>