import { Account, Client, ID } from "appwrite";
import envConfig from "../config/envConfig";

class AuthService {
  client = new Client();
  account;

  constructor() {
    client = this.client
      .setEndpoint(envConfig.appWriteURL)
      .setProject(envConfig.appWriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const resp = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (resp) {
        this.login({ email, password });
      } else {
        console.error("Appwrite error ++ account creation resp failed!");
      }
    } catch (error) {
      console.error("Appwrite error ++ account create ++", error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
      // handle err in frontend comp.
    } catch (error) {
      console.error("Appwrite error ++ session Login ++", error);
    }
  }

  async logout() {
    try {
      return await this.account.deleteSession("current");
      // use deleteSessions() to logout across all devices
      // handle err in frontend comp.
    } catch (error) {
      console.error("Appwrite error ++ session Logout ++", error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
      // handle err in frontend comp.
    } catch (error) {
      console.error("Appwrite error ++ currently loggedIn ++", error);
    }
  }
}

const authService = new AuthService();

export default authService;
