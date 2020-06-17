import React from 'react';
import { AuthProvider } from './contexts/AuthContext';

const MiddlewareProvider: React.FC = ({ children }) => <AuthProvider>{children}</AuthProvider>;
export default MiddlewareProvider;
