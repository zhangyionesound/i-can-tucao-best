set names utf8;
-- ----------------------------
-- Table structure for t_word
-- ----------------------------
DROP TABLE IF EXISTS `t_word`;
CREATE TABLE `t_word` (
	`f_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
        `f_company_id` int(11) NOT NULL DEFAULT 0 COMMENT '公司主键',
	`f_desc` text COMMENT '吐槽描述',
	`f_zan` int(11) NOT NULL DEFAULT 0 COMMENT '点赞数',
	`f_cai` int(11) NOT NULL DEFAULT 0 COMMENT '踩的数',
	`f_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '添加时间',
	`f_author` int(11) NOT NULL DEFAULT 0 COMMENT '添加人',
 	PRIMARY KEY (`f_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='评论表';

ALTER TABLE `t_word` ADD INDEX select_index (`f_company_id`, `f_cai`)
drop index select_index on `t_word`


-- ----------------------------
-- Table structure for t_company
-- ----------------------------
DROP TABLE IF EXISTS `t_company`;
CREATE TABLE `t_company` (
	`f_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
	`f_name` varchar(255) NOT NULL DEFAULT 0 COMMENT '公司名字',
	`f_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '添加时间',
 	PRIMARY KEY (`f_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='公司表';

ALTER TABLE `cSessionInfo` ADD `f_compang_ids` varchar(255) NOT NULL DEFAULT 0 COMMENT '公司的产品ids，逗号隔开' AFTER `user_info` ;


 -- ----------------------------
-- Table structure for t_zan
-- ----------------------------
DROP TABLE IF EXISTS `t_zan`;
CREATE TABLE `t_zan` (
  `f_word_id` int(11) NOT NULL DEFAULT '0' COMMENT '评论id',
  `f_open_id` varchar(255) NOT NULL DEFAULT '' COMMENT '点赞人的open_id',
  `f_del_flag` tinyint(4) NOT NULL DEFAULT '0' COMMENT '1赞0没赞',
  UNIQUE KEY `f_word_id` (`f_word_id`,`f_open_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='点赞记录表';

 -- ----------------------------
-- Table structure for t_cai
-- ----------------------------
DROP TABLE IF EXISTS `t_cai`;
CREATE TABLE `t_cai` (
  `f_word_id` int(11) NOT NULL DEFAULT '0' COMMENT '评论id',
  `f_open_id` varchar(255) NOT NULL DEFAULT '' COMMENT '踩人的open_id',
  `f_del_flag` tinyint(4) NOT NULL DEFAULT '0' COMMENT '1赞0没赞',
  UNIQUE KEY `f_word_id` (`f_word_id`,`f_open_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='踩的记录表';
