<?php
require_once("lib/selida.php");

Selida::
head_open()::
titlos("Αγία Γραφή")::
body_open();

if ($_GET["books"]) {
?>
<script>
Show.booksAuto = true;
</script>
<?php
}

Selida::
body_close();
?>
