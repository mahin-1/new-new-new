CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	down_votes INTEGER DEFAULT 0,
	up_votes INTEGER DEFAULT 0,
	display_name VARCHAR(255) NOT NULL,
	location VARCHAR(512),
	profile_image_url VARCHAR(255),
	about_me TEXT,
	creation_date TIMESTAMP NOT NULL
);

CREATE TABLE posts (
	id SERIAL PRIMARY KEY,
	owner_user_id INTEGER,
	post_type_id SMALLINT NOT NULL,
	accepted_answer_id INTEGER,
	score INTEGER NOT NULL,
	parent_id INTEGER,
	owner_display_name VARCHAR(64),
	title VARCHAR(512),
	tags VARCHAR(512),
	body TEXT,
	creation_date TIMESTAMP NOT NULL,
	closed_date TIMESTAMP,
	last_edit_date TIMESTAMP,
	last_activity_date TIMESTAMP
);

CREATE TABLE comments (
	id SERIAL PRIMARY KEY,
	post_id INTEGER NOT NULL,
	user_id INTEGER,
	score SMALLINT NOT NULL,
	user_display_name VARCHAR(64),
	text TEXT,
	creation_date TIMESTAMP NOT NULL
);

CREATE TABLE votes (
	id SERIAL PRIMARY KEY,
	user_id INTEGER,
	post_id INTEGER NOT NULL,
	vote_type_id SMALLINT NOT NULL,
	creation_date TIMESTAMP NOT NULL
);

CREATE TABLE tags (
	id SERIAL PRIMARY KEY,
	tag_name VARCHAR(255) NOT NULL,
	count INTEGER DEFAULT 0
);

CREATE TABLE auth (
	id SERIAL PRIMARY KEY,
	user_name VARCHAR(255) NOT NULL,
	pass VARCHAR(255) NOT NULL
);