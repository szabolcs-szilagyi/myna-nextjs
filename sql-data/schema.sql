-- MariaDB dump 10.19  Distrib 10.5.9-MariaDB, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: myna_test
-- ------------------------------------------------------
-- Server version	5.7.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `address` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `type` tinyint(1) NOT NULL,
  `email` varchar(128) CHARACTER SET utf8 NOT NULL,
  `session_token` varchar(32) CHARACTER SET utf8 NOT NULL,
  `name` varchar(128) CHARACTER SET utf8 DEFAULT NULL,
  `address_line_1` varchar(128) CHARACTER SET utf8 NOT NULL,
  `address_line_2` varchar(128) CHARACTER SET utf8 NOT NULL,
  `city` varchar(128) CHARACTER SET utf8 NOT NULL,
  `state` varchar(128) CHARACTER SET utf8 NOT NULL,
  `zip` varchar(64) CHARACTER SET utf8 NOT NULL,
  `country` varchar(64) CHARACTER SET utf8 NOT NULL,
  `comment` varchar(256) CHARACTER SET utf8 NOT NULL,
  `mobile` varchar(24) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1972 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cart` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `idname` varchar(128) CHARACTER SET utf8 NOT NULL,
  `size` varchar(8) NOT NULL,
  `session_token` varchar(32) CHARACTER SET utf8 NOT NULL,
  `amount` tinyint(4) NOT NULL,
  `paid` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1634 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `currency`
--

DROP TABLE IF EXISTS `currency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `currency` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `active` varchar(8) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `login_token`
--

DROP TABLE IF EXISTS `login_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `login_token` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(128) CHARACTER SET utf8 NOT NULL,
  `login_token` varchar(32) CHARACTER SET utf8 NOT NULL,
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `newsletter`
--

DROP TABLE IF EXISTS `newsletter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `newsletter` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(128) CHARACTER SET utf8 NOT NULL,
  `token` varchar(32) CHARACTER SET utf8 NOT NULL,
  `subscribe_date` date NOT NULL,
  `enabled` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idname` varchar(128) CHARACTER SET utf8 NOT NULL,
  `availability` varchar(64) CHARACTER SET utf8 NOT NULL,
  `is_one_size` tinyint(1) NOT NULL DEFAULT '0',
  `productname` varchar(128) CHARACTER SET utf8 NOT NULL,
  `productcolor` varchar(128) CHARACTER SET utf8 NOT NULL,
  `productprice` smallint(6) NOT NULL,
  `desclong` varchar(2048) CHARACTER SET utf8 NOT NULL,
  `comp_care` varchar(2048) CHARACTER SET utf8 NOT NULL,
  `pic1` varchar(256) CHARACTER SET utf8 DEFAULT NULL,
  `pic2` varchar(256) CHARACTER SET utf8 DEFAULT NULL,
  `pic3` varchar(256) CHARACTER SET utf8 DEFAULT NULL,
  `pic4` varchar(256) CHARACTER SET utf8 DEFAULT NULL,
  `pic5` varchar(256) CHARACTER SET utf8 DEFAULT NULL,
  `pic6` varchar(256) CHARACTER SET utf8 DEFAULT NULL,
  `pic7` varchar(256) CHARACTER SET utf8 DEFAULT NULL,
  `pic8` varchar(256) CHARACTER SET utf8 DEFAULT NULL,
  `pic9` varchar(256) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=247 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `purchased`
--

DROP TABLE IF EXISTS `purchased`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `purchased` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(128) CHARACTER SET utf8 NOT NULL,
  `session_token` varchar(32) CHARACTER SET utf8 NOT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `session_token`
--

DROP TABLE IF EXISTS `session_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `session_token` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(128) CHARACTER SET utf8 NOT NULL,
  `session_token` varchar(32) CHARACTER SET utf8 NOT NULL,
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2675 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `stock`
--

DROP TABLE IF EXISTS `stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stock` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idname` varchar(128) CHARACTER SET utf8 NOT NULL,
  `xs` int(11) DEFAULT '0',
  `s` int(11) DEFAULT '0',
  `m` int(11) DEFAULT '0',
  `ml` int(11) DEFAULT '0',
  `l` int(11) DEFAULT '0',
  `one_size` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idname` (`idname`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(128) CHARACTER SET utf8 NOT NULL,
  `firstname` varchar(128) CHARACTER SET utf8 NOT NULL,
  `lastname` varchar(128) CHARACTER SET utf8 NOT NULL,
  `lastlogin` datetime NOT NULL,
  `birthday` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-24 14:12:45
