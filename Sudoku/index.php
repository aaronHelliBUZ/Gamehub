<? $time = time() ?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="styles/styles.css?v=<? echo $time; ?>">
        <title>Document</title>
    </head>

    <body>
        <form method="POST">
            <div id="spielfeld">
                <?
                    $feld = array(
                        array(0, 7, 0, 0, 0, 0, 9, 0, 6),
                        array(9, 0, 0, 0, 7, 0, 0, 0, 0),
                        array(1, 0, 0, 0, 6, 0, 4, 0, 0),
                        array(6, 0, 0, 2, 0, 0, 5, 1, 0),
                        array(0, 0, 9, 0, 0, 4, 3, 0, 6),
                        array(8, 0, 0, 0, 0, 5, 0, 9, 0),
                        array(0, 5, 8, 0, 0, 0, 7, 0, 0),
                        array(0, 0, 3, 0, 2, 0, 0, 0, 1),
                        array(0, 0, 9, 0, 0, 0, 3, 0, 0)
                    );
                    for($i = 0; $i < 9; $i++){
                        echo "<div id='feld_$i' class='innereFelder'>";
                        for($j = 0; $j < 9; $j++){
                            if($feld[$i][$j] == 0){
                                echo "<input class='zahlen' type='number' name='feld$i" . "_" . "$j'>";
                            }else{
                                $zahl = $feld[$i][$j];
                                echo "<div class='zahlen'>$zahl</div>";
                            }
                        }
                        echo "</div>";
                    }
                ?>
            </div>
        </form>
    </body>
</html>