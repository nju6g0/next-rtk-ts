import { User as UserType } from "@/interfaces";

const USERS = "users";

export const loadUsers = () => {
  try {
    const raw = localStorage.getItem(USERS);
    console.log(raw);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveUser = (user: UserType) => {
  const users = loadUsers();
  const data = [...users, user];
  localStorage.setItem(USERS, JSON.stringify(data));
};

export const clearUsersData = () => {
  localStorage.removeItem(USERS);
};
