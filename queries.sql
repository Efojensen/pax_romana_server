CREATE TABLE colleges(
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL
);

CREATE TABLE programmes(
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        duration INT NOT NULL,
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
        member_id INT,
        CONSTRAINT fk_to_member FOREIGN KEY (member_id) REFERENCES members(id)
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
        member_id INT,
        subgroup_id INT,
        joined_on TIMESTAMPTZ DEFAULT NOW(),
        PRIMARY KEY(member_id, subgroup_id),
        CONSTRAINT fk_member FOREIGN KEY (member_id) REFERENCES members(id),
        CONSTRAINT fk_subgroup FOREIGN KEY (subgroup_id) REFERENCES subgroups(id)
);

CREATE TABLE executives(
        id SERIAL PRIMARY KEY,
        member_id INT,
        position TEXT,
        subgroup_id INT,
        year_group TEXT,
        CONSTRAINT fk_member_executive FOREIGN KEY (member_id) REFERENCES members(id),
        CONSTRAINT fk_subgroup_executive FOREIGN KEY (subgroup_id) REFERENCES subgroups(id)
);

CREATE TABLE announcements(
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        body TEXT,
        summary TEXT,
        photo_url TEXT,
        subgroup_id INT,
        CONSTRAINT fk_announcement_for FOREIGN KEY (subgroup_id) REFERENCES subgroups(id)
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
