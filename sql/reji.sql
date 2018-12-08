-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        8.0.13 - MySQL Community Server - GPL
-- 服务器操作系统:                      Win64
-- HeidiSQL 版本:                  9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- 导出 reji 的数据库结构
CREATE DATABASE IF NOT EXISTS `reji` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `reji`;

-- 导出  表 reji.role 结构
CREATE TABLE IF NOT EXISTS `role` (
  `role_id` int(11) NOT NULL,
  `role_name` char(50) NOT NULL,
  `attack_id` int(11) NOT NULL,
  `skill1_id` int(11) NOT NULL,
  `skill2_id` int(11) NOT NULL,
  `skill_3_id` int(11) NOT NULL,
  `portrait_id` int(11) NOT NULL,
  `paint_id` int(11) NOT NULL,
  `walk_aniid` int(11) NOT NULL,
  `wait_aniid` int(11) NOT NULL,
  `struck_aniid` int(11) NOT NULL,
  `die_aniid` int(11) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 正在导出表  reji.role 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
/*!40000 ALTER TABLE `role` ENABLE KEYS */;

-- 导出  表 reji.role_levels 结构
CREATE TABLE IF NOT EXISTS `role_levels` (
  `role_level` int(11) NOT NULL,
  `role_grade` int(11) NOT NULL,
  `role_exp` int(11) NOT NULL,
  `hp` int(11) NOT NULL,
  `hurt` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 正在导出表  reji.role_levels 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `role_levels` DISABLE KEYS */;
/*!40000 ALTER TABLE `role_levels` ENABLE KEYS */;

-- 导出  表 reji.skill 结构
CREATE TABLE IF NOT EXISTS `skill` (
  `skill_id` int(11) NOT NULL,
  `skill_name` char(50) NOT NULL,
  `skill1_hurt` int(11) NOT NULL,
  `skill1_aniid` int(11) NOT NULL,
  `skill1_range` int(11) NOT NULL,
  `skill2_hurt` int(11) NOT NULL,
  `skill2_aniid` int(11) NOT NULL,
  `skill2_range` int(11) NOT NULL,
  `skill3_hurt` int(11) NOT NULL,
  `skill3_aniid` int(11) NOT NULL,
  `skill3_range` int(11) NOT NULL,
  PRIMARY KEY (`skill_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 正在导出表  reji.skill 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `skill` DISABLE KEYS */;
/*!40000 ALTER TABLE `skill` ENABLE KEYS */;

-- 导出  表 reji.start_levels 结构
CREATE TABLE IF NOT EXISTS `start_levels` (
  `start_level` int(11) NOT NULL,
  `star_material` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 正在导出表  reji.start_levels 的数据：~4 rows (大约)
/*!40000 ALTER TABLE `start_levels` DISABLE KEYS */;
REPLACE INTO `start_levels` (`start_level`, `star_material`) VALUES
	(1, 0),
	(2, 20),
	(3, 40),
	(4, 80),
	(5, 160);
/*!40000 ALTER TABLE `start_levels` ENABLE KEYS */;

-- 导出  表 reji.user 结构
CREATE TABLE IF NOT EXISTS `user` (
  `account` int(16) NOT NULL,
  `password` text NOT NULL,
  `name` text NOT NULL,
  PRIMARY KEY (`account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 正在导出表  reji.user 的数据：~1 rows (大约)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
REPLACE INTO `user` (`account`, `password`, `name`) VALUES
	(121, '1222', ''),
	(1111, '111', '132'),
	(1567, '123456', ''),
	(5555, '555', '55'),
	(12345, '12345', 'wu'),
	(1870096555, '1234', '');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

-- 导出  表 reji.users_roles 结构
CREATE TABLE IF NOT EXISTS `users_roles` (
  `account` int(16) NOT NULL,
  `role_id` int(11) NOT NULL,
  `role_grade` int(11) NOT NULL,
  `role_level` int(11) NOT NULL,
  `breakthrough_level` int(11) NOT NULL,
  `hp` int(11) NOT NULL,
  `hurt` int(11) NOT NULL,
  `weapon_id` int(11) NOT NULL,
  `weapon_level` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 正在导出表  reji.users_roles 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `users_roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_roles` ENABLE KEYS */;

-- 导出  表 reji.weapon_levels 结构
CREATE TABLE IF NOT EXISTS `weapon_levels` (
  `weapon_id` int(11) NOT NULL,
  `weapon_hurt` int(11) NOT NULL,
  `weapon_grade` int(11) NOT NULL,
  `weapon_name` char(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 正在导出表  reji.weapon_levels 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `weapon_levels` DISABLE KEYS */;
/*!40000 ALTER TABLE `weapon_levels` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
