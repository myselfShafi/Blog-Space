import { Client, Databases, Query, Storage } from "appwrite";
import { envConfig } from "../config";
import dbService from "./db.service";

class CategoryService {
  client = new Client();
  databases;
  categoryStorage;

  constructor() {
    this.client
      .setEndpoint(envConfig.appWriteURL)
      .setProject(envConfig.appWriteProjectId);
    this.databases = new Databases(this.client);
    this.categoryStorage = new Storage(this.client);
  }

  async getCategories(query = [Query.notEqual("count", 0)]) {
    try {
      return this.databases.listDocuments(
        envConfig.appWriteDBId,
        envConfig.appWriteCategoryCollectionId,
        query
      );
    } catch (error) {
      console.error("Appwrite error ++ get categories ++", error);
      throw error;
    }
  }

  async getCategory(docID) {
    try {
      return this.databases.getDocument(
        envConfig.appWriteDBId,
        envConfig.appWriteCategoryCollectionId,
        docID
      );
    } catch (error) {
      console.error("Appwrite error ++ get categories ++", error);
      throw error;
    }
  }

  async updateImageID(docID, category) {
    try {
      const getImage = await dbService.getAllPosts([
        Query.isNotNull("thumbnail"),
        Query.equal("category", category),
      ]);
      return await this.databases.updateDocument(
        envConfig.appWriteDBId,
        envConfig.appWriteCategoryCollectionId,
        docID,
        {
          defaultImage:
            getImage.total > 0 ? getImage.documents[0].thumbnail : null,
        }
      );
    } catch (error) {
      throw error;
    }
  }
}

const categoryService = new CategoryService();

export default categoryService;
