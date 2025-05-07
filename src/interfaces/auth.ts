export interface Auth {
  id?: string;
  name: string;
}

export interface AuthState extends Auth {
  hasAuth: boolean;
}
