import { Client, ID, Databases, Storage, Query } from "react-native-appwrite";

class UserDetailService {
    client = new Client();
    databases;
    bucket;

    // Constants for project and collection IDs
    PROJECT_ID = '668bda35000c03a1e121';
    DATABASE_ID = '669f62ff003bb45cd1d3';
    COLLECTION_ID = '66a4c8ae000447868531';
    BUCKET_ID = '669f68b0000222a9e998';

    constructor() {
        this.client
            .setEndpoint('https://cloud.appwrite.io/v1')
            .setProject(this.PROJECT_ID);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // Create a new user detail

    async createUserDetail(slug, userData) {
        console.log('createUserDetail ===>', slug, userData);
        try {
            return await this.databases.createDocument(
                this.DATABASE_ID,
                this.COLLECTION_ID,
                slug,
                userData
            );
        } catch (error) {
            console.error("Appwrite service :: createUserDetail :: error", error);
        }
    }

    // Update an existing user detail
    async updateUserDetail(slug, userData) {
        try {
            return await this.databases.updateDocument(
                this.DATABASE_ID,
                this.COLLECTION_ID,
                slug,
                userData
            );
        } catch (error) {
            console.error("Appwrite service :: updateUserDetail :: error", error);
        }
    }

    async getUserDetails(slug) {
        try {
            return await this.databases.getDocument(
                this.DATABASE_ID,
                this.COLLECTION_ID,
                slug
            );
        } catch (error) {
            console.error("Appwrite service :: getUserDetails :: error", error);
        }
    }

}

const userDetailService = new UserDetailService()

export default userDetailService;