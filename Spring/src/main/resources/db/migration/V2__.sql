ALTER TABLE coach
ADD COLUMN experience INT,
ADD COLUMN description VARCHAR(400);

ALTER TABLE course
ADD COLUMN type VARCHAR(50) NOT NULL,
ADD CONSTRAINT fk_course_coach FOREIGN KEY (id_coach) REFERENCES coach (id);
ALTER TABLE booking_field
    ADD COLUMN is_pay BOOLEAN NOT NULL DEFAULT FALSE;