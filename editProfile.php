<!DOCTYPE html>
<html lang="en">

<head>
    <link rel="stylesheet" href="styles.css">
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
</head>

<body>
    <!-- button in the top left corner "back" returning you to the previous page -->
    <div class="back">
        <a href="<?php echo $_SERVER['HTTP_REFERER']; ?>">
            <button>Back</button>
        </a>
    </div>
</body>

</html>