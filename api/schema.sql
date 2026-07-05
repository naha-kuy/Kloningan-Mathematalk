-- Mathematalk Database Schema for Neon PostgreSQL

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL DEFAULT '',
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(50) DEFAULT '',
  role VARCHAR(20) DEFAULT 'ortu',
  address TEXT DEFAULT '',
  city VARCHAR(100) DEFAULT '',
  province VARCHAR(100) DEFAULT '',
  postal_code VARCHAR(20) DEFAULT '',
  emergency_contact_name VARCHAR(255) DEFAULT '',
  emergency_contact_phone VARCHAR(50) DEFAULT '',
  occupation VARCHAR(255) DEFAULT '',
  notes TEXT DEFAULT '',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS anak (
  id SERIAL PRIMARY KEY,
  ortu_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  nama_siswa VARCHAR(255) NOT NULL,
  jenjang_kelas VARCHAR(10) DEFAULT 'SD',
  sekolah VARCHAR(255) DEFAULT '',
  email VARCHAR(255) DEFAULT '',
  phone VARCHAR(50) DEFAULT '',
  catatan TEXT DEFAULT '',
  has_login BOOLEAN DEFAULT FALSE,
  password VARCHAR(255) DEFAULT '',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS kelas (
  id SERIAL PRIMARY KEY,
  nama_kelas VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE,
  jenjang_kelas VARCHAR(50) DEFAULT '',
  tipe_kelas VARCHAR(50) DEFAULT '',
  jenis_kelas VARCHAR(50) DEFAULT '',
  deskripsi TEXT DEFAULT '',
  guru_nama VARCHAR(255) DEFAULT '',
  kapasitas_max INTEGER DEFAULT 10,
  current_students INTEGER DEFAULT 0,
  tanggal_mulai DATE,
  harga DECIMAL(15,2) DEFAULT 0,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS enrollments (
  id SERIAL PRIMARY KEY,
  anak_id INTEGER REFERENCES anak(id) ON DELETE CASCADE,
  kelas_id INTEGER REFERENCES kelas(id) ON DELETE CASCADE,
  ortu_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS invoices (
  id SERIAL PRIMARY KEY,
  nomor_invoice VARCHAR(50) UNIQUE NOT NULL,
  enrollment_id INTEGER REFERENCES enrollments(id) ON DELETE SET NULL,
  ortu_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  anak_id INTEGER REFERENCES anak(id) ON DELETE SET NULL,
  kelas_id INTEGER REFERENCES kelas(id) ON DELETE SET NULL,
  total_tagihan DECIMAL(15,2) DEFAULT 0,
  status VARCHAR(50) DEFAULT 'menunggu',
  jatuh_tempo DATE,
  paid_at TIMESTAMP,
  payment_method VARCHAR(50) DEFAULT '',
  checkout_url TEXT DEFAULT '',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS provinces (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- Seed provinces
INSERT INTO provinces (name) VALUES
  ('Aceh'), ('Sumatera Utara'), ('Sumatera Barat'), ('Riau'), ('Kepulauan Riau'),
  ('Jambi'), ('Bengkulu'), ('Sumatera Selatan'), ('Bangka Belitung'), ('Lampung'),
  ('Banten'), ('DKI Jakarta'), ('Jawa Barat'), ('Jawa Tengah'), ('DI Yogyakarta'),
  ('Jawa Timur'), ('Bali'), ('Nusa Tenggara Barat'), ('Nusa Tenggara Timur'),
  ('Kalimantan Barat'), ('Kalimantan Tengah'), ('Kalimantan Selatan'), ('Kalimantan Timur'), ('Kalimantan Utara'),
  ('Sulawesi Utara'), ('Gorontalo'), ('Sulawesi Tengah'), ('Sulawesi Barat'), ('Sulawesi Selatan'), ('Sulawesi Tenggara'),
  ('Maluku'), ('Maluku Utara'), ('Papua'), ('Papua Barat'), ('Papua Tengah'), ('Papua Pegunungan'), ('Papua Selatan')
ON CONFLICT DO NOTHING;

-- Seed sample classes
INSERT INTO kelas (nama_kelas, slug, jenjang_kelas, tipe_kelas, jenis_kelas, deskripsi, guru_nama, kapasitas_max, harga, status) VALUES
  ('OMOC Materi - Persiapan OSN (SD 3-5)', 'omoc-materi', 'SD 3-5', 'private', 'Semi-Private', 'Persiapan OSN dengan pendalaman materi', 'Tim Tutor', 5, 500000, 'active'),
  ('BOB - Persiapan OSN (SMP 7-9)', 'bob-osn', 'SMP 7-9', 'private', 'Semi-Private', 'Bedah soal OSN tingkat SMP', 'Tim Tutor', 5, 550000, 'active')
ON CONFLICT (slug) DO NOTHING;
