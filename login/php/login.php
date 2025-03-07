<?php $time = time() ?>
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Log-in</title>
    <link rel="stylesheet" href="../Styles/LoginStyles.css?v=<?php echo $time; ?>" />
    <script src="../Script/LoginScript.js" defer></script>
</head>
<body>
    <section id="content" >
        <nav>
            <a href="./login.php" class="selected" >Log-in</a>
            <a href="../html/signin.html">sign-in</a>
            <a id="home" href="./index.php">Home</a>
        </nav>
        <section>
                <img src="../gfx/bg.webp" alt="bg" id="bg">
        </section>
        <section id="form">
            <p>Log-in</p>
            <form action="check.php" method="POST" id="fill">
                Benutzername: <input type="text" name="benutzername" pla><br>
                Passwort: <input type="password" name="passwort"><br>
                <input id="submit" type="submit" value="Log-in">
            </form>
        </section>
    </section>
</body>
</html>