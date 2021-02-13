<?php
// Στο παρόν PHP snippet γράφουμε per site στοιχεία, π.χ. το url βάσης της
// εφαρμογής. Αυτά τα στοιχεία συνήθως είναι διαφορετικά σε κάθε εγκατάσταση
// και γι' αυτό το λόγο το αρχείο αυτό θα πρέπει να τροποποιείται σε κάθε
// νέα εγκατάσταση της εφαρμογής.

// Ακολουθεί παράδειγμα του βασικού url για το development περιβάλλον.

define("BASE_URL", "http://localhost/agiagrafi");

// Ακολουθεί παράδειγμα του βασικού url για πιθανό production περιβάλλον.

define("BASE_URL", "http://agiagrafi.gr");
?>
