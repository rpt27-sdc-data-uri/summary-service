DROP DATABASE IF EXISTS summarydb;

CREATE DATABASE summarydb;

\c summarydb

CREATE TABLE IF NOT EXISTS Summary
(
  bookId SERIAL PRIMARY KEY,
  summary TEXT,
  short_summary TEXT,
  copyright TEXT
);

ALTER TABLE Summary
  OWNER to postgres;