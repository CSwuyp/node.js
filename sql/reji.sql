-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: localhost    Database: reji
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `arrowskull`
--

DROP TABLE IF EXISTS `arrowskull`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `arrowskull` (
  `level` int(11) NOT NULL,
  `hp` int(11) NOT NULL,
  `damage` int(11) NOT NULL,
  PRIMARY KEY (`level`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `arrowskull`
--

LOCK TABLES `arrowskull` WRITE;
/*!40000 ALTER TABLE `arrowskull` DISABLE KEYS */;
INSERT INTO `arrowskull` VALUES (1,50,4);
/*!40000 ALTER TABLE `arrowskull` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `award_level`
--

DROP TABLE IF EXISTS `award_level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `award_level` (
  `account` char(50) DEFAULT NULL,
  `level_id` int(11) DEFAULT NULL,
  `star` int(11) DEFAULT NULL,
  `award_star6` int(11) DEFAULT NULL,
  `award_star9` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `award_level`
--

LOCK TABLES `award_level` WRITE;
/*!40000 ALTER TABLE `award_level` DISABLE KEYS */;
INSERT INTO `award_level` VALUES ('13295286628',1,8,0,0),('13118834595',1,8,0,0),('13295286628',2,3,0,0),('13118834595',3,3,0,0),('18392886571',1,9,0,0),('18392886571',2,3,0,0),('17620754310',1,9,0,0),('13631432614',1,9,0,0),('13122222222',1,3,0,0),('17777777777',1,3,0,0),('16666666666',1,3,0,0),('15622184887',1,3,0,0),('18192027861',1,9,0,0),('18192027861',2,9,0,0);
/*!40000 ALTER TABLE `award_level` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bag`
--

DROP TABLE IF EXISTS `bag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `bag` (
  `account` varchar(50) NOT NULL,
  `goods_id` int(11) NOT NULL,
  `goods_count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bag`
--

LOCK TABLES `bag` WRITE;
/*!40000 ALTER TABLE `bag` DISABLE KEYS */;
INSERT INTO `bag` VALUES ('15622184887',342,0),('15622184887',666,0),('15622184887',3,0);
/*!40000 ALTER TABLE `bag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `level_monster`
--

DROP TABLE IF EXISTS `level_monster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `level_monster` (
  `level_id` int(11) DEFAULT NULL,
  `monster_id` int(11) DEFAULT NULL,
  `count` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `level_monster`
--

LOCK TABLES `level_monster` WRITE;
/*!40000 ALTER TABLE `level_monster` DISABLE KEYS */;
INSERT INTO `level_monster` VALUES (101,1,2),(101,2,1),(101,3,1);
/*!40000 ALTER TABLE `level_monster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `map_monsters`
--

DROP TABLE IF EXISTS `map_monsters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `map_monsters` (
  `monster_no` int(11) NOT NULL,
  `monster_id` int(11) NOT NULL,
  `monster_level` int(11) NOT NULL,
  `region` int(11) NOT NULL,
  `monster_x` int(11) NOT NULL,
  `monster_y` int(11) NOT NULL,
  `time_offset` int(11) NOT NULL,
  PRIMARY KEY (`monster_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `map_monsters`
--

LOCK TABLES `map_monsters` WRITE;
/*!40000 ALTER TABLE `map_monsters` DISABLE KEYS */;
/*!40000 ALTER TABLE `map_monsters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `map_regions`
--

DROP TABLE IF EXISTS `map_regions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `map_regions` (
  `map_id` int(11) NOT NULL,
  `region_num` int(11) NOT NULL,
  `region1_trigger` int(11) NOT NULL,
  `region1_left` int(11) NOT NULL,
  `region1_right` int(11) NOT NULL,
  `region2_trigger` int(11) NOT NULL,
  `region2_left` int(11) NOT NULL,
  `region2_right` int(11) NOT NULL,
  `region3_trigger` int(11) NOT NULL,
  `regio3_left` int(11) NOT NULL,
  `region3_right` int(11) NOT NULL,
  `region4_trigger` int(11) NOT NULL,
  `regio4_left` int(11) NOT NULL,
  `region4_right` int(11) NOT NULL,
  PRIMARY KEY (`map_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `map_regions`
--

LOCK TABLES `map_regions` WRITE;
/*!40000 ALTER TABLE `map_regions` DISABLE KEYS */;
/*!40000 ALTER TABLE `map_regions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `monsters`
--

DROP TABLE IF EXISTS `monsters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `monsters` (
  `monster_name` int(11) NOT NULL,
  `monster_name_cn` int(11) NOT NULL,
  `monster_id` int(11) NOT NULL,
  `attack_style` int(11) NOT NULL,
  `attack_range` int(11) NOT NULL,
  `flight_speed` int(11) NOT NULL,
  `behit_range` int(11) NOT NULL,
  `attack_pre` int(11) NOT NULL,
  `attack_after` int(11) NOT NULL,
  `attack_aniid` int(11) NOT NULL,
  `behit_aniid` int(11) NOT NULL,
  `standby_annid` int(11) NOT NULL,
  `walk_aniid` int(11) NOT NULL,
  `die_annid` int(11) NOT NULL,
  PRIMARY KEY (`monster_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monsters`
--

LOCK TABLES `monsters` WRITE;
/*!40000 ALTER TABLE `monsters` DISABLE KEYS */;
/*!40000 ALTER TABLE `monsters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `role` (
  `role_id` int(11) NOT NULL,
  `role_name` text NOT NULL,
  `attack_id` int(11) NOT NULL,
  `skill1_id` int(11) NOT NULL,
  `skill2_id` int(11) NOT NULL,
  `skill_3_id` int(11) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'薇薇安',101,102,103,104),(2,'美杜莎',201,202,203,204),(3,'莉可丽丝',301,302,303,304);
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_levels`
--

DROP TABLE IF EXISTS `role_levels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `role_levels` (
  `role_id` int(11) NOT NULL,
  `role_grade` int(11) NOT NULL,
  `role_exp` int(11) NOT NULL,
  `hp` int(11) NOT NULL,
  `damage` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_levels`
--

LOCK TABLES `role_levels` WRITE;
/*!40000 ALTER TABLE `role_levels` DISABLE KEYS */;
INSERT INTO `role_levels` VALUES (1,1,0,200,95),(1,2,300,400,195),(1,3,900,800,395),(1,4,2700,1200,555),(1,5,6500,1600,855),(1,6,14000,2000,955),(1,7,23000,2300,1155),(1,8,34000,2600,1295),(1,9,48000,2900,1455),(1,10,64000,3200,1595),(1,11,85000,3500,1755),(1,12,100000,3800,1895),(1,13,120000,4100,2055),(1,14,140000,4400,2195),(1,15,165000,4700,2355),(1,16,195000,5000,2495),(1,17,225000,5200,2655),(1,18,265000,5400,2795),(1,19,305000,5600,2955),(1,20,355000,5800,3095),(2,1,0,250,80),(2,2,300,500,180),(2,3,900,1000,360),(2,4,2700,1500,540),(2,5,6500,1900,600),(2,6,14000,2200,720),(2,7,23000,2550,840),(2,8,34000,2900,960),(2,9,48000,3250,1080),(2,10,64000,3600,1200),(2,11,85000,3950,1320),(2,12,100000,4300,1440),(2,13,120000,4750,1560),(2,14,140000,5100,1680),(2,15,165000,5450,1800),(2,16,195000,5800,1920),(2,17,225000,6150,2040),(2,18,265000,6500,2160),(2,19,305000,6850,2280),(2,20,355000,7200,2400),(3,1,0,150,130),(3,2,300,300,250),(3,3,900,600,500),(3,4,2700,1000,800),(3,5,6500,1300,1050),(3,6,14000,1550,1250),(3,7,23000,1800,1440),(3,8,34000,2050,1630),(3,9,48000,2250,1820),(3,10,64000,2450,2010),(3,11,85000,2650,2200),(3,12,100000,2850,2390),(3,13,120000,3050,2580),(3,14,140000,3250,2770),(3,15,165000,3450,2960),(3,16,195000,3650,3150),(3,17,225000,3850,3340),(3,18,265000,4050,3530),(3,19,305000,4250,3720),(3,20,355000,4450,3910),(4,1,0,190,105),(4,2,300,380,210),(4,3,900,780,410),(4,4,2700,1160,570),(4,5,6500,1480,890),(4,6,14000,1900,995),(4,7,23000,2150,1250),(4,8,34000,2430,1450),(4,9,48000,2710,1650),(4,10,64000,2990,1750),(4,11,85000,3270,1950),(4,12,100000,3550,2090),(4,13,120000,3830,2230),(4,14,140000,4110,2370),(4,15,165000,4390,2510),(4,16,195000,4670,2650),(4,17,225000,4850,2790),(4,18,265000,5030,2930),(4,19,305000,5210,3070),(4,20,355000,5390,3210),(1,21,9999999,99999,99999),(2,21,9999999,99999,99999),(3,21,9999999,99999,99999),(4,21,9999999,99999,99999);
/*!40000 ALTER TABLE `role_levels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skill`
--

DROP TABLE IF EXISTS `skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `skill` (
  `skill_id` int(11) NOT NULL,
  `skill_name` text,
  `skill_cooldown` int(11) DEFAULT NULL,
  `skill_damage` int(11) DEFAULT NULL,
  PRIMARY KEY (`skill_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skill`
--

LOCK TABLES `skill` WRITE;
/*!40000 ALTER TABLE `skill` DISABLE KEYS */;
INSERT INTO `skill` VALUES (101,'薇薇安普通攻击',0,NULL);
/*!40000 ALTER TABLE `skill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skill_art`
--

DROP TABLE IF EXISTS `skill_art`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `skill_art` (
  `stage_id` int(11) DEFAULT NULL,
  `skill_aniid` int(11) DEFAULT NULL,
  `skill_sound` int(11) DEFAULT NULL,
  `hit_sound` int(11) DEFAULT NULL,
  `hit_visual` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skill_art`
--

LOCK TABLES `skill_art` WRITE;
/*!40000 ALTER TABLE `skill_art` DISABLE KEYS */;
/*!40000 ALTER TABLE `skill_art` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stage`
--

DROP TABLE IF EXISTS `stage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `stage` (
  `stage_id` int(11) DEFAULT NULL,
  `range_x1` int(11) DEFAULT NULL,
  `range_x2` int(11) DEFAULT NULL,
  `range_y1` int(11) DEFAULT NULL,
  `range_y2` int(11) DEFAULT NULL,
  `pre_end` int(11) DEFAULT NULL,
  `deter_end` int(11) DEFAULT NULL,
  `after_end` int(11) DEFAULT NULL,
  `repel_distance` int(11) DEFAULT NULL,
  `pre_interrupt` int(11) DEFAULT NULL,
  `cancel_pre` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stage`
--

LOCK TABLES `stage` WRITE;
/*!40000 ALTER TABLE `stage` DISABLE KEYS */;
/*!40000 ALTER TABLE `stage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `start_levels`
--

DROP TABLE IF EXISTS `start_levels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `start_levels` (
  `start_level` int(11) NOT NULL,
  `star_material` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `start_levels`
--

LOCK TABLES `start_levels` WRITE;
/*!40000 ALTER TABLE `start_levels` DISABLE KEYS */;
INSERT INTO `start_levels` VALUES (1,0),(2,20),(3,40),(4,80),(5,160);
/*!40000 ALTER TABLE `start_levels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `account` char(20) NOT NULL,
  `name` text,
  `UserIp` char(50) NOT NULL,
  `LoginTime` char(50) NOT NULL,
  `SocketId` char(50) NOT NULL,
  `grade` int(11) unsigned DEFAULT NULL,
  `coin` int(11) unsigned DEFAULT NULL,
  `exp_now` int(11) unsigned DEFAULT NULL,
  `hero1` int(11) DEFAULT NULL,
  `hero2` int(11) DEFAULT NULL,
  `hero3` int(11) DEFAULT NULL,
  `cheat` int(11) unsigned DEFAULT NULL,
  `OnlineTime` char(50) DEFAULT NULL,
  PRIMARY KEY (`account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('13025333333','wuyepeng','19216854177','2019-1-16 22:48:56','SS9B3SjIFmnRBYSPAACI',0,0,0,1,2,3,0,'0.4165161111111111'),('13122222222','wuyepeng','19216835197','2019-1-17 10:50:47','EYw1rKb8W4xy9FLRAAEX',0,0,0,1,2,3,0,'0.5573897222222222'),('13295286628','薇薇安','19216855206','2019-1-17 10:56:17','Z4zpOEobZj5WIXsbAAEj',0,0,0,1,2,3,0,'0.20642999999999997'),('13631432614','wuyepeng','1921685323','2019-1-17 10:56:38','6VHW0ibScbVEO2SSAAEk',0,0,0,1,2,4,0,'0.3883138888888889'),('15622184887','','19216835182','2019-1-17 09:34:20','iPU9lHUpsNvXoMwiAAD1',0,0,0,4,2,3,0,'0.13400388888888887'),('16666666666','wuyepeng','19216835221','2019-1-16 22:08:36','Ic5aeqUA0_Fz4Cz4AABw',0,0,0,1,2,3,0,'0.05196138888888889'),('17620754310','wuyepeng','1921685944','2019-1-16 21:42:07','AZS85_yvPQwxhM5MAABX',0,0,0,1,2,3,0,'0.2983422222222222'),('18192027861','顶呱呱','19216855130','2019-1-17 10:56:28','x71LSqfQQeUmfkz2AAEi',0,0,0,1,2,4,0,'0.30200722222222226'),('18392886571','wuyepeng','19216857170','2019-1-16 21:04:55','YY_E2Wo7s-hrXb7sAAA6',0,0,0,1,2,3,0,'0.2814197222222222'),('18820790619','','19216850206','2019-1-17 09:52:35','SBeDZD8l2zQqaIXuAAD5',0,0,0,1,2,3,0,'0.012601944444444445'),('18888888888','wuyepeng','19216858112','2019-1-16 21:58:17','-lfX2AQ23lJpvosQAABo',0,0,0,1,2,3,0,'0.022303333333333335');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_level`
--

DROP TABLE IF EXISTS `user_level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_level` (
  `account` char(50) NOT NULL,
  `level_id` char(50) NOT NULL,
  `star` int(11) NOT NULL,
  `star1` int(11) DEFAULT NULL,
  `star2` int(11) DEFAULT NULL,
  `star3` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_level`
--

LOCK TABLES `user_level` WRITE;
/*!40000 ALTER TABLE `user_level` DISABLE KEYS */;
INSERT INTO `user_level` VALUES ('11','1_1',3,NULL,NULL,NULL),('11','1_2',3,NULL,NULL,NULL),('13295286628','1_1',3,1,1,1),('13295286628','1_2',3,1,1,1),('13295286628','2_2',2,1,0,1),('13118834595','1_1',3,1,0,1),('13118834595','1_3',2,1,0,1),('13295286628','2_1',3,1,1,1),('13118834595','3_1',3,1,1,1),('13295286628','1_3',2,1,0,1),('18392886571','1_1',3,1,1,1),('18392886571','1_3',3,1,1,1),('13118834595','1_2',3,1,1,1),('18392886571','1_2',3,1,1,1),('18392886571','2_1',3,1,1,1),('17620754310','1_1',3,1,1,1),('17620754310','1_2',3,1,1,1),('17620754310','1_3',3,1,1,1),('13631432614','1_1',3,1,1,1),('13631432614','1_2',3,1,1,1),('13631432614','1_3',3,1,1,1),('13122222222','1_1',3,1,1,1),('17777777777','1_1',3,1,1,1),('16666666666','1_1',3,1,1,1),('15622184887','1_1',3,1,0,1),('18192027861','1_1',3,1,1,1),('18192027861','1_2',3,1,1,1),('18192027861','1_3',3,1,1,1),('18192027861','2_1',3,1,1,1),('18192027861','2_2',3,1,1,1),('18192027861','2_3',3,1,1,1);
/*!40000 ALTER TABLE `user_level` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_roles`
--

DROP TABLE IF EXISTS `users_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users_roles` (
  `account` char(50) NOT NULL,
  `role_id` int(11) NOT NULL,
  `role_grade` int(11) NOT NULL,
  `role_exp` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_roles`
--

LOCK TABLES `users_roles` WRITE;
/*!40000 ALTER TABLE `users_roles` DISABLE KEYS */;
INSERT INTO `users_roles` VALUES ('15622184887',1,15,165600),('15622184887',2,15,166100),('15622184887',3,15,166100),('13295286628',1,4,6000),('13295286628',2,4,6000),('13295286628',3,4,6000),('18392886571',1,5,10400),('18392886571',2,5,10400),('18392886571',3,5,10400),('13118834595',1,3,1200),('13118834595',2,5,6500),('13118834595',3,5,6500),('13631432614',1,5,10600),('13631432614',2,5,10600),('13631432614',3,5,10600),('15524020196',1,1,0),('15524020196',2,1,0),('15524020196',3,1,0),('15622184887',4,15,165500),('13118834595',4,4,5300),('13295286628',4,1,0),('18392886571',4,1,0),('17620754310',1,5,8200),('17620754310',2,5,8200),('17620754310',3,5,8200),('13025333333',1,1,0),('13025333333',2,1,0),('13025333333',3,1,0),('17620754310',4,1,0),('18888888888',1,1,0),('18888888888',2,1,0),('18888888888',3,1,0),('13122222222',1,3,900),('13122222222',2,3,900),('13122222222',3,3,900),('13631432614',4,1,0),('17777777777',1,3,900),('17777777777',2,3,900),('17777777777',3,3,900),('16666666666',1,3,900),('16666666666',2,3,900),('16666666666',3,3,900),('18820790619',1,1,0),('18820790619',2,1,0),('18820790619',3,1,0),('18192027861',1,9,51700),('18192027861',2,9,51700),('18192027861',3,5,8200),('18192027861',4,8,43500);
/*!40000 ALTER TABLE `users_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `weapon`
--

DROP TABLE IF EXISTS `weapon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `weapon` (
  `weapon_id` int(11) NOT NULL,
  `weapon_name` text NOT NULL,
  `weapon_grade` text NOT NULL,
  `weapon_hurt` int(11) NOT NULL,
  `weapon_leve` int(11) NOT NULL,
  `weapon_price` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weapon`
--

LOCK TABLES `weapon` WRITE;
/*!40000 ALTER TABLE `weapon` DISABLE KEYS */;
INSERT INTO `weapon` VALUES (101,'木枝','蓝',0,1,NULL),(102,'木棍','紫',0,1,NULL),(103,'木剑','橙',0,1,NULL),(301,'石刀','蓝',0,3,NULL),(302,'石剑','紫',0,3,NULL),(303,'巨石剑','橙',0,3,NULL),(501,'铁棒','蓝',0,5,NULL),(502,'简陋的铁棒','紫',0,5,NULL),(503,'迟钝的铁剑','橙',0,5,NULL),(701,'锋利小刀','蓝',0,7,NULL),(702,'匕首','紫',0,7,NULL),(703,'三刃匕首','橙',0,7,NULL),(1001,'短剑','蓝',0,10,NULL),(1002,'骑士剑','紫',0,10,NULL),(1003,'十字剑','紫',0,10,NULL),(1301,'阔剑','蓝',0,13,NULL),(1302,'双手大剑','紫',0,13,NULL),(1303,'战锤','橙',0,13,NULL),(1501,'三叉戟','蓝',0,15,NULL),(1502,'冈格尼尔','紫',0,15,NULL),(1503,'王者之剑','橙',0,15,NULL),(1801,'风之力','蓝',0,18,NULL),(1802,'传古链枷','紫',0,18,NULL),(1803,'死亡惩罚','橙',1,18,NULL),(2001,'混沌之刃','蓝',1,20,NULL),(2002,'霜之哀伤','紫',1,20,NULL),(2003,'芬里尔','橙',1,20,NULL);
/*!40000 ALTER TABLE `weapon` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-01-17 11:01:08
