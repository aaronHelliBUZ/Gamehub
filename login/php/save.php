<?php $time = time() ?>
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>save</title>
    <link rel="stylesheet" href="../Styles/LoginStyles.css?v=<?php echo $time; ?>" />
    <script src="../Script/LoginScript.js" defer></script>
</head>
<body>
    <?php
        $servername = "localhost";
        $username = "Nicola";
        $password = "Hallo123*";
        $dbname = "db1";

        // Create connection
        $conn = mysqli_connect($servername, $username, $password, $dbname);
        // Check connection
        if (!$conn) {
            die("Connection failed: " . mysqli_connect_error());
        }
        $vorname = $_POST["vorname"];
        $nachname = $_POST["nachname"];
        $benutzername = $_POST["benutzername"];
        $passwort = $_POST["passwort"];
        $userExist = 0;

        $maxQuery = mysqli_query($conn, 'SELECT MAX(ID) AS max_id FROM user');
        $maxResult =  mysqli_fetch_assoc($maxQuery);
        $maxID = (int) $maxResult['max_id'];

        $minQuery = mysqli_query($conn, 'SELECT MIN(ID) AS max_id FROM user');
        $minResult =  mysqli_fetch_assoc($minQuery);
        $minID = (int) $minResult['max_id'];

        for($i = $minID;$i <= $maxID;$i++){
            $unQuery = mysqli_query($conn, "SELECT benutzername AS un FROM user WHERE ID = '$i'");
            $unResult = mysqli_fetch_assoc($unQuery);
            $unString = (string)$unResult['un'];

            if($unString == $benutzername){
                $userExist = 1;
                break;
            }
        }

        if ($userExist == 0){
            // Ziel-HTML-Dokument einlesen
            $signin = '../html/signin.html';
            $contentSignin = file_get_contents($signin);
    
            // DOMDocument-Objekt erstellen und HTML laden
            $dom = new DOMDocument();
            libxml_use_internal_errors(true);
            $dom->loadHTML($contentSignin);
            libxml_clear_errors();
    
            // Das zu entfernende `p`-Element suchen
            $form = $dom->getElementById('fill');
            if ($form) {
                $xpath = new DOMXPath($dom);
                $errorMsgList = $xpath->query("//p[@class='errormsg']");
    
                foreach ($errorMsgList as $errorMsg) {
                    $parent = $errorMsg->parentNode;
                    if ($parent) {
                        $parent->removeChild($errorMsg); // p-Element entfernen
                    }
                }
            }
    
            $modifiedSignin = $dom->saveHTML();
            file_put_contents('../html/signin.html', $modifiedSignin);
    
            header('Content-Type: text/html');
            echo $modifiedSignin;

            $query = "INSERT INTO user (Vorname, Nachname, Benutzername, Passwort)
            VALUES ('$vorname', '$nachname', '$benutzername', '$passwort')";
    
            mysqli_query($conn,$query);
            header("Location: ./login.php");
        }
        else {
            // Ziel-HTML-Dokument einlesen
            $signin = '../html/signin.html';
            $contentSignin = file_get_contents($signin);

            // DOMDocument-Objekt erstellen und HTML laden
            $dom = new DOMDocument();
            libxml_use_internal_errors(true);
            $dom->loadHTML($contentSignin);
            libxml_clear_errors();

            $form = $dom->getElementById('fill');
            if ($form) {
                $xpath = new DOMXPath($dom);
                $errorMsgList = $xpath->query("//p[@class='errormsg']");
    
                foreach ($errorMsgList as $errorMsg) {
                    $parent = $errorMsg->parentNode;
                    if ($parent) {
                        $parent->removeChild($errorMsg); // p-Element entfernen
                    }
                }
            }
            
            $errorMsg = $dom->createElement('p', 'Benutzername wird bereits verwendet');
            $errorMsg->setAttribute('class','errormsg');

            $form = $dom->getElementById('fill');
            $form->appendChild($errorMsg);

            $modifiedSignin = $dom->saveHTML();
            file_put_contents('../html/signin.html', $modifiedSignin);

            header('Content-Type: text/html');
            echo $modifiedSignin;
        }
    ?>

</body>
</html>