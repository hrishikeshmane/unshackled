CREATE TABLE `unshackled_billboard` (
	`id` text(256) PRIMARY KEY NOT NULL,
	`storeId` text(256) NOT NULL,
	`label` text(256) NOT NULL,
	`description` text NOT NULL,
	`imageUrl` text(256) NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`storeId`) REFERENCES `unshackled_store`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `unshackled_formQuestions` (
	`id` text(256) PRIMARY KEY NOT NULL,
	`productId` text(256) NOT NULL,
	`vendorId` text(256) NOT NULL,
	`question` text NOT NULL,
	`type` text NOT NULL,
	FOREIGN KEY (`productId`) REFERENCES `unshackled_product`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`vendorId`) REFERENCES `unshackled_users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `unshackled_order` (
	`id` text(256) PRIMARY KEY NOT NULL,
	`isPaid` integer NOT NULL,
	`paymentStatus` text DEFAULT 'Not Initiated',
	`orderTotal` text(256) NOT NULL,
	`vendorAmount` text(256) NOT NULL,
	`paymentIntentId` text,
	`sessionId` text,
	`receipt` text,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch()),
	`customerId` text(256) NOT NULL,
	FOREIGN KEY (`customerId`) REFERENCES `unshackled_users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `unshackled_orderItem` (
	`id` text(256) PRIMARY KEY NOT NULL,
	`isFulfilled` integer NOT NULL,
	`vendorPayout` integer NOT NULL,
	`approval` text DEFAULT 'approved',
	`orderId` text(256) NOT NULL,
	`productId` text(256) NOT NULL,
	`quantity` integer DEFAULT 1 NOT NULL,
	`isDownPayment` integer DEFAULT false NOT NULL,
	`storeId` text(256) NOT NULL,
	FOREIGN KEY (`orderId`) REFERENCES `unshackled_order`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`productId`) REFERENCES `unshackled_product`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`storeId`) REFERENCES `unshackled_store`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `unshackled_product` (
	`id` text(256) PRIMARY KEY NOT NULL,
	`storeId` text(256) NOT NULL,
	`typeId` text(256) NOT NULL,
	`creatorId` text(256) NOT NULL,
	`stripeId` text(256) NOT NULL,
	`name` text(256) NOT NULL,
	`tagline` text(256) NOT NULL,
	`description` text NOT NULL,
	`price` text(256) NOT NULL,
	`imageUrl` text(256) NOT NULL,
	`commission` text(256) NOT NULL,
	`commissionType` text NOT NULL,
	`estTurnAroundTime` text(256) NOT NULL,
	`domainRank` text(256) NOT NULL,
	`isFeatured` integer NOT NULL,
	`isArchived` integer NOT NULL,
	`isApproved` text NOT NULL,
	`requiresVendorApproval` integer DEFAULT false NOT NULL,
	`hasDownPayment` integer DEFAULT false NOT NULL,
	`downpayment` text(256) DEFAULT '0' NOT NULL,
	`orderCommunicationEmail` text(256) DEFAULT '' NOT NULL,
	`additionalOrderEmailText` text(256) DEFAULT '' NOT NULL,
	`hasAdditionalLink` integer DEFAULT false NOT NULL,
	`additionalLinkLabel` text(256) DEFAULT '' NOT NULL,
	`additionalLinkUrl` text(256) DEFAULT '' NOT NULL,
	`tagId` text(256) NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`storeId`) REFERENCES `unshackled_store`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`typeId`) REFERENCES `unshackled_type`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`creatorId`) REFERENCES `unshackled_users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tagId`) REFERENCES `unshackled_tag`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `unshackled_store` (
	`id` text(256) PRIMARY KEY NOT NULL,
	`name` text(256) NOT NULL,
	`description` text DEFAULT '',
	`isLive` integer DEFAULT false,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch())
);
--> statement-breakpoint
CREATE TABLE `unshackled_tag` (
	`id` text(256) PRIMARY KEY NOT NULL,
	`storeId` text(256) NOT NULL,
	`name` text(256) NOT NULL,
	`value` text(256) NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`storeId`) REFERENCES `unshackled_store`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `unshackled_type` (
	`id` text(256) PRIMARY KEY NOT NULL,
	`name` text(256) NOT NULL,
	`storeId` text(256) NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`storeId`) REFERENCES `unshackled_store`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `unshackled_users` (
	`id` text(256) PRIMARY KEY NOT NULL,
	`role` text NOT NULL,
	`member` integer NOT NULL,
	`fullName` text(126) NOT NULL,
	`email` text(126) NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch())
);
--> statement-breakpoint
CREATE TABLE `unshackled_vendorInfo` (
	`id` text(256) PRIMARY KEY NOT NULL,
	`userId` text(256) NOT NULL,
	`stripeConnectedId` text(256),
	`stripeConnected` integer NOT NULL,
	`status` text NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `unshackled_users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `unshackled_waitlist` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text(256)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `unshackled_waitlist_email_unique` ON `unshackled_waitlist` (`email`);