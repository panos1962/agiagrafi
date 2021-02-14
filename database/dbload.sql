LOAD DATA LOCAL INFILE 'books.tsv'
INTO TABLE `biblio`
COLUMNS TERMINATED BY '\t' (
	`id`,
	`perigrafi`,
	`titlos`,
	`xroma`
);

LOAD DATA LOCAL INFILE 'verses.tsv'
INTO TABLE `edafio`
COLUMNS TERMINATED BY '\t' (
	`biblio`,
	`kefaleo`,
	`stixos`,
	`kimeno`
);
