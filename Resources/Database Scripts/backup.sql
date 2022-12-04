-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: foxlift
-- ------------------------------------------------------
-- Server version	8.0.21

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

--
-- Table structure for table `favorite`
--

DROP TABLE IF EXISTS `favorite`;

CREATE TABLE `favorite` (
  `uID` int NOT NULL,
  `location` varchar(255) NOT NULL,
  PRIMARY KEY (`uID`, `location`),
  CONSTRAINT `favorite_ibfk_1` FOREIGN KEY (`uID`) REFERENCES `users` (`uID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `favorite`
--

LOCK TABLES `favorite` WRITE;
INSERT INTO `favorite` VALUES (1,'Target, South Road, Poughkeepsie, NY, USA'),(2,'Taco Bell, Main Street, Poughkeepsie, NY, USA'),(3,'Marist College, North Road, Poughkeepsie, NY, USA'),(4,'Starbucks, South Road, Poughkeepsie, NY, USA');
UNLOCK TABLES;
--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `messageID` int NOT NULL AUTO_INCREMENT,
  `receiverID` int NOT NULL,
  `message` varchar(225) NOT NULL,
  `time` timestamp NOT NULL,
  `senderID` int NOT NULL,
  PRIMARY KEY (`messageID`),
  KEY `senderID_idx` (`senderID`),
  KEY `receiverID_idx` (`receiverID`),
  CONSTRAINT `receiverID` FOREIGN KEY (`receiverID`) REFERENCES `users` (`uID`),
  CONSTRAINT `senderID` FOREIGN KEY (`senderID`) REFERENCES `users` (`uID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (1,1,'Where you at bro?','2022-09-04 17:30:00',2),(2,1,'I\'ve been waiting 5 minutes!','2022-09-04 17:31:00',3),(3,3,'I\'m almost there.','2022-09-04 17:32:00',4),(4,5,'Pulling in now.','2022-09-04 17:33:00',1),(5,1,'Hurry up, man!','2022-09-04 17:34:00',5);
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rate`
--

DROP TABLE IF EXISTS `rate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rate` (
  `rateID` int NOT NULL AUTO_INCREMENT,
  `raterID` int NOT NULL,
  `ratedID` int NOT NULL,
  `rating` int DEFAULT NULL,
  PRIMARY KEY (`rateID`),
  KEY `raterID` (`raterID`),
  KEY `ratedID` (`ratedID`),
  CONSTRAINT `ratedID` FOREIGN KEY (`ratedID`) REFERENCES `users` (`uID`),
  CONSTRAINT `raterID` FOREIGN KEY (`raterID`) REFERENCES `users` (`uID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rate`
--

LOCK TABLES `rate` WRITE;
/*!40000 ALTER TABLE `rate` DISABLE KEYS */;
INSERT INTO `rate` VALUES (1,2,1,5),(2,3,4,4),(3,5,4,2),(4,2,4,3),(5,3,1,1);
/*!40000 ALTER TABLE `rate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `reportID` int NOT NULL AUTO_INCREMENT,
  `reporterID` int NOT NULL,
  `reportedID` int NOT NULL,
  `report` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`reportID`),
  KEY `reporterID` (`reporterID`),
  KEY `reportedID` (`reportedID`),
  CONSTRAINT `reportedID` FOREIGN KEY (`reportedID`) REFERENCES `users` (`uID`),
  CONSTRAINT `reporterID` FOREIGN KEY (`reporterID`) REFERENCES `users` (`uID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
INSERT INTO `report` VALUES (1,3,1,'\"He was rude the entire trip\"'),(2,5,4,'\"He arrived 5 minutes late\"'),(3,2,4,'\"I was scared to get in the car\"');
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
INSERT INTO `take` VALUES (1,1,'Driver'),(4,2,'Driver'),(3,1,'Passenger'),(3,2,'Passenger'),(5,3,'Shared Taxi'),(2,3,'Shared Taxi');
/*!40000 ALTER TABLE `take` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trips`
--

DROP TABLE IF EXISTS `trips`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trips` (
  `tID` int NOT NULL AUTO_INCREMENT,
  `type` enum('Ride Share','Taxi') DEFAULT NULL,
  `destination` varchar(255) DEFAULT NULL,
  `startLocation` varchar(255) DEFAULT NULL,
  `time` timestamp NULL DEFAULT NULL,
  `SeatsAvailable` int DEFAULT NULL,
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
INSERT INTO `trips` VALUES (1,'Ride Share','Target, South Road, Poughkeepsie, NY, USA','Marist College, North Road, Poughkeepsie, NY, USA','2022-09-04 17:30:00',4,1,0),(2,'Taxi','Taco Bell, Main Street, Poughkeepsie, NY, USA','Marist College, North Road, Poughkeepsie, NY, USA','2022-09-05 12:30:00',4,0,1),(3,'Ride Share','Starbucks, South Road, Poughkeepsie, NY, USA','Marist College, North Road, Poughkeepsie, NY, USA','2022-09-06 16:30:00',4,0,0);
/*!40000 ALTER TABLE `trips` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `name` varchar(255) DEFAULT NULL,
  `accountName` varchar(255) DEFAULT NULL,
  `isDriver` tinyint(1) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `uID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`uID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('Sean Ginsberg','seanyg19',1,'sean.ginsberg1@marist.edu',1),('Jake Vissicchio','jakev34',1,'jake.vissichio@marist.edu',4),('Nick Petrilli','nickp17',0,'nick.petrilli@marist.edu',3),('Jon Eisenman','jone24',0,'jon.eisenman@marist.edu',5),('Anthony Sasso','asass13',0,'anthony.sasso1@marist.edu',2);
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

-- Dump completed on 2022-10-26 15:45:33
