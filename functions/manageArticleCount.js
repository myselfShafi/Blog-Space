import { Client, Databases } from "node-appwrite";

const envConfig = {
  appWriteURL: String(import.meta.env.VITE_APPWRITE_URL),
  appWriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appWriteDBId: String(import.meta.env.VITE_APPWRITE_DB_ID),
  appWriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appWriteUserCollectionId: String(
    import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID
  ),
  appWriteCategoryCollectionId: String(
    import.meta.env.VITE_APPWRITE_CATEGORY_COLLECTION_ID
  ),
  appWriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  appWriteUserBucketId: String(import.meta.env.VITE_APPWRITE_USER_BUCKET_ID),
};

export default async ({ req, res, log, error }) => {
  const client = new Client();
  const databases = new Databases(client);

  client
    .setEndpoint(envConfig.appWriteURL)
    .setProject(envConfig.appWriteProjectId);

  if (req.method == "GET") {
    const getData = await databases.listDocuments(
      envConfig.appWriteDBId,
      envConfig.appWriteCollectionId
    );
    const { status, category } = req.payload;

    log(status, category);
    console.log(status, category);

    return res.json(getData.documents);
  }
};
