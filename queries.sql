CREATE TABLE colleges(
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL
);

CREATE TABLE programmes(
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        duration INT DEFAULT 4,
        college_id INT,
        CONSTRAINT fk_college FOREIGN KEY (college_id) REFERENCES colleges(id)
);

CREATE TABLE campus_residences(
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        location TEXT
);

CREATE TYPE genders_enum AS ENUM(
        'M',
        'F'
);

CREATE TABLE citizens(
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        pwd_hash TEXT NOT NULL,
        gender genders_enum,
        photo_url TEXT,
        phone_number TEXT NOT NULL,
        birth_date DATE,
        programme_id INT,
        campus_residency INT,
        level INT DEFAULT 100,
        registered_at TIMESTAMPTZ DEFAULT NOW(),
        CONSTRAINT fk_programme FOREIGN KEY (programme_id) REFERENCES programmes(id),
        CONSTRAINT fk_residence FOREIGN KEY (campus_residency) REFERENCES campus_residences(id)
);

CREATE TABLE admins (
        id SERIAL PRIMARY KEY,
        citizen_id INT,
        CONSTRAINT fk_to_citizen FOREIGN KEY (citizen_id) REFERENCES citizens(id)
);

CREATE TABLE subgroups (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        photo_url TEXT,
        short_name TEXT,
        motto TEXT,
        created_by INT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        CONSTRAINT fk_admin_created FOREIGN KEY (created_by) REFERENCES admins(id)
);

CREATE TABLE subgroup_memberships (
        citizen_id INT,
        subgroup_id INT,
        joined_on TIMESTAMPTZ DEFAULT NOW(),
        PRIMARY KEY(citizen_id, subgroup_id),
        CONSTRAINT fk_citizen FOREIGN KEY (citizen_id) REFERENCES citizens(id),
        CONSTRAINT fk_subgroup FOREIGN KEY (subgroup_id) REFERENCES subgroups(id)
);

CREATE TABLE executives(
        id SERIAL PRIMARY KEY,
        citizen_id INT,
        position TEXT,
        subgroup_id INT,
        year_group TEXT,
        CONSTRAINT fk_citizen_executive FOREIGN KEY (citizen_id) REFERENCES citizens(id),
        CONSTRAINT fk_subgroup_executive FOREIGN KEY (subgroup_id) REFERENCES subgroups(id)
);

CREATE TABLE announcements(
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        body TEXT,
        summary TEXT,
        photo_url TEXT
);

CREATE TABLE announcement_subgroups (
        announcement_id INTEGER REFERENCES announcements(id) ON DELETE CASCADE,
        subgroup_id INTEGER REFERENCES subgroups(id) ON DELETE CASCADE,
        PRIMARY KEY (announcement_id, subgroup_id)
);

CREATE OR REPLACE FUNCTION set_default_if_null()
RETURNS TRIGGER AS $$
BEGIN
        IF NEW.level IS NULL THEN
                NEW.level := 100;
        END IF;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tgr_set_default
BEFORE INSERT ON citizens
FOR EACH ROW EXECUTE FUNCTION set_default_if_null();
