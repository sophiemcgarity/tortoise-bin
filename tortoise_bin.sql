/* tortoise_bin.sql

createdb tortoise_bin;

psql -d tortoise_bin -f tortoise_bin.sql

psql -d tortoise_bin

*/

CREATE TABLE bins (
  bin_id serial PRIMARY KEY,
  bin_path char(8) NOT NULL,
  origin_ip cidr,
  creation_time timestamp NOT NULL
);

CREATE TABLE requests (
  request_id serial PRIMARY KEY,
  request_type char(8),
  request_origin_ip cidr,
  time_received timestamp,
  headers varchar
);

CREATE TABLE payloads (
  payload_id serial PRIMARY KEY,
  payload_data jsonb
);

ALTER TABLE requests ADD COLUMN bin_id integer REFERENCES bins (bin_id);
ALTER TABLE requests ALTER COLUMN bin_id SET NOT NULL;

ALTER TABLE payloads ADD COLUMN request_id integer REFERENCES requests (request_id);
ALTER TABLE payloads ALTER COLUMN request_id SET NOT NULL;
