import React, { createContext, useState } from 'react';
import type { User,ModuloSistema, UserContextType } from '../types/UserContext';

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  const [modulosistema, setModuloSistema] = useState<ModuloSistema[]>([])

  const addModulo = (modulo: ModuloSistema) => {
    setModuloSistema(prev => [...prev, modulo]);
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      setUser,
      modulosistema,
      setModuloSistema,
      addModulo // Añadida al contexto
    }}>
      {children}
    </UserContext.Provider>
  );
};