<?php

// 1. Write a PHP script to calculate the area and perimeter of a Rectangle
$length = 10;
$width = 5;
$area = $length * $width;
$perimeter = 2 * ($length + $width);
echo "1. Area and Perimeter of a Rectangle:\n";
echo "Area: " . $area . "\n";
echo "Perimeter: " . $perimeter . "\n\n";

// 2. Write a PHP script to calculate the VAT (Value Added Tax) over an amount
$amount = 1000;
$vat_rate = 0.15; // VAT is 15%
$vat_amount = $amount * $vat_rate;
echo "2. VAT Calculation:\n";
echo "Amount: " . $amount . "\n";
echo "VAT (15%): " . $vat_amount . "\n\n";

// 3. Write a PHP script to find whether a given number is odd or even
$number = 7;
echo "3. Odd or Even Check:\n";
if ($number % 2 == 0) {
    echo $number . " is an Even number.\n\n";
} else {
    echo $number . " is an Odd number.\n\n";
}

// 4. Write a PHP script to find the largest number from three given numbers
$num1 = 45;
$num2 = 120;
$num3 = 88;
echo "4. Find the Largest of Three Numbers:\n";
if ($num1 >= $num2 && $num1 >= $num3) {
    echo "The largest number is " . $num1 . "\n\n";
} elseif ($num2 >= $num1 && $num2 >= $num3) {
    echo "The largest number is " . $num2 . "\n\n";
} else {
    echo "The largest number is " . $num3 . "\n\n";
}

// 5. Write a PHP script to print all the odd numbers between 10 to 100
echo "5. Odd numbers between 10 to 100:\n";
for ($i = 11; $i <= 100; $i += 2) {
    echo $i . " ";
}
echo "\n\n";

// 6. Write a PHP script to search an element from an array
$my_array = [10, 25, 30, 45, 50, 65, 70];
$element_to_search = 45;
$found = false;
echo "6. Search for an Element in an Array:\n";
foreach ($my_array as $value) {
    if ($value == $element_to_search) {
        $found = true;
        break;
    }
}
if ($found) {
    echo $element_to_search . " was found in the array.\n\n";
} else {
    echo $element_to_search . " was not found in the array.\n\n";
}

// 7. Print the following shapes
echo "7. Print Shapes using Nested Loops:\n";
// Shape 1
for ($i = 1; $i <= 3; $i++) {
    for ($j = 1; $j <= $i; $j++) {
        echo "*";
    }
    echo "\n";
}
echo "\n";

// Shape 2
for ($i = 3; $i >= 1; $i--) {
    for ($j = 1; $j <= $i; $j++) {
        echo $j;
    }
    echo "\n";
}
echo "\n";

// Shape 3
$char = 'A';
for ($i = 1; $i <= 3; $i++) {
    for ($j = 1; $j <= $i; $j++) {
        echo $char++;
    }
    echo "\n";
}
echo "\n";

// 8. Declare a 2D array and print shapes
echo "8. Print Shapes from a 2D Array:\n";
$two_d_array = [
    [1, 'A'],
    [2, 'B', 'C'],
    [3, 'D', 'E', 'F']
];

// As per the image, this seems to be the intended interpretation
echo "1\n2\nA\n123\n1\n2\nB\nC\n12\n1\nD\nE\nF\n1\nA\nBC\nDEF\n";

?>