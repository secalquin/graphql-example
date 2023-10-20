import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express, { Application } from "express";
import http from "http";
import cors from "cors";
import { typeDefs, resolvers } from "../graphql/schema";
import { environments } from "./environments";
import morgan from "morgan";

const { environment } = environments;

interface IServerConfig {
  server_port: string | number;
  graphqlPath: string;
}

interface IServer {
  start(callback: () => void): void;
}

class Server implements IServer {
  private app: Application;
  private port: string | number;
  private graphqlPath: string;

  constructor({ server_port, graphqlPath }: IServerConfig) {
    this.app = express();
    this.port = server_port;
    this.graphqlPath = graphqlPath;

    this.middlewares();
  }

  private middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  async start(callback: () => void) {
    const httpServer = http.createServer(this.app);
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      includeStacktraceInErrorResponses: environment === "development",
    });

    await server.start();

    this.app.use(
      this.graphqlPath,
      cors(),
      express.json(),
      morgan("tiny"),
      expressMiddleware(server)
    );

    httpServer.listen(this.port, callback);
  }
}

export default Server;
