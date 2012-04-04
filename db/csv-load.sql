drop table sailors;
drop table reserves;
drop table boats;

drop sequence sailors_sid_seq;
create sequence sailors_sid_seq;
create table sailors (
	sid int not null default nextval('sailors_sid_seq'),
	sname varchar(50),
	rating int,
	age real,
  primary key (sid),
  unique (sname)
	);

drop sequence boats_bid_seq;
create sequence boats_bid_seq;
create table boats (
	bid int not null default nextval('boats_bid_seq'),
	bname varchar(50),
	color varchar(14),
  primary key (bid),
  unique (bid, bname, color)
	);

create table reserves (
	sid int,
	bid int,
	day date
	);
	
-- note that the CSV files must have an absolute path:
copy sailors from '/nfs/elsrv4/users5/fac/richards/cs390wp/examples/db/Sailors.csv' delimiters ',' csv;
copy reserves from '/nfs/elsrv4/users5/fac/richards/cs390wp/examples/db/Reserves.csv' delimiters ',' csv;
copy boats from '/nfs/elsrv4/users5/fac/richards/cs390wp/examples/db/Boats.csv' delimiters ',' csv;



