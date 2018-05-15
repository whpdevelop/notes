
-- 数据库 sql

-- 操作数据库

	-- 打开数据库 
	-- mysql -u 用户名 -p 密码;

	-- 显示所有数据库
	show databases;

	-- 创建数据库
	-- create database 数据库名 字符编码;
	create database items charset=utf8;

	-- 删除数据库
	drop database items;

	-- 切换数据库
	use items;

	-- 查看当前数据库
	select database();

	-- 查看软件版本
	select version();

	-- 查看时间
	select now();

-- 表的操作
	-- 显示所有表
	show tables;

	-- 创建表
	-- auto_increment 表示自动增长
	-- not null 表示不为空
	-- primary key 表示主键
	-- default 默认值
	-- create table 表名字(id 类型 约束[,类型 约束])
	create table item(
		id int auto_increment primary key not null,
		name varchar(30)
	);
	create table students(
		id int auto_increment primary key not null,
		name varchar(30),
		age tinyint unsigned default 0,
		gender enum("男","女","中性","保密") default "保密",
		cls_id int unsigned
	);

	-- 查看表结构
	-- desc 数据表名字;
	desc item;

	-- 插入数据
	insert into students values (0,"aaa","33",3,1);

	-- 查看表的创建语句
    -- show create table 表名字;
    show create table students;

    -- 修改表-添加字段
    -- alter table students add birthday datetime;
    alter table students add birthday datetime;

    -- 修改表-修改字段: 不重命名版
    -- alter table 表名 modify  birthday  date;
    alter table students modify birthday  date;

 	-- 修改表-修改字段: 重命名版
    -- alter table 表名 change birthday birth date default '2018-1-1';
    alter table students change birthday birth date default '2018-1-1';

    -- 修改表- 删除字段
    -- alter table 表名 drop 列名;
    alter table students drop age;


    -- 删除表
    -- drop table 表名;
    -- drop database 数据库;

--  增删改查

	-- 增加
        -- 全列插入
        -- insert [into] 表名 values(...)
        -- 主键字段 可以用 0  null   default 来占位
        -- 向classes表中插入 一个班级
        insert into classes values(0, "菜鸟班");


        +--------+-------------------------------------+------+-----+------------+----------------+
        | Field  | Type                                | Null | Key | Default    | Extra          |
        +--------+-------------------------------------+------+-----+------------+----------------+
        | id     | int(10) unsigned                    | NO   | PRI | NULL       | auto_increment |
        | name   | varchar(30)                         | YES  |     | NULL       |                |
        | age    | tinyint(3) unsigned                 | YES  |     | 0          |                |
        | gender | enum('男','女','中性','保密')       | YES  |     | 保密       |                |
        | cls_id | int(10) unsigned                    | YES  |     | NULL       |                |
        | birth  | date                                | YES  |     | 2000-01-01 |                |
        +--------+-------------------------------------+------+-----+------------+----------------+

        -- 向students表插入 一个学生信息
        insert into students values(0, "小李飞刀", 20, "女", 1, "1990-01-01");
        insert into students values(null, "小李飞刀", 20, "女", 1, "1990-01-01");
        insert into students values(default, "小李飞刀", 20, "女", 1, "1990-01-01");

        -- 失败
        -- insert into students values(default, "小李飞刀", 20, "第4性别", 1, "1990-02-01");

        -- 枚举中 的 下标从1 开始 1---“男” 2--->"女"....
        insert into students values(default, "小李飞刀", 20, 1, 1, "1990-02-01");

        -- 部分插入
        -- insert into 表名(列1,...) values(值1,...)
        insert into students (name, gender) values ("小乔", 2);


        -- 多行插入
        insert into students (name, gender) values ("大乔", 2),("貂蝉", 2);
        insert into students values(default, "西施", 20, "女", 1, "1990-01-01"), (default, "王昭君", 20, "女", 1, "1990-01-01");


    -- 修改
    -- update 表名 set 列1=值1,列2=值2... where 条件;
        update students set gender=1; -- 全部都改
        update students set gender=1 where name="小李飞刀"; -- 只要name是小李飞刀的 全部的修改
        update students set gender=1 where id=3; -- 只要id为3的 进行修改
        update students set age=22, gender=1 where id=3; -- 只要id为3的 进行修改
    
    -- 查询基本使用
        -- 查询所有列
        -- select * from 表名;
        select * from students;

        ---定条件查询
        select * from students where name="小李飞刀"; -- 查询 name为小李飞刀的所有信息
        select * from students where id>3; -- 查询 name为小李飞刀的所有信息


        -- 查询指定列
        -- select 列1,列2,... from 表名;
        select name,gender from students;


        -- 可以使用as为列或表指定别名
        -- select 字段[as 别名] , 字段[as 别名] from 数据表 where ....;
        select name as 姓名,gender as 性别 from students;


        -- 字段的顺序
        select id as 序号, gender as 性别, name as 姓名 from students;
    

    -- 删除
        -- 物理删除
        -- delete from 表名 where 条件
        delete from students; -- 整个数据表中的所有数据全部删除
        delete from students where name="小李飞刀";

        -- 逻辑删除
        -- 用一个字段来表示 这条信息是否已经不能再使用了
        -- 给students表添加一个is_delete字段 bit 类型
        alter table students add is_delete bit default 0;
        update students set is_delete=1 where id=6;






















