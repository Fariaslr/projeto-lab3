CREATE TABLE `veterinarios` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nome` text NOT NULL,
	`crmv` text NOT NULL,
	`estado` text NOT NULL,
	`fotoUrl` text,
	`ccpsId` integer NOT NULL
);
