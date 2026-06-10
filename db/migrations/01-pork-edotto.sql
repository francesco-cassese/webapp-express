DROP TABLE IF EXISTS `product_category`;
DROP TABLE IF EXISTS `reviews`;
DROP TABLE IF EXISTS `products`;
DROP TABLE IF EXISTS `categories`;

CREATE TABLE `products`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,
    `price` DECIMAL(8, 2) NOT NULL,
    `image` VARCHAR(255) DEFAULT "placeholder.png",
    `if_available` TINYINT NOT NULL,
    `place_of_origin` VARCHAR(45) NULL,
    `created_at` TIMESTAMP NOT NULL,
    `updated_at` TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL DEFAULT NULL
);

CREATE TABLE `categories`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT NULL
);

CREATE TABLE `product_category`(
    `product_id` BIGINT UNSIGNED NOT NULL, /* Added UNSIGNED */
    `category_id` BIGINT UNSIGNED NOT NULL /* Added UNSIGNED */
);

ALTER TABLE `product_category` 
    ADD INDEX `product_category_product_id_category_id_index`(`product_id`, `category_id`);

CREATE TABLE `reviews`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(45) NOT NULL,
    `title` VARCHAR(255) NULL,
    `review_content` TEXT NULL,
    `date` DATETIME NOT NULL,
    `rating` TINYINT NOT NULL,
    `product_id` BIGINT UNSIGNED NOT NULL /* Added UNSIGNED */
);

/* Changed SET NULL to CASCADE */
ALTER TABLE `product_category` 
    ADD CONSTRAINT `product_category_category_id_foreign` FOREIGN KEY(`category_id`) REFERENCES `categories`(`id`) ON DELETE CASCADE;

/* Changed SET NULL to CASCADE (Reviews also had the same contradiction) */
ALTER TABLE `reviews` 
    ADD CONSTRAINT `reviews_product_id_foreign` FOREIGN KEY(`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE;

ALTER TABLE `product_category` 
    ADD CONSTRAINT `product_category_product_id_foreign` FOREIGN KEY(`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE;