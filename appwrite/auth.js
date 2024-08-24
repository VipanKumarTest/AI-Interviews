import { Client, Account, ID } from 'react-native-appwrite';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SESSION_KEY = 'user_session';

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint('https://cloud.appwrite.io/v1')
            .setProject('668bda35000c03a1e121');
        this.account = new Account(this.client);
    }

    async createAccount(email, password, name) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                console.log(userAccount);
                return this.login(email, password);
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login(email, password) {
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
            await this.saveSession(session);
            return session;
        } catch (error) {
            throw error;
        }
    }

    async generateOtp(email, url) {
        try {
            const response = await this.account.createRecovery(email, url);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async verifyOtp(email, code, newPassword, re_newPassword) {
        try {
            const response = await this.account.updateRecovery(email, code, newPassword, re_newPassword);
            return response;
        } catch (error) {
            throw error;
        }
    }

    // ! Impliment
    async createAnonymousUserSession() {
        try {
            const session = await this.account.createAnonymousSession();
            await this.saveSession(session);
            return session;
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
            await this.clearSession();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }

    async saveSession(session) {
        await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }

    async getSession() {
        const sessionData = await AsyncStorage.getItem(SESSION_KEY);
        return sessionData ? JSON.parse(sessionData) : null;
    }

    async clearSession() {
        await AsyncStorage.removeItem(SESSION_KEY);
    }

    async checkAuth() {
        const session = await this.getSession();
        if (session) {
            // Validate the session with Appwrite
            try {
                await this.account.getSession(session.$id);
                return true;
            } catch (error) {
                console.log("Session invalid or expired");
                await this.clearSession();
            }
        }
        return false;
    }

    // ! Impliment
    async allListSessions() {
        try {
            return await this.account.listSessions();
        } catch (error) {
            console.log("Appwrite service :: allListSessions :: error", error);
        }
        return null;
    }
    async deleteAllSessions() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: allListSessions :: error", error);
        }
        return null;
    }
}

const authService = new AuthService();

export default authService;