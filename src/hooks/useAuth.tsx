import React, { ReactElement, useContext } from 'react'

export const AuthContext = React.createContext({})

interface AuthProviderProps {
    children: ReactElement,
    authManager: any,
  }

export const AuthProvider = ({ children, authManager }: AuthProviderProps) => {
  return (
    <AuthContext.Provider value={authManager}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)