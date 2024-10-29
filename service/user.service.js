import pool from "../database/database.js";
import fs from "fs"
import path from "path"

const dirPath = process.cwd()
const filePath = path.join(dirPath, "database/lastLoginedUser.txt")

export const lastLoginedUserId = () => {
  try {
    const lastIndex = fs.readFileSync(filePath, "utf8");
    return lastIndex; 
  } catch (error) {
    console.error("File reading error:", error);
  }
};
const writeLastIndex = (lastIndex) => {
  try {
    fs.writeFileSync(filePath, lastIndex, "utf8");
  } catch (error) {
    console.error("Faylni yozishda xato:", error);
  }
};



export const addNewUserToTable = async function (userData) {
  try {
    const { username, email, password } = userData;
    await pool.query(
      `INSERT INTO users (username, email, password) 
           VALUES ($1, $2, $3)`,
      [username, email, password]
    );

    return { success: true };
  } catch (err) {
    return { success: false, err };
  }
};

export const loginUserToSystem = async function (username, password) {
  const result = await pool.query(
    `select id
        from users
        WHERE username = $1 and password = $2
               `,
    [username, password]
  );

  if (result.rows.length > 0) {
    writeLastIndex(result.rows[0].id)
    return { found: true, userId: result.rows[0].id };
  } else {
    return { found: false, userId: null };
  }
};

