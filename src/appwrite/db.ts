import config from "../config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

interface PostParams {
  title: string;
  slug: string;
  content: string;
  featuredImage: string;
  status: "publish" | "draft";
  userId: string;
}

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
  }: PostParams) {
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
    { title, content, featuredImage, status }: PostParams
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
    }
    return false;
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
    }
    return false;
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
    }
    return false;
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
    }
    return false;
  }

  async deleteFile(fileId: string) {
    try {
      return await this.bucket.deleteFile(config.appwriteBucketId, fileId);
    } catch (error) {
      console.error(
        "Appwrite Database Service :: deleteFile() :: Error",
        error
      );
    }
    return false;
  }

  getFilePreview(fileId: string) {
    try {
      return this.bucket.getFilePreview(config.appwriteBucketId, fileId);
    } catch (error) {
      console.error(
        "Appwrite Database Service :: getFilePreview() :: Error",
        error
      );
    }
    return false;
  }
}

const databaseService = new DatabaseService();

export default databaseService;
