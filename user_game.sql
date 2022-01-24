create table user_game_biodata (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    fullName VARCHAR(100),
    email VARCHAR(150),
    os VARCHAR(50)
);

create table user_game_history (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    playedHours VARCHAR(50),
    recentLogin VARCHAR(50)
);

create table user_game (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    nickname VARCHAR(50) NOT NULL,
    server VARCHAR(20) NOT NULL,
    user_game_history_id BIGINT REFERENCES user_game_history (id),
    user_game_biodata_id BIGINT REFERENCES user_game_biodata (id)
);

insert into user_game (nickname, server) values ('bjorn', 'EU');

insert into user_game_history (playedHours, recentLogin) values ('25 hours', '2min ago');

insert into user_game_biodata (fullName, email, os) values ('Bjorn John', 'Bjohn@gmail.com', 'Windows');