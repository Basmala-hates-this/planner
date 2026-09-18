-- ============================================================
-- Uni Planner — initial schema (Supabase / Postgres)
-- UUID primary keys throughout, per convention.
-- ============================================================

create extension if not exists "pgcrypto"; -- for gen_random_uuid()

-- ------------------------------------------------------------
-- Enums
-- ------------------------------------------------------------
create type user_role as enum ('superadmin', 'admin', 'professor', 'student');
create type verification_status as enum ('pending', 'approved', 'rejected');
create type event_status as enum ('fixed', 'negotiable', 'cancelled', 'completed');

-- ------------------------------------------------------------
-- Departments
-- ------------------------------------------------------------
create table departments (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- Users
-- Supabase auth.users holds the actual auth identity;
-- this table holds app-level profile/role data, 1:1 with auth.users.
-- ------------------------------------------------------------
create table users (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null unique,
  role user_role not null default 'student',
  verification_status verification_status not null default 'pending',
  university_id_document_url text, -- uploaded proof (student ID / professor contract)
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- User <-> Department (many-to-many)
-- Covers the "professor in more than one department" case.
-- A student/professor row here = membership; superadmins don't need rows
-- (they're global), but admins get exactly one row = the dept they manage.
-- ------------------------------------------------------------
create table user_departments (
  user_id uuid not null references users(id) on delete cascade,
  department_id uuid not null references departments(id) on delete cascade,
  is_primary boolean not null default true, -- for professors in >1 dept, mark their "home" dept
  created_at timestamptz not null default now(),
  primary key (user_id, department_id)
);

-- ------------------------------------------------------------
-- Admin registration keys (superadmin-issued, single-use)
-- ------------------------------------------------------------
create table admin_keys (
  id uuid primary key default gen_random_uuid(),
  department_id uuid not null references departments(id) on delete cascade,
  issued_by uuid not null references users(id),
  email text not null, -- key only redeems for this exact email
  key_hash text not null, -- store a hash, not the raw key
  expires_at timestamptz not null, -- issued_at + ~2h
  redeemed_at timestamptz, -- null until used; redemption is what actually invalidates it
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- Events
-- ------------------------------------------------------------
create table events (
  id uuid primary key default gen_random_uuid(),
  department_id uuid not null references departments(id) on delete cascade,
  owner_id uuid not null references users(id), -- professor/admin who created it
  title text not null,
  description text,
  date date not null,
  start_time time not null,
  end_time time not null,
  place text, -- room
  status event_status not null default 'fixed',
  visibility text not null default 'department', -- 'department' | 'public' (university-wide) — open question, kept flexible
  max_participants int,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint valid_time_range check (end_time > start_time)
);

-- ------------------------------------------------------------
-- Suggestions (student-proposed alternate times for negotiable events)
-- Dedup logic: a suggestion is unique per (event, date, start_time, end_time).
-- A duplicate submission should not insert a new row — the app layer looks
-- up the existing suggestion and inserts into suggestion_votes instead.
-- ------------------------------------------------------------
create table suggestions (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references events(id) on delete cascade,
  suggested_date date not null,
  suggested_start_time time not null,
  suggested_end_time time not null,
  created_at timestamptz not null default now(),

  constraint unique_suggestion_slot unique (event_id, suggested_date, suggested_start_time, suggested_end_time)
);

-- One vote per user per suggestion; a user voting again on the same
-- suggestion is a no-op, not a second vote (enforced by the PK).
create table suggestion_votes (
  suggestion_id uuid not null references suggestions(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (suggestion_id, user_id)
);

-- ------------------------------------------------------------
-- Helpful indexes
-- ------------------------------------------------------------
create index idx_events_department_date on events (department_id, date);
create index idx_events_owner on events (owner_id);
create index idx_suggestions_event on suggestions (event_id);
create index idx_user_departments_user on user_departments (user_id);
