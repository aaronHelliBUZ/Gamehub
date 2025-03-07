<?php $time = time() ?>
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
    <link rel="stylesheet" href="../Styles/LoginStyles.css?v=<?php echo $time; ?>" />
    <script src="../Script/LoginScript.js" defer></script>
    <nav></nav>
</head>
<body>
    <section id="content">
        <nav>
            <a href="./login.php">Log-in</a>
            <a href="../html/signin.html">sign-in</a>
            <a id="home" class="selected" href="./index.php">Home</a>
        </nav>
        <section>
            <img src="../gfx/bg.webp" alt="bg" id="bg">
        </section>
    </section>
</body>
</html>