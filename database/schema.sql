DROP DATABASE IF EXISTS `agiagrafi`
;

CREATE DATABASE IF NOT EXISTS `agiagrafi`
DEFAULT CHARSET = utf8
DEFAULT COLLATE = utf8_general_ci
;

COMMIT WORK
;

USE `agiagrafi`
;

SET default_storage_engine = INNODB
;

CREATE TABLE `biblio` (
	`id`		SMALLINT NOT NULL COMMENT 'Αριθμός βιβλίου',
	`perigrafi`	VARCHAR(128) NOT NULL COMMENT 'Περιγραφή βιβλίου',
	`titlos`	CHARACTER(20) NOT NULL COMMENT 'Τίτλος βιβλίου',
	`xroma`		CHARACTER(6) NULL DEFAULT NULL COMMENT 'Χρώμα βιβλίου',

	PRIMARY KEY (
		`id`
	) USING BTREE
)

COMMENT 'Πίνακας βιβλίων'
;

CREATE TABLE `edafio` (
	`id`		MEDIUMINT NOT NULL AUTO_INCREMENT COMMENT 'ID βιβλίου',
	`biblio`	SMALLINT NOT NULL COMMENT 'Αριθμός βιβλίου',
	`kefaleo`	SMALLINT NOT NULL COMMENT 'Κεφάλαιο',
	`stixos`	SMALLINT NOT NULL COMMENT 'Στίχος',
	`kimeno`	VARCHAR(4096) NOT NULL COMMENT 'Κείμενο',

	PRIMARY KEY (
		`id`
	) USING BTREE,

	UNIQUE INDEX (
		`biblio`,
		`kefaleo`,
		`stixos`
	) USING BTREE
)
;

COMMIT WORK
;

ALTER TABLE `edafio` ADD FOREIGN KEY (
	`biblio`
) REFERENCES `biblio` (
	`id`
) ON UPDATE CASCADE ON DELETE CASCADE
;

COMMIT WORK
;

DROP USER IF EXISTS 'agiagrafi'@'localhost'
;

CREATE USER 'agiagrafi'@'localhost' IDENTIFIED BY '__PASS__'
;

GRANT SELECT, INSERT, UPDATE, DELETE
ON agiagrafi.* TO 'agiagrafi'@'localhost'
;

COMMIT WORK
;
