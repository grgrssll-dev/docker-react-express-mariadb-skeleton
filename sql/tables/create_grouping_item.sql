select "Creating table grouping_item ..." as '';

create table if not exists grouping_item (
    uuid char(36) not null,
    grouping_uuid char(36) not null,
    item_uuid char(36) not null,
    item_svg_id varchar(255) not null,
    created_at datetime,
    updated_at datetime,
    primary key(uuid),
    FOREIGN KEY (grouping_uuid) REFERENCES grouping(uuid),
    FOREIGN KEY (item_uuid) REFERENCES item(uuid)

) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

DELIMITER |

DROP TRIGGER IF EXISTS on_update_grouping_item |
CREATE TRIGGER on_update_grouping_item
BEFORE UPDATE ON grouping_item
FOR EACH ROW
BEGIN
    SET NEW.updated_at = UTC_TIMESTAMP();
END |

DROP TRIGGER IF EXISTS on_insert_grouping_item |
CREATE TRIGGER on_insert_grouping_item
BEFORE INSERT ON grouping_item
FOR EACH ROW
BEGIN
    SET NEW.created_at = UTC_TIMESTAMP();
    SET NEW.updated_at = UTC_TIMESTAMP();
END |

DELIMITER ;
