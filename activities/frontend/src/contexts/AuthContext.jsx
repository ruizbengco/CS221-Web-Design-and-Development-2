import {createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
            setUser(currentUser);
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        const data = await authService.login(credentials);
        // Backend returns { _id, username, token } - create user object
        const userData = {
            _id: data._id,
            username: data.username,
            email: credentials.email,
        };
        setUser(userData);
        // Notify other components (like CartContext) that auth changed
        window.dispatchEvent(new Event("auth-change"));
        return data;
    };

    const register = async (userData) => {
        const data = await authService.register(userData);
        return data;
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
        // Notify other components (like CartContext) that auth changed
        window.dispatchEvent(new Event("auth-change"));
    };

    const updateProfile = async (userData) => {
        const data = await authService.updateProfile(userData);
        // Update local state with new user data
        setUser(data.user);
        return data;
    };

    const value = {
        user,
        login,
        register,
        logout,
        updateProfile,
        loading,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider.");
    }
    return context;
};