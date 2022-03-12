DROP TABLE IF EXISTS menu_items CASCADE;
CREATE TABLE menu_items (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  photo VARCHAR(255),
  price_cents INTEGER NOT NULL,
  in_stock BOOLEAN NOT NULL,
  prep_time INTEGER,
  type VARCHAR(255)
);
