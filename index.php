<?php
$page = isset($_GET['p']) && $_GET['p'] !== '' ? $_GET['p'] : 'home';
$template = $page . '.php';
$templatePath = __DIR__ . '/templates/' . $template;

if (!is_file($templatePath)) {
    $page = 'home';
    $template = 'home.php';
}
?>

<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="utf-8" />
    <base href="">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta property="og:title" content="" />
    <meta property="og:type" content="website" />
    <meta name="twitter:image" content="" />
    <meta property="og:image" content="" />
    <meta name="twitter:title" content="" />
    <meta name="twitter:description" content="" />
    <meta name="twitter:card" content="photo" />
    <meta name="twitter:site" content="" />
    <meta name="document-state" content="dynamic" />
    <meta name='description' content="" />
    <meta name="keywords" content="">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/top.css" />
    <link rel="icon" href="assets/meta/favicon.ico" sizes="32x32">
    <link rel="icon" type="image/svg+xml" href="assets/meta/favicon-adaptive.svg">
    <link rel="apple-touch-icon" sizes="180x180" href="assets/meta/apple-touch-icon.png">
    <meta name="apple-mobile-web-app-title" content="">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <link rel="mask-icon" href="assets/meta/safari-pinned-tab.svg" color="#8250CE">
    <link rel="manifest" href="assets/meta/site.webmanifest">
    <meta name="theme-color" content="#502195">
    <meta name="msapplication-TileColor" content="#502195">
    <meta name="msapplication-config" content="assets/meta/browserconfig.xml">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="">
    <meta property="og:locale" content="en_US">
    <meta property="og:url" content="">
    <meta property="og:title" content="">
    <meta property="og:description" content="">
    <meta property="og:image" content="">
    <meta property="og:image:secure_url" content="">
    <meta property="og:image:type" content="image/png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="">
    <meta name="twitter:description" content="">
    <meta name="twitter:image" content="">
    <title>Page title</title>
</head>

<body>
    <link rel="stylesheet" href="assets/css/main.css" />

    <header class="header" data-header>
        <?php require 'templates/header.php'; ?>
    </header>

    <main>
        <?php require 'templates/' . $template; ?>
    </main>

    <footer class="footer" id="footer">
        <?php require 'templates/footer.php'; ?>
    </footer>

    <link rel="stylesheet" href="assets/css/bottom.css" />
    <script src="assets/js/main.js"></script>
</body>

</html>