-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_articles_users_idx` (`userId`),
  CONSTRAINT `fk_articles_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=783 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (649,97,NULL,'http://localhost:3000/images/870x489_vacances.jpg1639749777384.jpg','2021-12-17 14:02:57','2021-12-17 14:02:57'),(652,102,'Bonjour à tous! Je cherche à déménager en région Parisienne. Des infos sur les postes à pourvoir dans la région?','','2021-12-17 14:15:30','2021-12-17 14:15:30'),(653,82,'Je vous souhaite la bienvenue à tous sur le réseau social de Groupomania! Ceci est un espace d\'échange entre collègues dans le respect et la bonne humeur. Je compte sur vous! A très vite !','','2021-12-17 14:44:36','2021-12-17 14:44:36'),(782,151,'Bonjour à tous! J\\\'ai trouvé cet article très intéressant sur le bien être au travail j\\\'espère qu\'\'il vous plaira ! https://blog.monportailrh.com/bien-etre-au-travail\'','http://localhost:3000/images/avec-la-propagation-du-variant-delta-les-adeptes-du-teletravail-sont-confortes-dans-l-idee-que-ce-mode-de-vie-s-impose-desormais-naturellement_6318986.jpg1639749249945.jpg1640642872418.jpg','2021-12-27 22:03:57','2021-12-27 22:07:52');
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `articleId` int NOT NULL,
  `userId` int NOT NULL,
  `content` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_comments_articles1_idx` (`articleId`),
  KEY `fk_comments_users1_idx` (`userId`),
  CONSTRAINT `fk_comments_articles1` FOREIGN KEY (`articleId`) REFERENCES `articles` (`id`),
  CONSTRAINT `fk_comments_users1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=340 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (298,649,102,'Profites bien!','2021-12-17 14:27:51','2021-12-17 14:27:51'),(300,649,97,'Merci!','2021-12-17 14:29:05','2021-12-17 14:29:05'),(303,652,82,'Bonne chance dans tes recherches !','2021-12-17 14:46:11','2021-12-17 14:46:11'),(339,782,97,'très interessant!','2021-12-27 22:04:24','2021-12-27 22:04:24');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(40) NOT NULL,
  `lastname` varchar(40) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `isAdmin` tinyint NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `activate` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=152 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (82,'admin','1','admin@gmail.com','$2b$10$dyf6zUzWoYDIki040Kuyk.XdlBgmyp0/M9vlYl08xAChnArfmSawi','http://localhost:3000/images/360_F_7324855_mx4CEBWTr81XLOrlQccCROtP2uNR7xbk.jpg1638871505887.jpg',1,'2021-12-07 10:05:05','2021-12-27 20:46:16',1),(97,'Virginie','Bernard','boutilliervirginie@gmail.com','$2b$10$/5B18i4XVLCwL7Pjw.PjVeF2D4aKQ5jDOglgET53OwRN0FlXzUWOO','http://localhost:3000/images/x.jpg1639488417417.jpg',0,'2021-12-14 13:26:57','2021-12-17 14:05:17',1),(102,'Tony','Top','tonytop@gmail.com','$2b$10$fRW8HoZwEudwxMD0iAiDbO4gMPNqP0zTpXfkwGPiB8ML8hIws0CC.','http://localhost:3000/images/sticker-hublot-mario.jpg1639750009462.jpg',0,'2021-12-17 14:06:49','2021-12-27 21:35:27',0),(151,'Bastien','FUCHS','bastienfuchs@gmail.com','$2b$10$rnAPm6Ice4nv9ug7SVe5ju1.YN38Pdd5ASiLiaY4LunQu00WixuC6','http://localhost:3000/images/c9cc594e44dfda2fde77c83b4fdee210.png1639742522854.png1640642445715.png',0,'2021-12-27 22:00:45','2021-12-27 22:00:45',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-27 23:11:53
