select "Creating table item ..." as '';

create table if not exists item (
    uuid char(36) not null,
    name varchar(255) not null,
    country_code char(3) COMMENT '3 char code ie USA.CAN',
    flag_unicode varchar(36),
    created_at datetime,
    updated_at datetime,
    primary key(uuid)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

DELIMITER |

DROP TRIGGER IF EXISTS on_update_item |
CREATE TRIGGER on_update_item
BEFORE UPDATE ON item
FOR EACH ROW
BEGIN
    SET NEW.updated_at = UTC_TIMESTAMP();
END |

DROP TRIGGER IF EXISTS on_insert_item |
CREATE TRIGGER on_insert_item
BEFORE INSERT ON item
FOR EACH ROW
BEGIN
    SET NEW.created_at = UTC_TIMESTAMP();
    SET NEW.updated_at = UTC_TIMESTAMP();
END |

DELIMITER ;
