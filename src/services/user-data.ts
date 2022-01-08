import { API_SERVER } from "../constants";
import { request } from "../lib/request";
import { validator } from "../lib/validator";
import { UserData } from "./UserData";


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
}

export async function getUserData(): Promise<UserData> {
  const result = await request(API_SERVER + "session", {
    options: { json: true }
  });

  return result;
}
