import { Client, ID, Databases, Storage, Query } from "react-native-appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    // Constants for project and collection IDs
    PROJECT_ID = '668bda35000c03a1e121';
    DATABASE_ID = '669f62ff003bb45cd1d3';
    COLLECTION_ID = '669f6325000fe359d491';
    BUCKET_ID = '669f68b0000222a9e998';

    constructor() {
        this.client
            .setEndpoint('https://cloud.appwrite.io/v1')
            .setProject(this.PROJECT_ID);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // Create a new post (interview question)
    async createPost(slug, { question_id, question_text, category, difficulty, created_at, perfectAnswer, userId }) {
        try {
            return await this.databases.createDocument(
                this.DATABASE_ID,
                this.COLLECTION_ID,
                slug,
                {
                    question_id,
                    question_text,
                    category,
                    difficulty,
                    created_at,
                    perfectAnswer,
                    userId
                }
            );
        } catch (error) {
            console.error("Appwrite service :: createPost :: error", error);
        }
    }

    // Update an existing post (interview question)
    async updatePost(slug, { question_id, question_text, category, difficulty, created_at, updated_at, perfectAnswer, userAnswer, attempted_at, feedback, userId }) {
        try {
            return await this.databases.updateDocument(
                this.DATABASE_ID,
                this.COLLECTION_ID,
                slug,
                {
                    question_id,
                    question_text,
                    category,
                    difficulty,
                    created_at,
                    updated_at,
                    perfectAnswer,
                    userAnswer,
                    feedback,
                    attempted_at,
                    userId
                }
            );
        } catch (error) {
            console.error("Appwrite service :: updatePost :: error", error);
        }
    }

    // Delete a post (interview question)
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                this.DATABASE_ID,
                this.COLLECTION_ID,
                slug
            );
            return true;
        } catch (error) {
            console.error("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    // Get a specific post (interview question) by slug
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                this.DATABASE_ID,
                this.COLLECTION_ID,
                slug
            );
        } catch (error) {
            console.error("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    // Get a list of active posts (interview questions)
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                this.DATABASE_ID,
                this.COLLECTION_ID,
                queries
            );
        } catch (error) {
            console.error("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }

    // file upload service

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                this.BUCKET_ID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                this.BUCKET_ID,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            this.BUCKET_ID,
            fileId
        )
    }
}


const service = new Service()

export default service