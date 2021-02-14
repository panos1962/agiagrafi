<?php
session_start();

///////////////////////////////////////////////////////////////////////////////@

// Εντοπίζουμε το directory στο οποίο βρίσκεται η παρούσα βιβλιοθήκη δηλαδή
// το αρχείο "www/lib/selida.php". Αυτό το directory αποτελεί το directory
// βάσης της εφαρμογής και το κρατάμε στη συμβολική σταθερά "BASE_DIR"
// προκειμένου να έχουμε εύκολη και ασφαλή πρόσβαση σε οποιοδήποτε αρχείο
// της εφαρμογής, χρησιμοποιώντας absolute pathnames.

define("BASE_DIR", preg_replace("/\/www\/lib\/selida\.php$/", "", __FILE__));

// Στο αρχείο "local/conf.php" γράφουμε per site στοιχεία, τουτέστιν στοιχεία
// που αφορούν στην εκάστοτε εγκατάσταση της εφαρμογής, π.χ. άλλα στοιχεία για
// το developemnt και άλλα για το production σύστημα.

require_once(BASE_DIR . "/local/conf.php");

// Στο σημείο αυτό δημιουργούμε το singleton "Selida" το οποίο θα εξοπλίσουμε
// με properties και functions (methods) που θα μας διευκολύνουν στη γραφή
// των PHP προγραμμάτων της εφαρμογής.

class Selida {
///////////////////////////////////////////////////////////////////////////////@

// Η function "css" διαβάζει διευκολύνει την εμφύτευση css αρχείων στη σελίδα.
// Πρόκειται για wrapper γύρω από την αντίστοιχη HTML εντολή.

public static function css($file) {
?>
<link rel="stylesheet" href="<?php print $file; ?>.css">
<?php
	return __CLASS__;
}

// Η function "javascript" είναι παρόμοια με τη function "css" αλλά αφορά σε
// javascript files.

public static function javascript($file) {
?>
<script src="<?php print $file; ?>.js"></script>
<?php
	return __CLASS__;
}

///////////////////////////////////////////////////////////////////////////////@

// Η function "head_open" εκτυπώνει το αρχικό μέρος της σελίδας, δηλαδή ανοίγει
// το html section και αμέσως μετά ανοίγει το head section στο οποίο μάλιστα
// εισάγει και κάποια βασικά στοιχεία που είναι κοινά σε όλες τις σελίδες που
// διαχειρίζεται η εφαρμογή, π.χ. favicon, βιβλιοθήκη jQuery κλπ. Σημαντική
// είναι, επίσης, η μεταφορά στοιχείων από τον server στον client με την
// εμφύτευση στη σελίδα Javascript snippet που κατασκευάζεται on the fly.

public static function head_open() {
?>
<html>
<head>
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Alegreya&display=swap" rel="stylesheet">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<link rel="icon" type="image/png" href="<?php print BASE_URL; ?>/images/agiagrafi.png">
<?php
Selida::
css(BASE_URL . "/lib/selida")::
javascript(BASE_URL . "/lib/selida");
?>
<script>
Selida.baseUrl = <?php print Selida::json_string(BASE_URL); ?>;
<?php
if (array_key_exists("xristis", $_SESSION)) {
?>
Selida.xristis = <?php print Selida::json_string($_SESSION["xristis"]); ?>;
<?php
}
else {
?>
delete Selida.xristis;
<?php
}
?>
</script>
<?php
	if (file_exists("main.css"))
	Selida::css("main");

	if (file_exists("main.js"))
	Selida::javascript("main");

	return __CLASS__;
}

// Η function "head_close" «κλείνει» το head section και το html section.
// Την χρησιμοποιούμε σε σελίδες στις οποίες το body section είναι κενό.

public static function head_close() {
?>
</head>
<body>
</body>
</html>
<?php
	return __CLASS__;
}

// Η function "titlos" δέχεται ένα string και το θέτει ως τίτλο στην τρέχουσα
// σελίδα μέσω του titlos HTML tag. Υπενθυμίζουμε ότι ο τίτλος εμφανίζεται
// στο tab της σελίδας.

public static function titlos($titlos) {
?>
<title>
<?php
print $titlos;
?>
</title>
<?php
	return __CLASS__;
}

// Η function "body_open" «κλείνει» το head section της σελίδας και «ανοίγει»
// το body section.

public static function body_open() {
?>
</head>
<body>
<?php
	return __CLASS__;
}

// Η function "body_close" «κλείνει» το body section και το html section.
// Συνήθως είναι η τελευταία function που καλούμε κατά την προετοιμασία
// οποιασδήποτε σελίδας.

public static function body_close() {
?>
</body>
</html>
<?php
	return __CLASS__;
}

///////////////////////////////////////////////////////////////////////////////@

// Ακολουθούν properties και functions που σχετίζονται με τη διαχείριση της
// database. Θυμίζουμε ότι ως RDBMS χρησιμοποιούμε είτε το MySQL, είτε το
// MariaDB.

// Για τη διαχείριση της database θα χρειαστούμε έναν database handler τον
// οποίο να τον γνωρίζουμε globaly. Για το σκοπό αυτό ορίζουμε την property
// "db" η οποία αρχικά τίθεται null αλλά μπορεί να καταστεί database handler
// μέσω της function "dbopen".

public static $db = NULL;

// Η function "dbopen" διαβάζει από συγκεκριμένο αρχείο της εφαρμογής το
// password του γενικού λογαριασμού "agiagrafi" μέσω του οποίου συνδεόμαστε
// στην database. Ο λογαριασμός έχει πλήρη DML δικαιώματα, τουτέστιν select,
// insert, update και delete.

public static function dbopen() {
	// Αν υπάρχει ήδη σύνδεση με την database επιστρέφουμε πάραυτα.

	if (self::$db)
	return __CLASS__;

	$pass = rtrim(file_get_contents(BASE_DIR . "/local/secret/sesami.txt"));
	self::$db = new mysqli("localhost", "agiagrafi", $pass, "agiagrafi");

	if (self::$db->connect_errno) {
		$errmsg = self::$db->connect_error;
		self::$db = NULL;
		throw new Exception($errmsg);
	}

	self::$db->set_charset("utf8mb4");

	if (self::$db->errno)
	throw new Exception(self::$db->error);
}

// Η function "dbclose" καταργεί τη σύνδεση με την database και καλείται
// συνήθως αυτόματα κατά την έξοδο από το πρόγραμμα. Ο global database
// handler "db" μας δείχνει αν υπάρχει ενεργή σύνδεση με την database,
// οπότε φροντίζουμε μετά την αποσύνδεση του προγράμματος από την database
// τον επαναφέρουμε σε null.

public static function dbclose() {
	if (!isset(self::$db))
	return __CLASS__;

	self::$db->close();
	self::$db = NULL;
	return __CLASS__;
}

// Η function "sql_string" είναι χρήσιμη στην εμφύτευση strings μέσα σε SQL
// scripts. Πιο συγκεκριμένα, κάνει escaping σε ειδικούς χαρακτήρες, π.χ.
// backslashes, quotes κλπ, και επιστρέφει το string μέσα σε απλά quotes.
// Αν δεν επιθυμούμε τα quotes γύρω από το string, μπορούμε να περάσουμε
// ως δεύτερη παράμετρο ένα κενό string.

public static function sql_string($s, $quote = "'") {
	self::dbopen();
	return $quote . self::$db->real_escape_string($s) . $quote;
}

// Η function "query" επιχειρεί να εκτελέσει το query που περνάμε ως μοναδική
// παράμετρο και επιστρέφει το αποτέλεσμα.

public static function query($query) {
	self::dbopen();
	return self::$db->query($query);
}

///////////////////////////////////////////////////////////////////////////////@

// Η function "json_string" δέχεται ένα string και το επιστρέφει σε μορφή
// ασφαλή προκειμένου να χρησιμοποιηθεί ως json string value, π.χ. το string
// panos επιστρέφεται ως "panos", ενώ το string p"ano"s επιστρέφεται ως
// "p\"ano\"s".

public static function json_string($s) {
	return json_encode($s,
	JSON_FORCE_OBJECT |
	JSON_UNESCAPED_UNICODE);
}

///////////////////////////////////////////////////////////////////////////////@
}

// Κατά την έξοδο από το πρόγραμμα κλείνουμε τυχόν σύνδεσή μας με την database.

register_shutdown_function('Selida::dbclose');
?>
