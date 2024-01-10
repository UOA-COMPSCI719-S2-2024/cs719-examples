DROP TABLE IF EXISTS Customers;

-- Create customers table
CREATE TABLE Customers (
    id INTEGER NOT NULL PRIMARY KEY,
    firstName VARCHAR(64),
    lastName VARCHAR(64),
    email VARCHAR(64)
);

-- Dummy customer data
INSERT INTO Customers (firstName, lastName, email) VALUES
    ('Ash', 'Ketchum', 'ash.ketchum@email.com'),
    ('Misty', 'Waterflower', 'misty.waterflower@email.com'),
    ('Brock', 'Harrison', 'brock.harrison@email.com'),
    ('Serena', 'Yvonne', 'serena.yvonne@email.com'),
    ('Gary', 'Oak', 'gary.oak@email.com'),
    ('May', 'Maple', 'may.maple@email.com'),
    ('Dawn', 'Berlitz', 'dawn.berlitz@email.com'),
    ('Clemont', 'Lemon', 'clemont.lemon@email.com'),
    ('Samuel', 'Oak', 'samuel.oak@email.com'),
    ('Giovanni', 'Sakaki', 'giovanni.sakaki@email.com');