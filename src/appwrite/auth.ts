import config from "../config";
import { Client, Account, ID } from "appwrite";

interface UserParams {
  name?: string;
  email: string;
  password: string;
}

class AuthService {
  private client: Client;
  private account: Account;

  constructor() {
    this.client = new Client()
      .setEndpoint(config.appwriteEndpoint)
      .setProject(config.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ name, email, password }: UserParams) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return await this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.error("Appwrite Auth Service :: createAccount() :: Error", error);
      throw error;
    }
  }

  async login({ email, password }: UserParams) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.error("Appwrite Auth Service :: login() :: Error", error);
      throw error;
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.error("Appwrite Auth Service :: logout() :: Error", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error(
        "Appwrite Auth Service :: getCurrentUser() :: Error",
        error
      );
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
