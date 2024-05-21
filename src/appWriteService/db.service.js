import { Client, Databases, ID, Storage } from "appwrite";
import { envConfig } from "../config";

class DbService {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(envConfig.appWriteURL)
      .setProject(envConfig.appWriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async getAllPosts() {
    try {
      return await this.databases.listDocuments(
        envConfig.appWriteDBId,
        envConfig.appWriteCollectionId
      );
    } catch (error) {
      console.error("Appwrite error ++ get all posts ++", error);
      throw error;
    }
  }

  async createPost({ title, content, thumbnail, status, userID, category }) {
    try {
      return await this.databases.createDocument(
        envConfig.appWriteDBId,
        envConfig.appWriteCollectionId,
        ID.unique(),
        {
          title,
          content,
          thumbnail,
          status,
          userID,
          category,
        }
      );
    } catch (error) {
      console.error("Appwrite error ++ create post ++", error);
      throw error;
    }
  }
}

const dbService = new DbService();

export default dbService;
