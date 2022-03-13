DROP TABLE IF EXISTS orders CASCADE;
CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  customer_id INTEGER REFERENCES users(id),
  is_complete BOOLEAN
);