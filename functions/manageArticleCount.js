import { Client, Databases, ID, Query } from "node-appwrite";

const appWriteURL = process.env.APPWRITE_URL;
const appWriteProjectId = process.env.APPWRITE_PROJECT_ID;
const appWriteDBId = process.env.APPWRITE_DB_ID;
const appWriteCollectionId = process.env.APPWRITE_COLLECTION_ID;
const appWriteCategoryCollectionId =
  process.env.APPWRITE_CATEGORY_COLLECTION_ID;
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
    const { status, statusUpdated, category, thumbnail, $id } = req.body;

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
            defaultImage: thumbnail ?? null,
          }
        );
      }
    }

    let newCount = currDoc.count ?? 0;
    let img = currDoc.defaultImage ?? null;

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
      if (currDoc.defaultImage === thumbnail) {
        img = (
          await databases.listDocuments(appWriteDBId, appWriteCollectionId, [
            Query.isNotNull("thumbnail"),
          ])
        ).documents[0].thumbnail;
      }
    } else if (
      event ===
      `databases.${appWriteDBId}.collections.${appWriteCollectionId}.documents.${$id}.update`
    ) {
      if (statusUpdated && status === "public") {
        newCount += 1;
      }
      if (statusUpdated && status === "private") {
        newCount -= 1;
        if (currDoc.defaultImage === thumbnail) {
          img = (
            await databases.listDocuments(appWriteDBId, appWriteCollectionId, [
              Query.isNotNull("thumbnail"),
            ])
          ).documents[0].thumbnail;
        }
      }
    }

    if (currDoc) {
      if (newCount <= 0) {
        await databases.deleteDocument(
          appWriteDBId,
          appWriteCategoryCollectionId,
          currDoc.$id
        );
      } else {
        await databases.updateDocument(
          appWriteDBId,
          appWriteCategoryCollectionId,
          currDoc.$id,
          { count: newCount, defaultImage: img }
        );
      }
    }

    return res.send({ success: true });
  } catch (err) {
    error(`error: ${err}`);
    return res.json({ error: "Internal server error..." });
  }
};
