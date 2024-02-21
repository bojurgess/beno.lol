CREATE TABLE `flags` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(32),
	`icon` varchar(128),
	`public` boolean,
	CONSTRAINT `flags_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `profiles` (
	`id` varchar(15) NOT NULL,
	`uid` serial AUTO_INCREMENT,
	`username` varchar(16),
	`bio` varchar(1024),
	`avatar` varchar(128),
	`banner` varchar(128),
	`background` varchar(128),
	CONSTRAINT `profiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `profiles_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
CREATE TABLE `themes` (
	`id` varchar(15) NOT NULL,
	`author` varchar(15),
	`name` varchar(32),
	`primary` int,
	`secondary` int,
	CONSTRAINT `themes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_flags` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_id` varchar(15),
	`flag_id` bigint unsigned,
	CONSTRAINT `user_flags_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_id_users_id_fk` FOREIGN KEY (`id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_username_users_username_fk` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `themes` ADD CONSTRAINT `themes_author_users_id_fk` FOREIGN KEY (`author`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_flags` ADD CONSTRAINT `user_flags_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_flags` ADD CONSTRAINT `user_flags_flag_id_flags_id_fk` FOREIGN KEY (`flag_id`) REFERENCES `flags`(`id`) ON DELETE no action ON UPDATE no action;