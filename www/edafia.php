<?php
header('Content-Type: application/json; charset=utf-8;');
require_once("lib/selida.php");

$query = "SELECT " .
	"`edafio`.`stixos`, " .
	"`edafio`.`kimeno` " .
	"FROM `edafio` " .
	"WHERE (`biblio` = " . $_POST["biblio"] . ") " .
	"AND (`kefaleo` = " . $_POST["kefaleo"] . ") " .
	"ORDER BY `stixos`";

$result = Selida::query($query);

if (!$result)
exit(0);

print "[";

while ($row = $result->fetch_object())
print Selida::json_string($row) . ",";

$result->close();
print "null]";
?>
