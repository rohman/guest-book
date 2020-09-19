--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------
CREATE TABLE guest(
    id INTEGER PRIMARY KEY,
    name TEXT,
    address TEXT,
    phoneNumber INTEGER,
    comment TEXT
);

INSERT INTO guest(name, address, phoneNumber, comment) VALUES('ariel', 'jakarta', 0812312321, 'Baiklah');
INSERT INTO guest(name, address, phoneNumber, comment) VALUES('ulfah', 'bandung', 08112321, 'OK juga');

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------
DROP TABLE guest
