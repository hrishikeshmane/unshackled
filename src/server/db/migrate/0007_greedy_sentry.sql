ALTER TABLE `unshackled_order` ADD `paymentStatus` text DEFAULT 'Not Initiated';--> statement-breakpoint
ALTER TABLE `unshackled_order` ADD `paymentIntentId` text;--> statement-breakpoint
ALTER TABLE `unshackled_order` ADD `sessionId` text;--> statement-breakpoint
ALTER TABLE `unshackled_order` ADD `receipt` text;