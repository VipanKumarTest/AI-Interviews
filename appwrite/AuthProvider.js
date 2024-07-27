// AuthProvider.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from './auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkUserSession();
    }, []);

    const checkUserSession = async () => {
        setLoading(true);
        const isAuthenticated = await authService.checkAuth();
        if (isAuthenticated) {
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);
        }
        setLoading(false);
    };

    const register = async (user, email, password) => {
        const session = await authService.createAccount(user, email, password);
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
        return session;
    }

    const login = async (email, password) => {
        const session = await authService.login(email, password);
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
        return session;
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
    };

    const profileImage = () => {
        if (user) {
            return user.name[0].toUpperCase();
        }
    }

    const value = {
        user,
        loading,
        register,
        login,
        logout,
        profileImage
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};