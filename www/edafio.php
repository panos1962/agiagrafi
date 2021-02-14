<?php
header('Content-Type: application/json; charset=utf-8;');
require_once("lib/selida.php");

$query = "SELECT MAX(`id`) FROM `edafio`";

$result = Selida::query($query);

if (!$result)
exit(0);

$row = $result->fetch_row();
$result->close();

if (!$row)
exit(0);

$query = "SELECT " .
	"`biblio`.`perigrafi` AS `biblio`, " .
	"`edafio`.`kefaleo`, " .
	"`edafio`.`stixos`, " .
	"`edafio`.`kimeno` " .
	"FROM `edafio`, `biblio` " .
	"WHERE (`edafio`.`id` = " . random_int(1, intval($row[0])) . ") " .
	"AND (`edafio`.`biblio` = `biblio`.`id`)";

$result = Selida::query($query);

if (!$result)
exit(0);

$row = $result->fetch_object();
$result->close();

print Selida::json_string($row);
?>
