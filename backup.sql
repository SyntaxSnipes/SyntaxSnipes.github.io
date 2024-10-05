-- MySQL dump 10.13  Distrib 8.0.39, for Linux (x86_64)
--
-- Host: bookback-bookback.i.aivencloud.com    Database: defaultdb
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Table structure for table `books`
-- DROP TABLE IF EXISTS `books`;  -- Commented out this line
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `id` varchar(19) NOT NULL,
  `name` varchar(25) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `received_date` datetime DEFAULT NULL,
  `grade` enum('A','B','C') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;  -- Changed collation here
/*!40101 SET character_set_client = @saved_cs_client */;

-- Dumping data for table `books`
-- LOCK TABLES `books` WRITE;  -- Commented out this line
-- /*!40000 ALTER TABLE `books` DISABLE KEYS */;  -- Commented out this line
INSERT INTO `books` VALUES ('1','The Great Gatsby',10.99,'2023-01-01 12:00:00','A'),('2','1984',8.99,'2023-01-02 12:00:00','A'),('3','To Kill a Mockingbird',9.99,'2023-01-03 12:00:00','B'),('4','The Catcher in the Rye',7.99,'2023-01-04 12:00:00','B'),('5','Moby-Dick',12.99,'2023-01-05 12:00:00','C');
-- /*!40000 ALTER TABLE `books` ENABLE KEYS */;  -- Commented out this line
-- UNLOCK TABLES;  -- Commented out this line
-- SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;  -- Commented out this line
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-05 10:57:01
