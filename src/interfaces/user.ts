export interface User {
  userName: string;
  score: number;
}

export interface UserState extends User {
  loading: false;
}
