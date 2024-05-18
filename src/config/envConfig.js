// In production grade apps, it is generally better approach to store all the env access points in a config file to avoid unexpected not-loaded issue.
// converting it to String is usually better to avoid cases where some env are stored in plain format instead of string, also if the env is not available then atleast empty string will get returned avoiding the app crashing on prod

const envConfig = {
  appWriteURL: String(import.meta.env.VITE_APPWRITE_URL),
  appWriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appWriteDBId: String(import.meta.env.VITE_APPWRITE_DB_ID),
  appWriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appWriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),

  tinymceApi: String(import.meta.env.VITE_TINYMCE_API),

  resetURL: String(import.meta.env.VITE_RESET_URL),
  verifyURL: String(import.meta.env.VITE_VERIFY_USER_URL),
};

export default envConfig;
