import { Client, Databases, ID, Query } from "node-appwrite";

const appWriteURL = process.env.APPWRITE_URL;
const appWriteProjectId = process.env.APPWRITE_PROJECT_ID;
const appWriteDBId = process.env.APPWRITE_DB_ID;
const appWriteCollectionId = process.env.APPWRITE_COLLECTION_ID;
const appWriteUserCollectionId = process.env.APPWRITE_USER_COLLECTION_ID;
const appWriteCategoryCollectionId =
  process.env.APPWRITE_CATEGORY_COLLECTION_ID;
const appWriteBucketId = process.env.APPWRITE_BUCKET_ID;
const appWriteUserBucketId = process.env.APPWRITE_USER_BUCKET_ID;

export default async ({ req, res, log, error }) => {
  const client = new Client();
  const databases = new Databases(client);

  client.setEndpoint(appWriteURL).setProject(appWriteProjectId);

  try {
    const event = req.headers["x-appwrite-event"];
    log(`event - ${event}`);
    const { status, category, thumbnail } = req.body;
    log(`req - ${req}`);
    const currCategory = await databases.listDocuments(
      appWriteDBId,
      appWriteCategoryCollectionId,
      [Query.contains("categoryName", category)]
    );
    log(`currCategory - ${currCategory}`);
    let currDoc;
    if (currCategory.total > 0 && currCategory.documents.length > 0) {
      currDoc = currCategory.documents[0];
    }
    if (currCategory.total === 0 && currCategory.documents.length === 0) {
      if (status === "public") {
        currDoc = await databases.createDocument(
          appWriteDBId,
          appWriteCategoryCollectionId,
          ID.unique(),
          {
            categoryName: category,
            defaultImage: thumbnail,
            count: 0,
            counter: 0,
          }
        );
      }
    }
    log(`event - ${currDoc}`);
    let newCount = currDoc.counter ?? 0;
    if (
      event ===
      `databases.${appWriteDBId}.collections.${appWriteCollectionId}.documents.*.create`
    ) {
      if (status === "public") {
        newCount += 1;
      }
    } else if (
      event ===
      `databases.${appWriteDBId}.collections.${appWriteCollectionId}.documents.*.delete`
    ) {
      if (status === "public") {
        newCount -= 1;
      }
    } else if (
      event ===
      `databases.${appWriteDBId}.collections.${appWriteCollectionId}.documents.*.update`
    ) {
    }
    log(`newcount - ${newCount}`);

    if (currDoc) {
      await databases.updateDocument(
        appWriteDBId,
        appWriteCategoryCollectionId,
        currDoc.$id,
        { counter: newCount }
      );
    }

    return res.send({ success: true });
  } catch (err) {
    error(`error: ${err}`);
    console.error("An error occurred:", err);
    return res.status(500).json({ error: "Internal server error..." });
  }
};
