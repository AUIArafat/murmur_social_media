CREATE TABLE `relationships`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `follower_id` CHAR(36) NULL,
    `followed_id` CHAR(36) NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL
);
ALTER TABLE
    `relationships` ADD INDEX `relationships_follower_id_followed_id_index`(`follower_id`, `followed_id`);
ALTER TABLE
    `relationships` ADD PRIMARY KEY `relationships_id_primary`(`id`);
ALTER TABLE
    `relationships` ADD INDEX `relationships_follower_id_index`(`follower_id`);
ALTER TABLE
    `relationships` ADD INDEX `relationships_followed_id_index`(`followed_id`);
CREATE TABLE `murmurs`(
    `murmur_id` CHAR(36) NOT NULL,
    `text` VARCHAR(255) NOT NULL,
    `user_id` CHAR(36) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    `like_count` INT NOT NULL
);
ALTER TABLE
    `murmurs` ADD INDEX `murmurs_user_id_index`(`user_id`);
ALTER TABLE
    `murmurs` ADD PRIMARY KEY `murmurs_murmur_id_primary`(`murmur_id`);
ALTER TABLE
    `murmurs` ADD INDEX `murmurs_user_id_index`(`user_id`);
CREATE TABLE `users`(
    `user_id` CHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL
);
ALTER TABLE
    `users` ADD PRIMARY KEY `users_user_id_primary`(`user_id`);
ALTER TABLE
    `users` ADD UNIQUE `users_email_unique`(`email`);
ALTER TABLE
    `relationships` ADD CONSTRAINT `relationships_follower_id_foreign` FOREIGN KEY(`follower_id`) REFERENCES `users`(`user_id`);
ALTER TABLE
    `relationships` ADD CONSTRAINT `relationships_followed_id_foreign` FOREIGN KEY(`followed_id`) REFERENCES `users`(`user_id`);
ALTER TABLE
    `murmurs` ADD CONSTRAINT `murmurs_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`user_id`);

INSERT INTO users (user_id, name, email, password, created_at, updated_at) 
    VALUES ('14562ef6-ea2c-4c04-ae7a-372d953e1cd9', 'admin', 'admin@gmail.com', '123456', '12-12-2020', '01-01-2021');