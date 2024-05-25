import { Client, Databases, ID, Storage } from "appwrite";
import { envConfig } from "../config";

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

  async updateUser(userID, { username, profession, company, portfolioURL }) {
    try {
      return await this.databases.updateDocument(
        envConfig.appWriteDBId,
        envConfig.appWriteUserCollectionId,
        userID,
        {
          username,
          profession,
          company,
          portfolioURL,
        }
      );
    } catch (error) {
      console.error("Appwrite error ++ update userDB ++", error);
      throw error;
    }
  }
}

const userService = new UserService();

export default userService;
