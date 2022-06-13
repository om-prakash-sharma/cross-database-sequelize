CREATE DATABASE client_db;

CREATE TABLE IF NOT EXISTS public.users (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    email_id character varying(255) NOT NULL,
    status boolean DEFAULT false,
    CONSTRAINT users_pkey PRIMARY KEY (id)
);

INSERT INTO public.users(id, name, email_id)
VALUES	('3a79173b-7357-4fde-af46-1851ab7c908a', 'Om Sharma', 'om.sharma@outlook.in'),
        ('3a79173b-7357-4fde-af46-1851ab7c908b', 'Mahendra Sharma', 'mahendra.sharma@outlook.in');

        