-- This shows what the query is trying to do
-- It's looking for a patient where email OR phone matches the auth user
-- But auth users might not have phone set

SELECT * FROM patients LIMIT 5;
SELECT * FROM appointments LIMIT 5;
