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
    <!-- a map view -->
    <!-- css style for a class "map" -->
    <style>
        .map {
            margin: 0 auto;
            width: auto;
            height: auto;
            background-color: #f5f9f5;
            padding: 10px;
        }
    </style>
    <!-- css style for div class centered -->
    <style>
        .centered {
            margin: auto;
            width: 600px;
            border: 3px solid #73ad21;
            padding: 10px;
        }
    </style>
    <!-- div box centered in the middle of the screen with margins of 400 px -->
    <div class="centered">
        <!-- a map view -->
        <div class="map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.955750109898!2d-0.120874984680112!3d51.5270791798898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604c9c8f9f8f7%3A0x8f8f8f8f8f8f8f8f!2sLondon%2C+UK!5e0!3m2!1sen!2sus!4v1559240981796!5m2!1sen!2sus" width="580" height="600" frameborder="0" style="border:0;" allowfullscreen></iframe>
        </div>
    </div>

</body>

</html>