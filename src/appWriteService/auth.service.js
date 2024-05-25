import { Account, Client, ID } from "appwrite";
import envConfig from "../config/envConfig";
import userService from "./user.service";

class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
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
        const savedb = await userService.createUser(name, resp.$id);
        if (savedb) {
          const loggedIn = await this.login({ email, password });
          if (loggedIn) {
            return this.account.createVerification(envConfig.verifyURL);
          }
        }
      } else {
        console.error("Appwrite error ++ account creation resp failed!");
        return resp;
      }
    } catch (error) {
      console.error("Appwrite error ++ account create ++", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
      // handle err in frontend comp.
    } catch (error) {
      console.error("Appwrite error ++ session Login ++", error);
      throw error;
    }
  }

  async logout() {
    try {
      return await this.account.deleteSession("current");
      // use deleteSessions() to logout across all devices
      // handle err in frontend comp.
    } catch (error) {
      console.error("Appwrite error ++ session Logout ++", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
      // handle err in frontend comp.
    } catch (error) {
      console.error("Appwrite error ++ currently loggedIn ++", error);
      throw error;
    }
  }

  async resetEmail({ email, resetURL }) {
    try {
      return await this.account.createRecovery(email, resetURL);
      // handle err in frontend comp.
    } catch (error) {
      console.error("Appwrite error ++ reset-pwd email ++", error);
      throw error;
    }
  }

  async updatePwd({ userID, secret, password, cnfPassword }) {
    try {
      return await this.account.updateRecovery(
        userID,
        secret,
        password,
        cnfPassword
      );
      // handle err in frontend comp.
    } catch (error) {
      console.error("Appwrite error ++ password update ++", error);
      throw error;
    }
  }

  async verifyEmail({ userID, secret }) {
    try {
      return await this.account.updateVerification(userID, secret);
      // handle err in frontend comp.
    } catch (error) {
      console.error("Appwrite error ++ verify account ++", error);
      throw error;
    }
  }

  async updateName(name) {
    try {
      return await this.account.updateName(name);
      // handle err in frontend comp.
    } catch (error) {
      console.error("Appwrite error ++ update name ++", error);
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
