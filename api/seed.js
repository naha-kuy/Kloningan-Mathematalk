require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { pool } = require('./db');
const bcrypt = require('bcryptjs');

async function migrate() {
  console.log('Running migration...');
  const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  await pool.query(sql);
  console.log('Migration complete.');
}

async function seed() {
  console.log('Seeding data...');
  const hash = await bcrypt.hash('Lesmath5.7', 10);
  await pool.query(
    `INSERT INTO users (name, email, password, phone, role)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (email) DO UPDATE SET name = $1`,
    ['Nafis Nyoba', 'hakimnafis023@gmail.com', hash, '089631312828', 'ortu']
  );
  console.log('Seed complete.');
}

async function run() {
  try {
    await migrate();
    await seed();
    console.log('All done.');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await pool.end();
  }
}

run();
