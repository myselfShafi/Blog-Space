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
const appWriteApiKey = process.env.APPWRITE_API_KEY_FUNC;

export default async ({ req, res, log, error }) => {
  const client = new Client();
  const databases = new Databases(client);

  client
    .setEndpoint(appWriteURL)
    .setProject(appWriteProjectId)
    .setKey(appWriteApiKey);

  try {
    const event = req.headers["x-appwrite-event"];
    log(`event - ${event}`);
    const { status, category, thumbnail, $id } = req.body;
    log(`check - ${status}---${category}---${thumbnail}---${$id}`);

    const currCategory = await databases.listDocuments(
      appWriteDBId,
      appWriteCategoryCollectionId,
      [Query.contains("categoryName", category)]
    );
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
        log(`currDoc 2 - ${currDoc}`);
      }
    }
    let newCount = currDoc.counter ?? 100;
    log(`counter intial: ${currDoc.counter}`);
    if (
      event ===
      `databases.${appWriteDBId}.collections.${appWriteCollectionId}.documents.${$id}.create`
    ) {
      if (status === "public") {
        newCount += 1;
      }
    } else if (
      event ===
      `databases.${appWriteDBId}.collections.${appWriteCollectionId}.documents.${$id}.delete`
    ) {
      if (status === "public") {
        newCount -= 1;
      }
    } else if (
      event ===
      `databases.${appWriteDBId}.collections.${appWriteCollectionId}.documents.${$id}.update`
    ) {
    }
    log(`newcount after- ${newCount}`);

    if (currDoc) {
      const update = await databases.updateDocument(
        appWriteDBId,
        appWriteCategoryCollectionId,
        currDoc.$id,
        { counter: newCount }
      );

      log(`updated resp: ${update}`);
      log(`updated id: ${update.$id}`);
    }

    return res.send({ success: true });
  } catch (err) {
    error(`error: ${err}`);
    return res.json({ error: "Internal server error..." });
  }
};
