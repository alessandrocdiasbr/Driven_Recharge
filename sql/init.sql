DROP TABLE IF EXISTS recharges;
DROP TABLE IF EXISTS phones;
DROP TABLE IF EXISTS carriers;

CREATE TABLE carriers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    code INT NOT NULL
);

INSERT INTO carriers (name, code) VALUES 
    ('Vivo', 15),
    ('Tim', 41),
    ('Oi', 31),
    ('Claro', 21);

   CREATE TABLE phones (
    id SERIAL PRIMARY KEY,
    number VARCHAR(11) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    document VARCHAR(11) NOT NULL,
    carrier_id INTEGER NOT NULL REFERENCES carriers(id)
);


CREATE TABLE recharges (
    id SERIAL PRIMARY KEY,
    phone_id INTEGER NOT NULL REFERENCES phones(id),
    value DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);