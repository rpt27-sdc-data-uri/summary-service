DROP DATABASE IF EXISTS summarydb;

CREATE DATABASE summarydb;

\c summarydb

CREATE TABLE IF NOT EXISTS Summaries
(
  id SERIAL PRIMARY KEY,
  summary TEXT,
  short_summary TEXT,
  copyright TEXT
);

ALTER TABLE Summaries
  OWNER to postgres;