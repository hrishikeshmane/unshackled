CREATE TABLE `unshackled_vendorInfo` (
	`id` text(256) PRIMARY KEY NOT NULL,
	`userId` text(256) NOT NULL,
	`stripeConnected` integer NOT NULL,
	`status` text NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `unshackled_users`(`id`) ON UPDATE no action ON DELETE cascade
);
