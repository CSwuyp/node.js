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

-- 正在导出表  reji.arrowskull 的数据：~1 rows (大约)
/*!40000 ALTER TABLE `arrowskull` DISABLE KEYS */;
REPLACE INTO `arrowskull` (`level`, `hp`, `damage`) VALUES
	(1, 50, 4);
/*!40000 ALTER TABLE `arrowskull` ENABLE KEYS */;

-- 导出  表 reji.level_monster 结构
CREATE TABLE IF NOT EXISTS `level_monster` (
  `level_id` int(11) DEFAULT NULL,
  `monster_id` int(11) DEFAULT NULL,
  `count` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 正在导出表  reji.level_monster 的数据：~3 rows (大约)
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

-- 正在导出表  reji.role 的数据：~2 rows (大约)
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
REPLACE INTO `role` (`role_id`, `role_name`, `attack_id`, `skill1_id`, `skill2_id`, `skill_3_id`, `portrait_id`, `paint_id`, `walk_aniid`, `wait_aniid`, `struck_aniid`, `die_aniid`) VALUES
	(1, '2', 3, 4, 5, 6, 7, 8, 9, 10, 11, 12),
	(2, '3', 4, 5, 6, 7, 8, 11, 111, 22, 32, 12);
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
  `skill_name` int(11) NOT NULL,
  `skill_cooldown` int(11) NOT NULL,
  `skill_stages` int(11) NOT NULL,
  `stage1_id` int(11) NOT NULL,
  `stage1_hurt` int(11) NOT NULL,
  `stage1_time` int(11) NOT NULL,
  `stage2_id` int(11) NOT NULL,
  `stage2_hurt` int(11) NOT NULL,
  `stage2_time` int(11) NOT NULL,
  `stage3_id` int(11) NOT NULL,
  `stage3_hurt` int(11) NOT NULL,
  `stage3_time` int(11) NOT NULL,
  `stage4_id` int(11) NOT NULL,
  `stage4_hurt` int(11) NOT NULL,
  `stage4_time` int(11) NOT NULL,
  `skill_hurt` int(11) NOT NULL,
  PRIMARY KEY (`skill_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 正在导出表  reji.skill 的数据：~1 rows (大约)
/*!40000 ALTER TABLE `skill` DISABLE KEYS */;
REPLACE INTO `skill` (`skill_id`, `skill_name`, `skill_cooldown`, `skill_stages`, `stage1_id`, `stage1_hurt`, `stage1_time`, `stage2_id`, `stage2_hurt`, `stage2_time`, `stage3_id`, `stage3_hurt`, `stage3_time`, `stage4_id`, `stage4_hurt`, `stage4_time`, `skill_hurt`) VALUES
	(1, 43, 223, 43, 43, 43, 43, 43, 78, 7, 8, 6, 8, 6, 6, 5, 0);
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

-- 正在导出表  reji.start_levels 的数据：~5 rows (大约)
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
  `UserIp` text NOT NULL,
  `LoginTime` text NOT NULL,
  `SocketId` char(50) NOT NULL,
  `grade` int(11) unsigned DEFAULT NULL,
  `coin` int(11) unsigned DEFAULT NULL,
  `exp_now` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 正在导出表  reji.user 的数据：~3 rows (大约)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
REPLACE INTO `user` (`account`, `name`, `UserIp`, `LoginTime`, `SocketId`, `grade`, `coin`, `exp_now`) VALUES
	('11', NULL, '21', '002', '43', NULL, NULL, NULL),
	('12', NULL, '21', '004', '321', NULL, NULL, NULL),
	('13', NULL, '21', '32', '4324', NULL, NULL, NULL);
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
  `weapon_id` int(11) DEFAULT NULL,
  `weapon_level` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 正在导出表  reji.users_roles 的数据：~3 rows (大约)
/*!40000 ALTER TABLE `users_roles` DISABLE KEYS */;
REPLACE INTO `users_roles` (`account`, `role_id`, `role_grade`, `role_level`, `breakthrough_level`, `hp`, `hurt`, `weapon_id`, `weapon_level`) VALUES
	(1870096555, 1, 1, 1, 1, 1, 1, 1, 1),
	(1870096555, 2, 2, 2, 2, 2, 2, 4, 3),
	(1870096555, 2, 3, 54, 542, 34, 324, 0, 0);
/*!40000 ALTER TABLE `users_roles` ENABLE KEYS */;

-- 导出  表 reji.user_level 结构
CREATE TABLE IF NOT EXISTS `user_level` (
  `account` int(11) NOT NULL,
  `level_id` int(11) NOT NULL,
  `star` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 正在导出表  reji.user_level 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `user_level` DISABLE KEYS */;
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

-- 正在导出表  reji.weapon 的数据：~27 rows (大约)
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
