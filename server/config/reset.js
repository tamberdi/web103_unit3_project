import { pool } from './database.js'

const createLocationsTable = async () => {
  try {
    await pool.query(`
      DROP TABLE IF EXISTS events;
      DROP TABLE IF EXISTS locations;

      CREATE TABLE locations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        image VARCHAR(255),
        address VARCHAR(255),
        city VARCHAR(255),
        state VARCHAR(255),
        zip VARCHAR(20)
      );

      CREATE TABLE events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        date DATE,
        time TIME,
        image VARCHAR(255),
        location_id INTEGER REFERENCES locations(id)
      );
    `)
    console.log('Tables created!')
  } catch (error) {
    console.log('error creating tables', error)
  }
}

const seedData = async () => {
  try {
    await pool.query(`
      INSERT INTO locations (name, description, image, address, city, state, zip) VALUES
      ('Fourth Street, Berkeley', 'Boutique shopping strip known for maker pop-ups and family-friendly markets', '', '1722 4th St', 'Berkeley', 'CA', '94710'),
      ('SoMa, San Francisco', 'Industrial-turned-creative district home to indie art fairs', '', '440 Brannan St', 'San Francisco', 'CA', '94107'),
      ('Jingletown, Oakland', 'Artist-loft neighborhood along the Oakland estuary known for open studios', '', '2861 Ford St', 'Oakland', 'CA', '94601'),
      ('Mare Island, Vallejo', 'Former naval shipyard turned annual maker mega-event grounds', '', '289 G St', 'Vallejo', 'CA', '94592');

      INSERT INTO events (title, description, date, time, image, location_id) VALUES
      ('Maker''s Row Pop-Up Market', 'Recurring craft and food market on the boutique strip', '2026-07-12', '11:00:00', '', 1),
      ('Toyotas for Tots Community Drive', 'Charity car show benefiting local families', '2026-08-02', '10:00:00', '', 1),
      ('Fourth Street Holiday Lantern Walk', 'Evening lantern-lit stroll through the shops', '2026-12-06', '17:00:00', '', 1),

      ('The Box SF Artists & Makers Fair', 'Monthly indie art fair in a historic former printing plant', '2026-07-19', '12:00:00', '', 2),
      ('Howard Street Print Shop Open House', 'Tour and demo of historic printing equipment', '2026-09-13', '13:00:00', '', 2),
      ('SoMa Night Market: Makers After Dark', 'Evening market with local artisans and food trucks', '2026-10-24', '18:00:00', '', 2),

      ('Jingletown Open Studios', 'Artists open their estuary-side studios to the public', '2026-07-26', '11:00:00', '', 3),
      ('Estuary Mural Crawl', 'Self-guided walk through neighborhood murals', '2026-08-16', '10:00:00', '', 3),
      ('Oakland Indie Craft Swap', 'Trade and sell handmade goods with fellow makers', '2026-09-20', '12:00:00', '', 3),

      ('Maker Faire Bay Area', 'Large-scale maker and inventor showcase', '2026-09-25', '09:00:00', '', 4),
      ('Shipyard Salvage Art Build', 'Collaborative sculpture build using salvaged materials', '2026-10-10', '10:00:00', '', 4),
      ('Mare Island Night Market', 'Evening market set against the historic shipyard backdrop', '2026-11-07', '17:00:00', '', 4);
    `)
    console.log('Data seeded!')
  } catch (error) {
    console.log('error seeding data', error)
  }
}

const reset = async () => {
  await createLocationsTable()
  await seedData()
  pool.end()
}

reset()