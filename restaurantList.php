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
    <!-- css style for a table -->
    <style>
        table {
            border-collapse: collapse;
            width: 100%;
        }

        th,
        td {
            text-align: left;
            padding: 8px;
        }

        tr:nth-child(even) {
            background-color: #f2f2f2
        }
    </style>
    <div>
        <table>
            <tr>
                <th>Restaurant name</th>
                <th>Adress</th>
                <th>Picture</th>
            </tr>
            <?php
            // Generate 20 random values
            for ($i = 0; $i < 20; $i++) {
                $random = rand(1, 100);
                // Generate a random restaurant name
                $restaurantName = "Restaurant " . $random;
                // Generate a random adress
                $adress = "Adress " . $random;
                // Generate a random picture
                $picture = "https://zellersrestaurants.com/wp-content/uploads/2019/11/Restaurant.jpg";
                // Generate a table row with the generated values
                // Restaurant name should be a ref link to restaurant profile and image should be 30x30
                echo "<tr><td><a href='restaurantProfile.php?restaurantName=$restaurantName'>$restaurantName</a></td><td>$adress</td><td><img src='$picture' width='100' height='100'></td></tr>";
            }
            ?>
        </table>
    </div>
</body>

</html>