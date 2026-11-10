-- Portable reference schema for moving the checked-in JSON database to PostgreSQL.
CREATE TABLE states (id text PRIMARY KEY, name text NOT NULL, slug text NOT NULL UNIQUE);
CREATE TABLE districts (id text PRIMARY KEY, state_id text NOT NULL REFERENCES states(id), name text NOT NULL, source_id text);
CREATE TABLE zones (id text PRIMARY KEY, name text NOT NULL, city_id text NOT NULL, source_id text NOT NULL, verified boolean NOT NULL DEFAULT false);
CREATE TABLE circles (id text PRIMARY KEY, zone_id text NOT NULL REFERENCES zones(id), number integer NOT NULL UNIQUE, name text NOT NULL, source_id text NOT NULL, verified boolean NOT NULL DEFAULT false);
CREATE TABLE wards (id text PRIMARY KEY, circle_id text NOT NULL REFERENCES circles(id), zone_id text NOT NULL REFERENCES zones(id), number integer NOT NULL UNIQUE, name text NOT NULL, source_id text NOT NULL, verified boolean NOT NULL DEFAULT false);
CREATE TABLE localities (id text PRIMARY KEY, ward_id text NOT NULL REFERENCES wards(id), circle_id text NOT NULL REFERENCES circles(id), zone_id text NOT NULL REFERENCES zones(id), name text NOT NULL, slug text NOT NULL UNIQUE, kind text NOT NULL, verified boolean NOT NULL DEFAULT false, source_id text NOT NULL);
CREATE TABLE colonies (id text PRIMARY KEY, locality_id text NOT NULL REFERENCES localities(id), name text NOT NULL, slug text NOT NULL, source_id text NOT NULL, verified boolean NOT NULL DEFAULT false, UNIQUE(locality_id, slug));
CREATE TABLE apartments (id text PRIMARY KEY, colony_id text REFERENCES colonies(id), locality_id text NOT NULL REFERENCES localities(id), name text NOT NULL, slug text NOT NULL, source_id text NOT NULL, verified boolean NOT NULL DEFAULT false, UNIQUE(locality_id, slug));
CREATE TABLE services (id text PRIMARY KEY, name text NOT NULL, category text NOT NULL, summary text NOT NULL, available boolean NOT NULL DEFAULT true);
CREATE TABLE search_intents (id text PRIMARY KEY, name text NOT NULL, index_candidate boolean NOT NULL DEFAULT false);
CREATE TABLE property_types (id text PRIMARY KEY, name text NOT NULL);
CREATE TABLE use_cases (id text PRIMARY KEY, service_id text NOT NULL REFERENCES services(id), name text NOT NULL, UNIQUE(service_id, name));
CREATE TABLE page_combinations (id bigint PRIMARY KEY, service_id text NOT NULL REFERENCES services(id), locality_id text NOT NULL REFERENCES localities(id), search_intent_id text NOT NULL REFERENCES search_intents(id), property_type_id text REFERENCES property_types(id), use_case_id text REFERENCES use_cases(id), UNIQUE(service_id, locality_id, search_intent_id, property_type_id, use_case_id));
CREATE TABLE seo_pages (id bigint PRIMARY KEY REFERENCES page_combinations(id), slug text NOT NULL UNIQUE, path text NOT NULL UNIQUE, generated boolean NOT NULL DEFAULT true, index_eligible boolean NOT NULL DEFAULT false, published boolean NOT NULL DEFAULT false, canonical text NOT NULL, robots text NOT NULL, updated_at timestamptz NOT NULL DEFAULT now(), CHECK (NOT published OR index_eligible));
CREATE TABLE seo_content (page_id bigint PRIMARY KEY REFERENCES seo_pages(id), title text NOT NULL, description text NOT NULL, h1 text NOT NULL, introduction text NOT NULL, body jsonb NOT NULL);
CREATE TABLE faqs (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, page_id bigint NOT NULL REFERENCES seo_pages(id), question text NOT NULL, answer text NOT NULL, position integer NOT NULL, UNIQUE(page_id, position));
CREATE TABLE images (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, page_id bigint REFERENCES seo_pages(id), src text NOT NULL, alt text NOT NULL, verified_asset boolean NOT NULL DEFAULT false);
CREATE TABLE internal_links (source_page_id bigint NOT NULL REFERENCES seo_pages(id), target_path text NOT NULL, anchor_text text NOT NULL, relation text NOT NULL, PRIMARY KEY(source_page_id, target_path));
CREATE TABLE location_sources (id text PRIMARY KEY, publisher text NOT NULL, title text NOT NULL, url text NOT NULL UNIQUE, issued_at date, accessed_at date NOT NULL, scope text NOT NULL);

CREATE INDEX idx_circles_zone ON circles(zone_id);
CREATE INDEX idx_wards_circle ON wards(circle_id);
CREATE INDEX idx_localities_ward ON localities(ward_id);
CREATE INDEX idx_localities_circle ON localities(circle_id);
CREATE INDEX idx_page_combinations_service_location ON page_combinations(service_id, locality_id);
CREATE INDEX idx_seo_pages_publish ON seo_pages(published, index_eligible);
CREATE INDEX idx_internal_links_source ON internal_links(source_page_id);
