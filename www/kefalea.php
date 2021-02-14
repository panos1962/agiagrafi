<?php
header('Content-Type: application/json; charset=utf-8;');
require_once("lib/selida.php");

$query = "SELECT DISTINCT `kefaleo`" .
	" FROM `edafio`" .
	" WHERE `biblio` = " . $_POST["biblio"] .
	" ORDER BY `kefaleo`";

$result = Selida::query($query);

if (!$result)
exit(0);

print "[";
while ($row = $result->fetch_row())
print $row[0] . ",";

$result->close();
print "null]";
?>
