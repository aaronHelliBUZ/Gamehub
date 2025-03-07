<?php $time = time() ?>
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>check</title>
    <link rel="stylesheet" href="../Styles/LoginStyles.css?v=<?php echo $time; ?>" />
    <script src="../Script/LoginScript.js" defer></script>
</head>
<body>
    <nav>
        <a href="./login.php">Log-in</a>
        <a href="../html/signin.html">sign-in</a>
        <a id="home" href="./index.php">Home</a>
    </nav>
    <?php
        $servername = "localhost";
        $username = "Nicola";
        $password = "Hallo123*";
        $dbname = "db1";

        $benutzername = $_POST["benutzername"];
        $passwort = $_POST["passwort"];
        $id;

        // Create connection
        $conn = mysqli_connect($servername, $username, $password, $dbname);
        // Check connection
        if (!$conn) {
            die("Connection failed: " . mysqli_connect_error());
        }
        $maxQuery = mysqli_query($conn, 'SELECT MAX(ID) AS max_id FROM user');
        $maxResult =  mysqli_fetch_assoc($maxQuery);
        $maxID = (int) $maxResult['max_id'];

        $minQuery = mysqli_query($conn, 'SELECT MIN(ID) AS max_id FROM user');
        $minResult =  mysqli_fetch_assoc($minQuery);
        $minID = (int) $minResult['max_id'];

        $found = 0;
        $un = $_POST["benutzername"];
        $pwd = $_POST["passwort"];

        for($i = $minID;$i <= $maxID;$i++){
            $unQuery = mysqli_query($conn, "SELECT benutzername AS un FROM user WHERE ID = '$i'");
            $unResult = mysqli_fetch_assoc($unQuery);
            $unString = (string)$unResult['un'];

            if($unString == $un){
                $pwdQuery = mysqli_query($conn, "SELECT passwort AS pwd FROM user WHERE ID = '$i'");
                $pwdResult = mysqli_fetch_assoc($pwdQuery);
                $pwdString = (string)$pwdResult['pwd'];

                if($pwdString == $pwd){
                    $id = $i;
                    echo ("hallo");
                    $found = 1;
                    break;
                }
            }
        }
        if ($found == 0){
            echo("Falsches Passwort oder Benutzername");
        }
        else {
            $query = "INSERT INTO login (UserID)
            VALUES ('$id')";
            header("Location: ./Minesweeper.php");
        }
        
    ?>
</body>
</html>