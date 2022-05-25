CREATE DATABASE demo2;

CREATE TABLE IF NOT EXISTS public.user_licenses(
    id uuid NOT NULL,
    count integer DEFAULT 0,
    user_id uuid,
    expiration_date timestamp with time zone,
    status boolean DEFAULT false,
    CONSTRAINT user_licenses_pkey PRIMARY KEY (id)
);


INSERT INTO public.user_licenses(id, count, user_id)
VALUES	('4062fb3d-794a-4590-ac9a-9d15f8b0ee12', 10,'3a79173b-7357-4fde-af46-1851ab7c908a'),
        ('4062fb3d-794a-4590-ac9a-9d15f8b0ee13',4,'3a79173b-7357-4fde-af46-1851ab7c908b');