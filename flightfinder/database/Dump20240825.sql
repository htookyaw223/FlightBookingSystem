-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: flight-booking
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `airline`
--

DROP TABLE IF EXISTS `airline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `airline` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `airline`
--

LOCK TABLES `airline` WRITE;
/*!40000 ALTER TABLE `airline` DISABLE KEYS */;
INSERT INTO `airline` VALUES (1,'MAI','Myanmar','Myanmar Airway','MAI'),(2,'THA','Thailand','Thai Air Asia','THA');
/*!40000 ALTER TABLE `airline` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `airports`
--

DROP TABLE IF EXISTS `airports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `airports` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `iata_code` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `airports`
--

LOCK TABLES `airports` WRITE;
/*!40000 ALTER TABLE `airports` DISABLE KEYS */;
INSERT INTO `airports` VALUES (1,'Yangon','Myanmar','YGN','Yangon International Airport'),(2,'Bangkok','Thailand','THA','Domeaung Airport');
/*!40000 ALTER TABLE `airports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking_detail`
--

DROP TABLE IF EXISTS `booking_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking_detail` (
  `booking_detail_id` bigint NOT NULL AUTO_INCREMENT,
  `booking_id` varchar(255) DEFAULT NULL,
  `departure_flight_schedule_id` bigint DEFAULT NULL,
  `payment_date` datetime(6) DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `payment_status` varchar(255) DEFAULT NULL,
  `price` double NOT NULL,
  `return_flight_schedule_id` bigint DEFAULT NULL,
  `seat_class` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`booking_detail_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking_detail`
--

LOCK TABLES `booking_detail` WRITE;
/*!40000 ALTER TABLE `booking_detail` DISABLE KEYS */;
INSERT INTO `booking_detail` VALUES (1,'BOOK474F4CF6',1,'2024-08-25 21:00:52.977000','Credit/Debit','completed',0,6,NULL),(2,'BOOK2A90FDC7',1,'2024-08-25 21:07:10.599000','Credit/Debit','completed',0,6,NULL),(3,'BOOK6ACD6482',1,'2024-08-25 21:13:48.598000','Credit/Debit','completed',0,6,NULL),(4,'BOOK0F882F82',1,'2024-08-25 21:20:14.659000','Credit/Debit','completed',0,NULL,NULL),(5,'BOOKFEAC00AE',1,'2024-08-25 23:06:44.875000','Credit/Debit','completed',0,NULL,NULL),(6,'BOOK495D60A6',1,'2024-08-25 23:20:46.845000','Credit/Debit','completed',0,NULL,NULL);
/*!40000 ALTER TABLE `booking_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flight`
--

DROP TABLE IF EXISTS `flight`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flight` (
  `airline_id` bigint DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `flight_number` varchar(255) DEFAULT NULL,
  `frequency` varchar(255) DEFAULT NULL,
  `available_seat` int DEFAULT NULL,
  `air_line_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK37wfh52g7g91rllg104gfq3yv` (`airline_id`),
  KEY `FKpn187601l278i10nvty7nbb9i` (`air_line_id`),
  CONSTRAINT `FK37wfh52g7g91rllg104gfq3yv` FOREIGN KEY (`airline_id`) REFERENCES `airline` (`id`),
  CONSTRAINT `FKpn187601l278i10nvty7nbb9i` FOREIGN KEY (`air_line_id`) REFERENCES `airline` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flight`
--

LOCK TABLES `flight` WRITE;
/*!40000 ALTER TABLE `flight` DISABLE KEYS */;
INSERT INTO `flight` VALUES (1,1,'8M360','2',50,NULL),(2,2,'TH879','2',50,NULL),(1,3,'8M361','2',50,NULL),(2,4,'TH876','2',50,NULL);
/*!40000 ALTER TABLE `flight` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flight_schedule`
--

DROP TABLE IF EXISTS `flight_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flight_schedule` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `arrival_time` datetime(6) DEFAULT NULL,
  `departure_time` datetime(6) DEFAULT NULL,
  `destination_airport_id` bigint DEFAULT NULL,
  `flight_id` bigint DEFAULT NULL,
  `origin_airport_id` bigint DEFAULT NULL,
  `price` double NOT NULL,
  `seat_class` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKoi7phvj30j3stel9k1973e5nu` (`destination_airport_id`),
  KEY `FK1voe8ky2xg3fw8x5jiwduigja` (`flight_id`),
  KEY `FK54assmtbk7hcog16cjxamtmrd` (`origin_airport_id`),
  CONSTRAINT `FK1voe8ky2xg3fw8x5jiwduigja` FOREIGN KEY (`flight_id`) REFERENCES `flight` (`id`),
  CONSTRAINT `FK54assmtbk7hcog16cjxamtmrd` FOREIGN KEY (`origin_airport_id`) REFERENCES `airports` (`id`),
  CONSTRAINT `FKoi7phvj30j3stel9k1973e5nu` FOREIGN KEY (`destination_airport_id`) REFERENCES `airports` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flight_schedule`
--

LOCK TABLES `flight_schedule` WRITE;
/*!40000 ALTER TABLE `flight_schedule` DISABLE KEYS */;
INSERT INTO `flight_schedule` VALUES (1,'2024-08-26 14:30:00.000000','2024-08-26 12:30:00.000000',2,1,1,1000,'ECONOMY'),(2,'2024-08-27 00:00:00.000000','2024-08-27 00:00:00.000000',2,1,1,1000,'1'),(3,'2024-08-28 14:30:00.000000','2024-08-28 12:30:00.000000',2,1,1,1000,'ECONOMY'),(4,'2024-08-29 14:30:00.000000','2024-08-29 12:30:00.000000',2,1,1,1000,'ECONOMY'),(5,'2024-08-30 14:30:00.000000','2024-08-30 12:30:00.000000',2,1,1,1000,'ECONOMY'),(6,'2024-08-30 14:30:00.000000','2024-08-30 12:30:00.000000',1,2,2,1000,'ECONOMY');
/*!40000 ALTER TABLE `flight_schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `passenger`
--

DROP TABLE IF EXISTS `passenger`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `passenger` (
  `passenger_id` bigint NOT NULL AUTO_INCREMENT,
  `booking_id` varchar(255) DEFAULT NULL,
  `date_of_birth` datetime(6) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `is_primary_contact` bit(1) NOT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `nationality` varchar(255) DEFAULT NULL,
  `passport_expiry_date` datetime(6) DEFAULT NULL,
  `passport_issue_country` varchar(255) DEFAULT NULL,
  `passport_number` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`passenger_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `passenger`
--

LOCK TABLES `passenger` WRITE;
/*!40000 ALTER TABLE `passenger` DISABLE KEYS */;
INSERT INTO `passenger` VALUES (1,'BOOK474F4CF6','2024-08-19 00:00:00.000000','dfd@gmail.com','dfd','Mr',_binary '','dfd',NULL,'Thailand','2024-08-26 00:00:00.000000','Thailand','MG89388','3434343'),(2,'BOOK2A90FDC7','2024-08-20 00:00:00.000000','dfd@gmail.com','dfd','Mr',_binary '','dfd','dfd','Thailand','2024-08-01 00:00:00.000000','Thailand','fdf','3434343'),(3,'BOOK2A90FDC7','2024-08-26 00:00:00.000000',NULL,'Htoo Kyaw','Mrs',_binary '\0','Htoo Kyaw','Htoo Kyaw','Thailand','2024-08-28 00:00:00.000000','Thailand','MG78384',NULL),(4,'BOOK6ACD6482','2024-08-20 00:00:00.000000','dfd@gmail.com','dfd','Mr',_binary '','dfd','dfd','Thailand','2024-08-01 00:00:00.000000','Thailand','fdf','3434343'),(5,'BOOK6ACD6482','2024-08-26 00:00:00.000000',NULL,'Htoo Kyaw','Mrs',_binary '\0','Htoo Kyaw','Htoo Kyaw','Thailand','2024-08-28 00:00:00.000000','Thailand','MG78384',NULL),(6,'BOOK0F882F82','2024-08-13 00:00:00.000000','dfd@gmail.com','dfd','Mr',_binary '','dfd','dfd','Thailand','2024-08-26 00:00:00.000000','Thailand','fdf','3434343'),(7,'BOOKFEAC00AE','2024-08-26 00:00:00.000000','dfd@gmail.com','dfd','Mr',_binary '','dfd','dfd','Thailand','2024-08-26 00:00:00.000000','Thailand','e43','3434343'),(8,'BOOK495D60A6','2024-08-13 00:00:00.000000','dfd@gmail.com','dfd','Mr',_binary '','dfd','dfd','Thailand','2024-08-26 00:00:00.000000','Myanmar','fdf','3434343');
/*!40000 ALTER TABLE `passenger` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'hk@gmail.com','$2a$10$PKPOgqBDJOg39id423kmTe/S7IguIncOBJleGMbMwiKhXF9BPyUJG','ADMIN','hk123');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-25 23:24:18
