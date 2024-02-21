CREATE TABLE `links` (
	`id` varchar(15) NOT NULL,
	`user_id` varchar(15),
	`action` enum('clipboard','link'),
	`name` varchar(32),
	`icon` varchar(128),
	`content` varchar(256),
	`tooltip` varchar(32),
	CONSTRAINT `links_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `links` ADD CONSTRAINT `links_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;