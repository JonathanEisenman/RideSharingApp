-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: foxlift
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `receiverID` int NOT NULL,
  `senderID` int NOT NULL,
  `message` varchar(255) DEFAULT NULL,
  `messageDate` date DEFAULT NULL,
  PRIMARY KEY (`receiverID`,`senderID`),
  KEY `senderID` (`senderID`),
  CONSTRAINT `message_ibfk_1` FOREIGN KEY (`receiverID`) REFERENCES `users` (`uID`),
  CONSTRAINT `message_ibfk_2` FOREIGN KEY (`senderID`) REFERENCES `users` (`uID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (1919,9274,'\"I\'ve been waiting 5 minutes!\"','2022-09-05'),(1919,9293,'\"Hurry up, man!\"','2022-09-06'),(1919,9462,'\"Where you at bro?\"','2022-09-04'),(9274,2355,'\"I\'m almost there.\"','2022-09-04'),(9293,1919,'\"Pulling in now.\"','2022-09-05');
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rate`
--

DROP TABLE IF EXISTS `rate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rate` (
  `raterID` int NOT NULL,
  `ratedID` int NOT NULL,
  `rating` int DEFAULT NULL,
  PRIMARY KEY (`raterID`,`ratedID`),
  KEY `ratedID` (`ratedID`),
  CONSTRAINT `rate_ibfk_1` FOREIGN KEY (`raterID`) REFERENCES `users` (`uID`),
  CONSTRAINT `rate_ibfk_2` FOREIGN KEY (`ratedID`) REFERENCES `users` (`uID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rate`
--

LOCK TABLES `rate` WRITE;
/*!40000 ALTER TABLE `rate` DISABLE KEYS */;
INSERT INTO `rate` VALUES (9274,1919,1),(9274,2355,4),(9293,2355,2),(9462,1919,5),(9462,2355,3);
/*!40000 ALTER TABLE `rate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `reporterID` int NOT NULL,
  `reportedID` int NOT NULL,
  `report` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`reporterID`,`reportedID`),
  KEY `reportedID` (`reportedID`),
  CONSTRAINT `report_ibfk_1` FOREIGN KEY (`reporterID`) REFERENCES `users` (`uID`),
  CONSTRAINT `report_ibfk_2` FOREIGN KEY (`reportedID`) REFERENCES `users` (`uID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
INSERT INTO `report` VALUES (9274,1919,'\"He was rude the entire trip\"'),(9293,2355,'\"He arrived 5 minutes late\"'),(9462,2355,'\"I was scared to get in the car\"');
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `take`
--

DROP TABLE IF EXISTS `take`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `take` (
  `uID` int NOT NULL,
  `tID` int NOT NULL,
  `SeatsAvailable` int DEFAULT NULL,
  `UserRole` enum('Driver','Passenger','Shared Taxi') DEFAULT NULL,
  PRIMARY KEY (`uID`,`tID`),
  KEY `tID` (`tID`),
  CONSTRAINT `take_ibfk_1` FOREIGN KEY (`uID`) REFERENCES `users` (`uID`),
  CONSTRAINT `take_ibfk_2` FOREIGN KEY (`tID`) REFERENCES `trips` (`tID`),
  CONSTRAINT `take_ibfk_3` FOREIGN KEY (`tID`) REFERENCES `trips` (`tID`),
  CONSTRAINT `take_ibfk_4` FOREIGN KEY (`tID`) REFERENCES `trips` (`tID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `take`
--

LOCK TABLES `take` WRITE;
/*!40000 ALTER TABLE `take` DISABLE KEYS */;
INSERT INTO `take` VALUES (1919,1,3,'Driver'),(2355,2,2,'Driver'),(9274,1,3,'Passenger'),(9274,2,2,'Passenger'),(9293,3,4,'Shared Taxi'),(9462,3,3,'Shared Taxi');
/*!40000 ALTER TABLE `take` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trips`
--

DROP TABLE IF EXISTS `trips`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trips` (
  `tID` int NOT NULL,
  `type` enum('Ride Share','Taxi') DEFAULT NULL,
  `destination` varchar(255) DEFAULT NULL,
  `startLocation` varchar(255) DEFAULT NULL,
  `time` timestamp NULL DEFAULT NULL,
  `isCompleted` tinyint(1) DEFAULT NULL,
  `isCancelled` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`tID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trips`
--

LOCK TABLES `trips` WRITE;
/*!40000 ALTER TABLE `trips` DISABLE KEYS */;
INSERT INTO `trips` VALUES (1,'Ride Share','Target','Donnelly','2022-09-04 13:30:00',1,0),(2,'Taxi','Fox Run','Donnelly','2022-09-05 08:30:00',0,1),(3,'Ride Share','Hancock','North End','2022-09-06 12:30:00',0,0);
/*!40000 ALTER TABLE `trips` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `fName` varchar(255) DEFAULT NULL,
  `lName` varchar(255) DEFAULT NULL,
  `accountName` varchar(255) DEFAULT NULL,
  `isDriver` tinyint(1) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `uID` int NOT NULL,
  PRIMARY KEY (`uID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('Sean','Ginsberg','seanyg19',1,'sean.ginsberg1@marist.edu','gg123567',1919),('Jake','Vissicchio','jakev34',1,'jake.vissichio@marist.edu','poei245',2355),('Nick','Petrilli','nickp17',0,'nick.petrilli@marist.edu','iro224569',9274),('Jon','Eisenman','jone24',0,'jon.eisenman@marist.edu','wer24562',9293),('Anthony','Sasso','asass13',0,'anthony.sasso1@marist.edu','q21345',9462);
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

-- Dump completed on 2022-10-06 20:46:17
