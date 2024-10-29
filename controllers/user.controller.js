import {
  addNewUserToTable,
  loginUserToSystem,
} from "../service/index.service.js";

export async function addNewUser(req, res, next) {
  try {
    const userDataFromBody = req.body;
    const lamp = await addNewUserToTable(userDataFromBody);
    const { success } = lamp;
    if (success) {
      return res.status(201).send("User created successfully");
    } else {
      throw new Error(lamp.err);
    }
  } catch (error) {
    next(error);
  }
}

export async function loginIn(req, res, next) {
  try {
    const { username, password } = req.body;
    const result = await loginUserToSystem(username, password);
    const { found } = result;

    if (found) {
      res.status(200).send("You are loged in successfully");
    } else {
      res.status(400).send("Username or password incorrect");
    }
  } catch (error) {
    next(error);
  }
}
