import { Client, Databases } from "node-appwrite";
import { envConfig } from "../src/config";

export default async ({ req, res, log, error }) => {
  const client = new Client();
  const databases = new Databases(client);

  client
    .setEndpoint(envConfig.appWriteURL)
    .setProject(envConfig.appWriteProjectId);

  const { status, category } = req.payload;

  return res.json(status, category);
};
