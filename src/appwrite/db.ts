import config from "../config";
import { Client, ID, Databases, Storage, Query } from "appwrite";
class DatabaseService {
  private client: Client;
  private databases: Databases;
  private bucket: Storage;

  constructor() {
    this.client = new Client()
      .setEndpoint(config.appwriteEndpoint)
      .setProject(config.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({
    title,
    slug,
    content,
    featuredImage,
    status,
    userId,
  }: Record<string, any>) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        ID.unique(),
        { title, slug, content, featuredImage, status, userId }
      );
    } catch (error) {
      console.error(
        "Appwrite Database Service :: createPost() :: Error",
        error
      );
      throw error;
    }
  }

  async updatePost(
    slug: string,
    { title, content, featuredImage, status }: Record<string, any>
  ) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        { title, content, featuredImage, status }
      );
    } catch (error) {
      console.error(
        "Appwrite Database Service :: updatePost() :: Error",
        error
      );
      throw error;
    }
  }

  async deletePost(slug: string) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.error(
        "Appwrite Database Service :: deletePost() :: Error",
        error
      );
      throw error;
    }
  }

  async getPost(slug: string) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.error("Appwrite Database Service :: getPost() :: Error", error);
      throw error;
    }
  }

  async getPosts(queries = [Query.equal("status", "publish")]) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.error("Appwrite Database Service :: getPosts() :: Error", error);
      throw error;
    }
  }

  async uploadFile(file: File) {
    try {
      return await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error(
        "Appwrite Database Service :: uploadFile() :: Error",
        error
      );
      throw error;
    }
  }

  async deleteFile(fileId: string) {
    try {
      return await this.bucket.deleteFile(config.appwriteBucketId, fileId);
    } catch (error) {
      console.error(
        "Appwrite Database Service :: deleteFile() :: Error",
        error
      );
      throw error;
    }
  }

  getFilePreview(fileId: string) {
    try {
      return this.bucket.getFilePreview(config.appwriteBucketId, fileId);
    } catch (error) {
      console.error(
        "Appwrite Database Service :: getFilePreview() :: Error",
        error
      );
      throw error;
    }
  }
}

const databaseService = new DatabaseService();

export default databaseService;
