const dotenv = require("dotenv");

dotenv.config();

export const uri = process.env.CONNECTION_STRING;
