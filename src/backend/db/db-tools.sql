delete from auth.users
where is_anonymous = true;

delete from auth.users
where is_anonymous is true and created_at < now() - interval '30 days';

