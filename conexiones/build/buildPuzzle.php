<?php 
	// echo $_POST["g1Name"]; 
	// print_r($_POST['g1']) ;
	// echo "<br>";
	// echo json_encode($_POST['g1']);

function changeStringsToUpperCase($array)
{
    foreach ($array as $key => $value) {
        // Check if $value is a string
        if (is_string($value)) {
            // Convert $value to uppercase
            $array[$key] = strtoupper($value);
        }
    }
    return $array;
}

	$group1Name = strtoupper($_POST["g1Name"]);
	$group1Words = changeStringsToUpperCase($_POST['g1']);

	$group2Name = strtoupper($_POST["g2Name"]);
	$group2Words = changeStringsToUpperCase($_POST['g2']);

	$group3Name = strtoupper($_POST["g3Name"]);
	$group3Words = changeStringsToUpperCase($_POST['g3']);

	$group4Name = strtoupper($_POST["g4Name"]);
	$group4Words = changeStringsToUpperCase($_POST['g4']);

echo "{";
echo '  "id": 1000,';
echo '  "groups": {';

echo '"' . $group1Name .'": {';
echo '"level": 0,';
echo '"members": [';
echo '"' . $group1Words['w1'] . '",';
echo '"' . $group1Words['w2'] . '",';
echo '"' . $group1Words['w3'] . '",';
echo '"' . $group1Words['w4'] . '"';
echo "]";
echo "},";

echo '"' . $group2Name .'": {';
echo '"level": 1,';
echo '"members": [';
echo '"' . $group2Words['w1'] . '",';
echo '"' . $group2Words['w2'] . '",';
echo '"' . $group2Words['w3'] . '",';
echo '"' . $group2Words['w4'] . '"';
echo "]";
echo "},";

echo '"' . $group3Name .'": {';
echo '"level": 2,';
echo '"members": [';
echo '"' . $group3Words['w1'] . '",';
echo '"' . $group3Words['w2'] . '",';
echo '"' . $group3Words['w3'] . '",';
echo '"' . $group3Words['w4'] . '"';
echo "]";
echo "},";

echo '"' . $group4Name .'": {';
echo '"level": 3,';
echo '"members": [';
echo '"' . $group4Words['w1'] . '",';
echo '"' . $group4Words['w2'] . '",';
echo '"' . $group4Words['w3'] . '",';
echo '"' . $group4Words['w4'] . '"';
echo "]";
echo "}";

echo "},";
echo '"startingGroups": [';
echo "[";
echo '"' . $group1Words['w1'] . '",';
echo '"' . $group2Words['w2'] . '",';
echo '"' . $group3Words['w3'] . '",';
echo '"' . $group4Words['w4'] . '"';
echo "],";
echo "[";
echo '"' . $group1Words['w4'] . '",';
echo '"' . $group2Words['w3'] . '",';
echo '"' . $group3Words['w2'] . '",';
echo '"' . $group4Words['w1'] . '"';
echo "],";
echo "[";
echo '"' . $group1Words['w2'] . '",';
echo '"' . $group2Words['w1'] . '",';
echo '"' . $group3Words['w4'] . '",';
echo '"' . $group4Words['w3'] . '"';
echo "],";
echo "[";
echo '"' . $group1Words['w3'] . '",';
echo '"' . $group2Words['w4'] . '",';
echo '"' . $group3Words['w1'] . '",';
echo '"' . $group4Words['w2'] . '"';
echo "]";

echo "]}";
    



?>