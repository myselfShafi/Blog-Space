import { Client, Databases, ID, Query, Storage } from "appwrite";
import { envConfig } from "../config";
import categoryService from "./category.service";

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

  async getAllPosts(query = [Query.equal("status", "public")]) {
    try {
      return await this.databases.listDocuments(
        envConfig.appWriteDBId,
        envConfig.appWriteCollectionId,
        query
      );
    } catch (error) {
      console.error("Appwrite error ++ get all posts ++", error);
      throw error;
    }
  }

  async getPost(documentID) {
    try {
      return await this.databases.getDocument(
        envConfig.appWriteDBId,
        envConfig.appWriteCollectionId,
        documentID
      );
    } catch (error) {
      console.error("Appwrite error ++ get current post ++", error);
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

  async updatePost(
    documentID,
    { title, content, thumbnail, status, category, statusUpdated }
  ) {
    try {
      return await this.databases.updateDocument(
        envConfig.appWriteDBId,
        envConfig.appWriteCollectionId,
        documentID,
        { title, content, thumbnail, status, category, statusUpdated }
      );
    } catch (error) {
      console.error("Appwrite error ++ update post ++", error);
      throw error;
    }
  }

  async deletePost(documentID) {
    try {
      const file = await this.getPost(documentID);
      if (file?.thumbnail) {
        await this.deleteFile(file?.thumbnail, file?.category);
      }
      return await this.databases.deleteDocument(
        envConfig.appWriteDBId,
        envConfig.appWriteCollectionId,
        documentID
      );
    } catch (error) {
      console.error("Appwrite error ++ delete post & file ++", error);
      throw error;
    }
  }

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        envConfig.appWriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error("Appwrite error ++ upload file ++", error);
      throw error;
    }
  }

  async deleteFile(fileID, category) {
    try {
      const check = await categoryService.getCategories([
        Query.contains("defaultImage", fileID),
      ]);
      if (check.total > 0 && check.documents.length > 0) {
        await categoryService.updateImageID(check.documents[0].$id, category);
      }
      return await this.storage.deleteFile(envConfig.appWriteBucketId, fileID);
    } catch (error) {
      console.error("Appwrite error ++ delete file ++", error);
      throw error;
    }
  }

  getFile(fileID) {
    return this.storage.getFilePreview(envConfig.appWriteBucketId, fileID);
  }
}

const dbService = new DbService();

export default dbService;
