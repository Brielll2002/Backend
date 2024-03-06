CREATE DATABASE  IF NOT EXISTS `doubts2` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `doubts2`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: doubts2
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.28-MariaDB

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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `sobrenome` varchar(45) NOT NULL,
  `senha` varchar(10) NOT NULL,
  `amigos` int(11) DEFAULT NULL,
  `turno` varchar(10) NOT NULL,
  `matricula` varchar(8) NOT NULL,
  `data` date NOT NULL,
  `nome_curso` varchar(100) NOT NULL,
  `nome_unidade` varchar(100) NOT NULL,
  PRIMARY KEY (`id_user`),
  KEY `id_curso_idx` (`nome_curso`),
  KEY `id_unidade_idx` (`nome_unidade`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (12,'Gabriel','Rodriguess','Teste 2',NULL,'noite','12345678','2024-03-06','ADS','Paulista'),(13,'Gabriel2','Rodriguess','Teste 2',NULL,'noite','12345678','2024-03-06','ADS','Paulista'),(14,'Gabriel3','Rodriguess','Teste 2',NULL,'noite','12345678','2024-03-06','ADS','Paulista'),(15,'Gabriel3','Rodriguess1','Teste 2',NULL,'noite','12345678','2024-03-06','ADS','Paulista'),(16,'Gabriel3','Rodriguess12','Teste 2',NULL,'noite','12345678','2024-03-06','ADS','Paulista'),(17,'Gabriel3','Rodriguess123','Teste 2',NULL,'noite','12345678','2024-03-06','ADS','Paulista'),(18,'Gabriel34','Rodriguess123','Teste 2',NULL,'noite','12345678','2024-03-06','ADS','Paulista');
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

-- Dump completed on 2024-03-06 19:46:10
