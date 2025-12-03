-- 1. Create the 'avatars' bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Allow authenticated users to upload files to the 'avatars' bucket
CREATE POLICY "Allow authenticated uploads"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'avatars' );

-- 3. Allow public access to view files in the 'avatars' bucket
CREATE POLICY "Allow public view"
ON storage.objects
FOR SELECT
TO public
USING ( bucket_id = 'avatars' );

-- 4. Allow authenticated users to update their own files (optional, for replacing avatar)
CREATE POLICY "Allow authenticated updates"
ON storage.objects
FOR UPDATE
TO authenticated
USING ( bucket_id = 'avatars' );
