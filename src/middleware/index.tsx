import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { VaultProvider } from './contexts/VaultContext';

const MiddlewareProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <VaultProvider>{children}</VaultProvider>
  </AuthProvider>
);
export default MiddlewareProvider;
