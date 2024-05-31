import { Client, Databases, Query, Storage } from "appwrite";
import { envConfig } from "../config";

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

  // async addCategory({ categoryName, defaultImage }) {
  //   try {
  //     const check = await this.getCategories([
  //       Query.contains("categoryName", categoryName),
  //     ]);
  //     if (check.total === 0 && check.documents.length === 0) {
  //       return await this.databases.createDocument(
  //         envConfig.appWriteDBId,
  //         envConfig.appWriteCategoryCollectionId,
  //         ID.unique(),
  //         {
  //           categoryName,
  //           defaultImage,
  //           count: 1,
  //         }
  //       );
  //     } else if (check.total > 0 && check.documents.length > 0) {
  //       return await this.updateCategory(check, defaultImage);
  //     }
  //   } catch (error) {
  //     console.error("Appwrite error ++ add category ++", error);
  //     throw error;
  //   }
  // }

  // async updateCategory(category, Image) {
  //   try {
  //     let updateValues = {
  //       count: category.documents[0]?.count + 1,
  //     };
  //     if (!category.documents[0]?.defaultImage) {
  //       updateValues.defaultImage = Image;
  //     }
  //     return await this.databases.updateDocument(
  //       envConfig.appWriteDBId,
  //       envConfig.appWriteCategoryCollectionId,
  //       category.documents[0]?.$id,
  //       updateValues
  //     );
  //   } catch (error) {
  //     console.error("Appwrite error ++ update category ++", error);
  //     throw error;
  //   }
  // }

  // async revertCategory(thumbnail, category) {
  //   try {
  //     let revertValues = {
  //       count: category.documents[0]?.count - 1,
  //     };
  //     if (category.documents[0]?.defaultImage === thumbnail) {
  //       const newImage = await dbService.getAllPosts([
  //         Query.equal("category", category.documents[0]?.categoryName),
  //         Query.isNotNull("thumbnail"),
  //       ]);
  //       if (newImage.total > 0 && newImage.documents.length > 0) {
  //         revertValues.defaultImage = newImage.documents[0]?.thumbnail;
  //       }
  //     }
  //     return await this.databases.updateDocument(
  //       envConfig.appWriteDBId,
  //       envConfig.appWriteCategoryCollectionId,
  //       category.documents[0]?.$id,
  //       revertValues
  //     );
  //   } catch (error) {
  //     console.error("Appwrite error ++ revert category ++", error);
  //     throw error;
  //   }
  // }

  // async deleteCategory(thumbnail, categoryName) {
  //   try {
  //     const fetch = await this.getCategories([
  //       Query.equal("categoryName", categoryName),
  //     ]);
  //     if (fetch.total > 0 && fetch.documents[0]?.count > 1) {
  //       return await this.revertCategory(thumbnail, fetch);
  //     }
  //     if (fetch.documents[0]?.count === 1) {
  //       return await this.databases.deleteDocument(
  //         envConfig.appWriteDBId,
  //         envConfig.appWriteCategoryCollectionId,
  //         fetch.documents[0]?.$id
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Appwrite error ++ delete category ++", error);
  //     throw error;
  //   }
  // }
}

const categoryService = new CategoryService();

export default categoryService;
