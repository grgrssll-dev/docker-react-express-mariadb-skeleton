select "Creating table quiz ..." as '';

create table if not exists quiz (
    uuid char(36) not null,
    grouping_uuid char(36) not null,
    name varchar(255) not null,
    description varchar(255) not null,
    url_slug varchar(255) not null,
    views bigint not null default 0,
    meta varchar(4000) not null CHECK (json_valid(meta)),
    created_at datetime,
    updated_at datetime,
    primary key(uuid),
    FOREIGN KEY (grouping_uuid) REFERENCES grouping(uuid)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

DELIMITER |

DROP TRIGGER IF EXISTS on_update_quiz |
CREATE TRIGGER on_update_quiz
BEFORE UPDATE ON quiz
FOR EACH ROW
BEGIN
    SET NEW.updated_at = UTC_TIMESTAMP();
END |

DROP TRIGGER IF EXISTS on_insert_quiz |
CREATE TRIGGER on_insert_quiz
BEFORE INSERT ON quiz
FOR EACH ROW
BEGIN
    SET NEW.created_at = UTC_TIMESTAMP();
    SET NEW.updated_at = UTC_TIMESTAMP();
END |

DELIMITER ;
