import dotenv from "dotenv";

dotenv.config();

export const environments = {
  environment: process.env.ENVIRONMENT,
  server_port: process.env.SERVER_PORT,
  graphqlPath: process.env.GRAPHQL_PATH,
};
