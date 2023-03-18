select "Creating table grouping ..." as '';

create table if not exists grouping (
    uuid char(36) not null,
    name varchar(255) not null,
    svg_file varchar(255) not null,
    meta varchar(4000) not null CHECK (json_valid(meta)),
    created_at datetime,
    updated_at datetime,
    primary key(uuid)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

DELIMITER |

DROP TRIGGER IF EXISTS on_update_grouping |
CREATE TRIGGER on_update_grouping
BEFORE UPDATE ON grouping
FOR EACH ROW
BEGIN
    SET NEW.updated_at = UTC_TIMESTAMP();
END |

DROP TRIGGER IF EXISTS on_insert_grouping |
CREATE TRIGGER on_insert_grouping
BEFORE INSERT ON grouping
FOR EACH ROW
BEGIN
    SET NEW.created_at = UTC_TIMESTAMP();
    SET NEW.updated_at = UTC_TIMESTAMP();
END |

DELIMITER ;
