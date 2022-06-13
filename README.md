# Cross Database Association in Sequlize (Postgres)

## Setup Database

-   Create database

    -   Create one database Ex: client_db
        ```
        CREATE DATABASE client_db;
        ```
    -   Create table users inside client_db database
        ```
        CREATE TABLE IF NOT EXISTS public.users (
            id uuid NOT NULL,
            name character varying(255) NOT NULL,
            email_id character varying(255) NOT NULL,
            status boolean DEFAULT false,
            CONSTRAINT users_pkey PRIMARY KEY (id)
        );
        ```
    -   Insert some dummy data in users table

        ```
        INSERT INTO public.users(id, name, email_id)
        VALUES	('3a79173b-7357-4fde-af46-1851ab7c908a', 'Om Sharma', 'om.sharma@outlook.in'),
        	    ('3a79173b-7357-4fde-af46-1851ab7c908b', 'Mahendra Sharma', 'mahendra.sharma@outlook.in');
        ```

    -   Create 2nd database Ex: master_db
        ```
        CREATE DATABASE master_db;
        ```
    -   Create table user_licenses inside master_db database
        ```
        CREATE TABLE IF NOT EXISTS public.user_licenses(
            id uuid NOT NULL,
            count integer DEFAULT 0,
            user_id uuid,
            expiration_date timestamp with time zone,
            status boolean DEFAULT false,
            CONSTRAINT user_licenses_pkey PRIMARY KEY (id)
        );
        ```
    -   Insert some dummy data in user_licenses table
        ```
        INSERT INTO public.user_licenses(id, count, user_id)
        VALUES	('4062fb3d-794a-4590-ac9a-9d15f8b0ee12', 10,'3a79173b-7357-4fde-af46-1851ab7c908a'),
        	('4062fb3d-794a-4590-ac9a-9d15f8b0ee13',4,'3a79173b-7357-4fde-af46-1851ab7c908b');
        ```

## Configure "postgres_fdw" extension

-   Run these command to configure and map with remote database

    ```
          # Enable postgres_fdw extension
    	> CREATE EXTENSION postgres_fdw;

    	# Create server connection for remote database
    	> CREATE SERVER fdw_server FOREIGN DATA WRAPPER postgres_fdw OPTIONS (host 'localhost', dbname 'master_db', port '5432');

    	# Create user mapping to access
    	3. CREATE USER MAPPING FOR postgres SERVER fdw_server OPTIONS (user 'postgres', password 'postgres');

    	# sync schema
    	4. IMPORT FOREIGN SCHEMA public FROM SERVER fdw_server INTO public;

    ```

## Run project

-   git clone
-   cd ./cross-db-association
-   npm i
-   update .env (add database details)
-   npm start
-   open browser and hit `http://localhost:2000/api/user`
