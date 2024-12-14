-- Read Data
\copy users from '../Data/Users.csv' delimiter ',' csv;
\copy posts from '../Data/Posts.csv' delimiter ',' csv;
\copy comments from '../Data/Comments.csv' delimiter ',' csv header;
\copy Tags from '../Data/Tags.csv' delimiter ',' csv header;
\copy votes from '../Data/Votes.csv' delimiter ',' csv header;

delete from
    votes
where
    post_id is NULL;

delete from
    comments
where
    post_id is NULL;

update
    votes
set
    user_id = -1
where
    user_id is NULL;

update
    comments
set
    user_id = -1
where
    user_id is NULL;


update
    posts
set
    owner_user_id = -1
where
    owner_user_id is NULL;