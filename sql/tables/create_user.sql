select "Creating table user ..." as '';

create table if not exists user (
    uuid char(36) not null,
    email varchar(255) not null,
    password varchar(255) not null,
    username varchar(255) not null,
    disabled boolean default 0,
    verified boolean default 0,
    last_ip varchar(64),
    last_login datetime,
    flags varchar(4000) not null CHECK (json_valid(flags)),
    settings varchar(4000) not null CHECK (json_valid(settings)),
    meta varchar(4000) not null CHECK (json_valid(meta)),
    created_at datetime,
    updated_at datetime,
    primary key(uuid)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

DELIMITER |

DROP TRIGGER IF EXISTS on_update_user |
CREATE TRIGGER on_update_user
BEFORE UPDATE ON user
FOR EACH ROW
BEGIN
    SET NEW.updated_at = UTC_TIMESTAMP();
END |

DROP TRIGGER IF EXISTS on_insert_user |
CREATE TRIGGER on_insert_user
BEFORE INSERT ON user
FOR EACH ROW
BEGIN
    SET NEW.created_at = UTC_TIMESTAMP();
    SET NEW.updated_at = UTC_TIMESTAMP();
END |

DELIMITER ;
