select "Creating table user_quiz ..." as '';

create table if not exists user_quiz (
    uuid char(36) not null,
    user_uuid char(36) not null,
    quiz_uuid char(36) not null,
    start_date datetime,
    end_date datetime,
    questions varchar(10000) not null CHECK (json_valid(questions)),
    answers varchar(2000) not null CHECK (json_valid(answers)),
    meta varchar(4000) not null CHECK (json_valid(meta)),
    created_at datetime,
    updated_at datetime,
    primary key(uuid),
    FOREIGN KEY (user_uuid) REFERENCES user(uuid),
    FOREIGN KEY (quiz_uuid) REFERENCES quiz(uuid)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

DELIMITER |

DROP TRIGGER IF EXISTS on_update_user_quiz |
CREATE TRIGGER on_update_user_quiz
BEFORE UPDATE ON user_quiz
FOR EACH ROW
BEGIN
    SET NEW.updated_at = UTC_TIMESTAMP();
END |

DROP TRIGGER IF EXISTS on_insert_user_quiz |
CREATE TRIGGER on_insert_user_quiz
BEFORE INSERT ON user_quiz
FOR EACH ROW
BEGIN
    SET NEW.created_at = UTC_TIMESTAMP();
    SET NEW.updated_at = UTC_TIMESTAMP();
END |

DELIMITER ;
