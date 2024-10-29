import pool from "../database/database.js";

export const validationUserData = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(409).end("Enter a all informations");
  }
  const userUsername = await pool.query(
    "select id from users where username = $1",
    [username]
  );
  const email_check = await pool.query(
    "select id from users where email = $1",
    [email]
  );
   // if (!checkPasswordForStrong(password)) {
  //   return res.status(400).end("Enter a strong password")
  // }
  if (userUsername.rows.length > 0 || email_check.rows.length > 0) {
    return res.status(409).end("Email or Username already exsist");
  }

  next();
};

export const validationLogin = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(409).end("Enter username and password");
  }
 
  next();
};

const checkPasswordForStrong = (password) => {
  let length = false;
  let num = false;
  let char = false;
  let upper = false;

  if (password.length >= 8) {
    length = true;
  }

  for (let i = 0; i <= 9; i++) {
    if (password.includes(`${i}`)) {
      num = true;
      break;
    }
  }
  const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;
  if (specialCharacters.test(password)) {
    char = true;
  }
  if (/[A-Z]/.test(password)) {
    upper = true;
  }
  return length && num && char && upper;
};
