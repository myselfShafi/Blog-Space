import { Client, Databases, ID, Query, Storage } from "appwrite";
import { envConfig } from "../config";
import authService from "./auth.service";

class UserService {
  client = new Client();
  databases;
  userStorage;

  constructor() {
    this.client
      .setEndpoint(envConfig.appWriteURL)
      .setProject(envConfig.appWriteProjectId);
    this.databases = new Databases(this.client);
    this.userStorage = new Storage(this.client);
  }

  async createUser(username, userID) {
    try {
      return await this.databases.createDocument(
        envConfig.appWriteDBId,
        envConfig.appWriteUserCollectionId,
        ID.unique(),
        {
          username,
          userID,
        }
      );
    } catch (error) {
      console.error("Appwrite error ++ create userDB ++", error);
      throw error;
    }
  }

  async updateUser(
    docID,
    { username, profession, company, portfolioURL, displayImg }
  ) {
    try {
      const resp = await this.databases.updateDocument(
        envConfig.appWriteDBId,
        envConfig.appWriteUserCollectionId,
        docID,
        {
          username,
          profession,
          company,
          portfolioURL,
          displayImg,
        }
      );
      if (resp && username) {
        await authService.updateName(username);
      }
      return resp;
    } catch (error) {
      console.error("Appwrite error ++ update userDB ++", error);
      throw error;
    }
  }

  async getUser(userID, query = [Query.equal("userID", userID)]) {
    try {
      return await this.databases.listDocuments(
        envConfig.appWriteDBId,
        envConfig.appWriteUserCollectionId,
        query
      );
    } catch (error) {
      console.error("Appwrite error ++ get userDB ++", error);
      throw error;
    }
  }

  async uploadprofile(fileID) {
    try {
      return await this.userStorage.createFile(
        envConfig.appWriteUserBucketId,
        ID.unique(),
        fileID
      );
    } catch (error) {
      console.error("Appwrite error ++ upload dp ++", error);
      throw error;
    }
  }

  async deleteFile(fileID) {
    try {
      return await this.userStorage.deleteFile(
        envConfig.appWriteUserBucketId,
        fileID
      );
    } catch (error) {
      console.error("Appwrite error ++ delete dp ++", error);
      throw error;
    }
  }

  getFile(fileID) {
    return this.userStorage.getFilePreview(
      envConfig.appWriteUserBucketId,
      fileID
    );
  }
}

const userService = new UserService();

export default userService;
