import { plainToClass } from "class-transformer";
import { API_SERVER } from "../constants";
import { request } from "../lib/request";
import { validator } from "../lib/validator";
import { UserData } from "./UserData";

const LOCAL_STORAGE_KEY = "deliveriDetails";

export async function saveUserData(userData: UserData): Promise<void> {
  await validator(UserData, userData);

  await request(API_SERVER + "session", {
    fetchOptions: {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json"
      }
    }
  });

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userData));
}

export function getUserData(): UserData {
  const raw = localStorage.getItem(LOCAL_STORAGE_KEY);

  return plainToClass(UserData, JSON.parse(raw));
}
