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

-- 导出  表 reji.arrowskull 结构
CREATE TABLE IF NOT EXISTS `arrowskull` (
  `level` int(11) NOT NULL,
  `hp` int(11) NOT NULL,
  `damage` int(11) NOT NULL,
  PRIMARY KEY (`level`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 正在导出表  reji.arrowskull 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `arrowskull` DISABLE KEYS */;
REPLACE INTO `arrowskull` (`level`, `hp`, `damage`) VALUES
	(1, 50, 4);
/*!40000 ALTER TABLE `arrowskull` ENABLE KEYS */;

-- 导出  表 reji.award_level 结构
CREATE TABLE IF NOT EXISTS `award_level` (
  `account` int(11) DEFAULT NULL,
  `level_id` int(11) DEFAULT NULL,
  `star` int(11) DEFAULT NULL,
  `award_star6` int(11) DEFAULT NULL,
  `award_star9` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 正在导出表  reji.award_level 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `award_level` DISABLE KEYS */;
/*!40000 ALTER TABLE `award_level` ENABLE KEYS */;

-- 导出  表 reji.bag 结构
CREATE TABLE IF NOT EXISTS `bag` (
  `account` varchar(50) NOT NULL,
  `goods_id` int(11) NOT NULL,
  `goods_count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 正在导出表  reji.bag 的数据：~3 rows (大约)
/*!40000 ALTER TABLE `bag` DISABLE KEYS */;
REPLACE INTO `bag` (`account`, `goods_id`, `goods_count`) VALUES
	('15622184887', 342, 0),
	('15622184887', 666, 0),
	('15622184887', 3, 0);
/*!40000 ALTER TABLE `bag` ENABLE KEYS */;

-- 导出  表 reji.level_monster 结构
CREATE TABLE IF NOT EXISTS `level_monster` (
  `level_id` int(11) DEFAULT NULL,
  `monster_id` int(11) DEFAULT NULL,
  `count` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 正在导出表  reji.level_monster 的数据：~2 rows (大约)
/*!40000 ALTER TABLE `level_monster` DISABLE KEYS */;
REPLACE INTO `level_monster` (`level_id`, `monster_id`, `count`) VALUES
	(101, 1, 2),
	(101, 2, 1),
	(101, 3, 1);
/*!40000 ALTER TABLE `level_monster` ENABLE KEYS */;

-- 导出  表 reji.map_monsters 结构
CREATE TABLE IF NOT EXISTS `map_monsters` (
  `monster_no` int(11) NOT NULL,
  `monster_id` int(11) NOT NULL,
  `monster_level` int(11) NOT NULL,
  `region` int(11) NOT NULL,
  `monster_x` int(11) NOT NULL,
  `monster_y` int(11) NOT NULL,
  `time_offset` int(11) NOT NULL,
  PRIMARY KEY (`monster_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 正在导出表  reji.map_monsters 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `map_monsters` DISABLE KEYS */;
/*!40000 ALTER TABLE `map_monsters` ENABLE KEYS */;

-- 导出  表 reji.map_regions 结构
CREATE TABLE IF NOT EXISTS `map_regions` (
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

-- 正在导出表  reji.map_regions 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `map_regions` DISABLE KEYS */;
/*!40000 ALTER TABLE `map_regions` ENABLE KEYS */;

-- 导出  表 reji.monsters 结构
CREATE TABLE IF NOT EXISTS `monsters` (
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

-- 正在导出表  reji.monsters 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `monsters` DISABLE KEYS */;
/*!40000 ALTER TABLE `monsters` ENABLE KEYS */;

-- 导出  表 reji.role 结构
CREATE TABLE IF NOT EXISTS `role` (
  `role_id` int(11) NOT NULL,
  `role_name` text NOT NULL,
  `attack_id` int(11) NOT NULL,
  `skill1_id` int(11) NOT NULL,
  `skill2_id` int(11) NOT NULL,
  `skill_3_id` int(11) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 正在导出表  reji.role 的数据：~3 rows (大约)
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
REPLACE INTO `role` (`role_id`, `role_name`, `attack_id`, `skill1_id`, `skill2_id`, `skill_3_id`) VALUES
	(1, '薇薇安', 101, 102, 103, 104),
	(2, '美杜莎', 201, 202, 203, 204),
	(3, '莉可丽丝', 301, 302, 303, 304);
/*!40000 ALTER TABLE `role` ENABLE KEYS */;

-- 导出  表 reji.role_levels 结构
CREATE TABLE IF NOT EXISTS `role_levels` (
  `role_id` int(11) NOT NULL,
  `role_grade` int(11) NOT NULL,
  `role_exp` int(11) NOT NULL,
  `hp` int(11) NOT NULL,
  `damage` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 正在导出表  reji.role_levels 的数据：~58 rows (大约)
/*!40000 ALTER TABLE `role_levels` DISABLE KEYS */;
REPLACE INTO `role_levels` (`role_id`, `role_grade`, `role_exp`, `hp`, `damage`) VALUES
	(1, 1, 0, 200, 95),
	(1, 2, 300, 400, 195),
	(1, 3, 900, 800, 395),
	(1, 4, 2700, 1200, 555),
	(1, 5, 6500, 1600, 855),
	(1, 6, 14000, 2000, 955),
	(1, 7, 23000, 2300, 1155),
	(1, 8, 34000, 2600, 1295),
	(1, 9, 48000, 2900, 1455),
	(1, 10, 64000, 3200, 1595),
	(1, 11, 85000, 3500, 1755),
	(1, 12, 100000, 3800, 1895),
	(1, 13, 120000, 4100, 2055),
	(1, 14, 140000, 4400, 2195),
	(1, 15, 165000, 4700, 2355),
	(1, 16, 195000, 5000, 2495),
	(1, 17, 225000, 5200, 2655),
	(1, 18, 265000, 5400, 2795),
	(1, 19, 305000, 5600, 2955),
	(1, 20, 355000, 5800, 3095),
	(2, 1, 0, 250, 80),
	(2, 2, 300, 500, 180),
	(2, 3, 900, 1000, 360),
	(2, 4, 2700, 1500, 540),
	(2, 5, 6500, 1900, 600),
	(2, 6, 14000, 2200, 720),
	(2, 7, 23000, 2550, 840),
	(2, 8, 34000, 2900, 960),
	(2, 9, 48000, 3250, 1080),
	(2, 10, 64000, 3600, 1200),
	(2, 11, 85000, 3950, 1320),
	(2, 12, 100000, 4300, 1440),
	(2, 13, 120000, 4750, 1560),
	(2, 14, 140000, 5100, 1680),
	(2, 15, 165000, 5450, 1800),
	(2, 16, 195000, 5800, 1920),
	(2, 17, 225000, 6150, 2040),
	(2, 18, 265000, 6500, 2160),
	(2, 19, 305000, 6850, 2280),
	(2, 20, 355000, 7200, 2400),
	(3, 1, 0, 150, 130),
	(3, 2, 300, 300, 250),
	(3, 3, 900, 600, 500),
	(3, 4, 2700, 1000, 800),
	(3, 5, 6500, 1300, 1050),
	(3, 6, 14000, 1550, 1250),
	(3, 7, 23000, 1800, 1440),
	(3, 8, 34000, 2050, 1630),
	(3, 9, 48000, 2250, 1820),
	(3, 10, 64000, 2450, 2010),
	(3, 11, 85000, 2650, 2200),
	(3, 12, 100000, 2850, 2390),
	(3, 13, 120000, 3050, 2580),
	(3, 14, 140000, 3250, 2770),
	(3, 15, 165000, 3450, 2960),
	(3, 16, 195000, 3650, 3150),
	(3, 17, 225000, 3850, 3340),
	(3, 18, 265000, 4050, 3530),
	(3, 19, 305000, 4250, 3720),
	(3, 20, 355000, 4450, 3910);
/*!40000 ALTER TABLE `role_levels` ENABLE KEYS */;

-- 导出  表 reji.skill 结构
CREATE TABLE IF NOT EXISTS `skill` (
  `skill_id` int(11) NOT NULL,
  `skill_name` text,
  `skill_cooldown` int(11) DEFAULT NULL,
  `skill_damage` int(11) DEFAULT NULL,
  PRIMARY KEY (`skill_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 正在导出表  reji.skill 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `skill` DISABLE KEYS */;
REPLACE INTO `skill` (`skill_id`, `skill_name`, `skill_cooldown`, `skill_damage`) VALUES
	(101, '薇薇安普通攻击', 0, NULL);
/*!40000 ALTER TABLE `skill` ENABLE KEYS */;

-- 导出  表 reji.skill_art 结构
CREATE TABLE IF NOT EXISTS `skill_art` (
  `stage_id` int(11) DEFAULT NULL,
  `skill_aniid` int(11) DEFAULT NULL,
  `skill_sound` int(11) DEFAULT NULL,
  `hit_sound` int(11) DEFAULT NULL,
  `hit_visual` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 正在导出表  reji.skill_art 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `skill_art` DISABLE KEYS */;
/*!40000 ALTER TABLE `skill_art` ENABLE KEYS */;

-- 导出  表 reji.stage 结构
CREATE TABLE IF NOT EXISTS `stage` (
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

-- 正在导出表  reji.stage 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `stage` DISABLE KEYS */;
/*!40000 ALTER TABLE `stage` ENABLE KEYS */;

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

-- 正在导出表  reji.user 的数据：~19 rows (大约)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
REPLACE INTO `user` (`account`, `name`, `UserIp`, `LoginTime`, `SocketId`, `grade`, `coin`, `exp_now`, `hero1`, `hero2`, `hero3`, `cheat`, `OnlineTime`) VALUES
	('11', NULL, '21', '1545223231467', 'EFR6jTlGO8mnHQUDAAAA', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0'),
	('12', NULL, '21', '1545224163234', 'kQlA7lrHbXgRU_tMAAAA', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0'),
	('13', NULL, '21', '32', '4324', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0'),
	('13118834595', NULL, '1921685944', '2019-1-11 11:41:34', 'M5bD1e1zbuUrK5c-AABc', 0, 0, 0, 0, 0, 0, 0, '0'),
	('13265943626', NULL, '19216855140', '1545375384522', 'A07aN5OQmTtaYjMvAAEE', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0'),
	('13295286628', NULL, '19216858112', '2019-1-11 20:16:02', 'juuCjQJJUvTrMU1tAACv', NULL, NULL, NULL, 2, 3, 1, NULL, '0'),
	('13399212356', NULL, '19216857194', '1545372019643', 'r1nHVXsh3e3CcCP8AACJ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0'),
	('13427500308', NULL, '19216856247', '1545375173775', 'sCl05D7RGTgD5pf4AADS', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0'),
	('13631432614', '', '1921685323', '2019-1-11 20:04:11', 'O998PgHTNeaeCaBtAACT', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0'),
	('13668924242', NULL, '19216859225', '1545375480227', 'pYHyg5czS-Veehz0AAEI', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0'),
	('15014909352', NULL, '19216851145', '1545375761572', 'L65VFLtH13YqDuZ6AAEd', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0'),
	('15521324468', NULL, '19216855204', '1545375157906', 'UHEjDraXCY-ygm8xAADC', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0'),
	('15524020196', NULL, '19216853167', '2019-1-11 11:14:37', 'DrRUoQiI5tHdtWwaAAAk', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0'),
	('15622184887', 'wuyepeng', '19216854129', '2019-1-11 17:39:59', 'X55UtZJG2eUoSI9zAAAG', 0, 0, 0, 1, 2, 3, 0, '20'),
	('15622184888', NULL, '111', '2019-1-10 17:37:25', '111', 0, 0, 0, 0, 0, 0, 0, '177.97278027777782'),
	('15625099261', NULL, '19216852217', '1545384852539', 'ofKLM0NjnjNsRqswAAEw', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0'),
	('15920360647', NULL, '19216855248', '1545375108174', 'hwsXPe8SMCntCGiTAAC2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0'),
	('18192027860', '', '19216855130', '2019-1-11 20:14:11', 'CT4ML1jdgqou9PzhAACs', 0, 0, 0, 3, 2, 1, 0, '0'),
	('18392886571', NULL, '19216835246', '2019-1-11 16:59:06', '_n7IhwQbQG9eIugjAABw', NULL, NULL, NULL, 7, 8, 9, NULL, '0'),
	('3', '3', '3', '3', '3', 3, 3, 3, 3, 3, 3, 3, '0');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

-- 导出  表 reji.users_roles 结构
CREATE TABLE IF NOT EXISTS `users_roles` (
  `account` char(50) NOT NULL,
  `role_id` int(11) NOT NULL,
  `role_grade` int(11) NOT NULL,
  `role_exp` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 正在导出表  reji.users_roles 的数据：~24 rows (大约)
/*!40000 ALTER TABLE `users_roles` DISABLE KEYS */;
REPLACE INTO `users_roles` (`account`, `role_id`, `role_grade`, `role_exp`) VALUES
	('15622184887', 1, 15, 179500),
	('15622184887', 2, 15, 179500),
	('15622184887', 3, 15, 175500),
	('13295286628', 1, 1, 0),
	('13295286628', 2, 1, 0),
	('13295286628', 3, 1, 0),
	('18392886571', 1, 1, 0),
	('18392886571', 2, 1, 0),
	('18392886571', 3, 1, 0),
	('13118834595', 1, 1, 0),
	('13118834595', 2, 1, 0),
	('13118834595', 3, 1, 0),
	('13631432614', 1, 1, 0),
	('13631432614', 2, 1, 0),
	('13631432614', 3, 1, 0),
	('18192027860', 1, 1, 0),
	('18192027860', 2, 1, 0),
	('18192027860', 3, 1, 0),
	('15524020196', 1, 1, 0),
	('15524020196', 2, 1, 0),
	('15524020196', 3, 1, 0);
/*!40000 ALTER TABLE `users_roles` ENABLE KEYS */;

-- 导出  表 reji.user_level 结构
CREATE TABLE IF NOT EXISTS `user_level` (
  `account` char(50) NOT NULL,
  `level_id` char(50) NOT NULL,
  `star` int(11) NOT NULL,
  `star1` int(11) DEFAULT NULL,
  `star2` int(11) DEFAULT NULL,
  `star3` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 正在导出表  reji.user_level 的数据：~8 rows (大约)
/*!40000 ALTER TABLE `user_level` DISABLE KEYS */;
REPLACE INTO `user_level` (`account`, `level_id`, `star`, `star1`, `star2`, `star3`) VALUES
	('11', '1_1', 3, NULL, NULL, NULL),
	('11', '1_2', 3, NULL, NULL, NULL),
	('15622184887', '1_1', 3, NULL, NULL, NULL),
	('15622184887', '1_2', 3, NULL, NULL, NULL),
	('15622184887', '1_3', 3, NULL, NULL, NULL),
	('15622184887', '2_1', 3, NULL, NULL, NULL),
	('15622184887', '2_2', 2, NULL, NULL, NULL),
	('15622184887', '2_3', 3, 1, 1, 1);
/*!40000 ALTER TABLE `user_level` ENABLE KEYS */;

-- 导出  表 reji.weapon 结构
CREATE TABLE IF NOT EXISTS `weapon` (
  `weapon_id` int(11) NOT NULL,
  `weapon_name` text NOT NULL,
  `weapon_grade` text NOT NULL,
  `weapon_hurt` int(11) NOT NULL,
  `weapon_leve` int(11) NOT NULL,
  `weapon_price` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 正在导出表  reji.weapon 的数据：~25 rows (大约)
/*!40000 ALTER TABLE `weapon` DISABLE KEYS */;
REPLACE INTO `weapon` (`weapon_id`, `weapon_name`, `weapon_grade`, `weapon_hurt`, `weapon_leve`, `weapon_price`) VALUES
	(101, '木枝', '蓝', 0, 1, NULL),
	(102, '木棍', '紫', 0, 1, NULL),
	(103, '木剑', '橙', 0, 1, NULL),
	(301, '石刀', '蓝', 0, 3, NULL),
	(302, '石剑', '紫', 0, 3, NULL),
	(303, '巨石剑', '橙', 0, 3, NULL),
	(501, '铁棒', '蓝', 0, 5, NULL),
	(502, '简陋的铁棒', '紫', 0, 5, NULL),
	(503, '迟钝的铁剑', '橙', 0, 5, NULL),
	(701, '锋利小刀', '蓝', 0, 7, NULL),
	(702, '匕首', '紫', 0, 7, NULL),
	(703, '三刃匕首', '橙', 0, 7, NULL),
	(1001, '短剑', '蓝', 0, 10, NULL),
	(1002, '骑士剑', '紫', 0, 10, NULL),
	(1003, '十字剑', '紫', 0, 10, NULL),
	(1301, '阔剑', '蓝', 0, 13, NULL),
	(1302, '双手大剑', '紫', 0, 13, NULL),
	(1303, '战锤', '橙', 0, 13, NULL),
	(1501, '三叉戟', '蓝', 0, 15, NULL),
	(1502, '冈格尼尔', '紫', 0, 15, NULL),
	(1503, '王者之剑', '橙', 0, 15, NULL),
	(1801, '风之力', '蓝', 0, 18, NULL),
	(1802, '传古链枷', '紫', 0, 18, NULL),
	(1803, '死亡惩罚', '橙', 1, 18, NULL),
	(2001, '混沌之刃', '蓝', 1, 20, NULL),
	(2002, '霜之哀伤', '紫', 1, 20, NULL),
	(2003, '芬里尔', '橙', 1, 20, NULL);
/*!40000 ALTER TABLE `weapon` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
