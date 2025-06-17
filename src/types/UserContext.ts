export interface User {
  name: string;
  
}
export interface ModuloSistema{
    title:string
}
export interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    modulosistema: ModuloSistema[]; // Cambiado a array
    setModuloSistema: (modulosistema: ModuloSistema[]) => void;
    addModulo: (modulo: ModuloSistema) => void;
}

