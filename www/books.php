<?php
header('Content-Type: application/json; charset=utf-8;');
require_once("lib/selida.php");

$query = "SELECT * FROM `biblio` ORDER BY `id`";

$result = Selida::query($query);

if (!$result)
exit(0);

print "[";
while ($row = $result->fetch_object())
print Selida::json_string($row) . ",";

$result->close();
print "null]";
?>
