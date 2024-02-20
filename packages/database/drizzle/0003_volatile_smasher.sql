ALTER TABLE `users` MODIFY COLUMN `username` varchar(16) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_username_unique` UNIQUE(`username`);