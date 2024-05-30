import { Client, Databases } from "node-appwrite";

const appWriteURL = process.env.APPWRITE_URL;
const appWriteProjectId = process.env.APPWRITE_PROJECT_ID;
const appWriteDBId = process.env.APPWRITE_DB_ID;
const appWriteCollectionId = process.env.APPWRITE_COLLECTION_ID;
const appWriteUserCollectionId = process.env.APPWRITE_USER_COLLECTION_ID;
const appWriteCategoryCollectionId =
  process.env.APPWRITE_CATEGORY_COLLECTION_ID;
const appWriteBucketId = process.env.APPWRITE_BUCKET_ID;
const appWriteUserBucketId = process.env.APPWRITE_USER_BUCKET_ID;

export default async ({ req, res }) => {
  const client = new Client();
  const databases = new Databases(client);

  client.setEndpoint(appWriteURL).setProject(appWriteProjectId);

  try {
    const { status, category } = req.payload;

    const getData = await databases.listDocuments(
      appWriteDBId,
      appWriteCollectionId
    );

    console.log({ status, category });
    return res.json(getData.documents);
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).json({ error: "Internal server error..." });
  }
};
