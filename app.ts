import Server from "./src/config/server";
import { environments } from "./src/config/environments";

const { server_port, graphqlPath } = environments;

const server = new Server({ server_port, graphqlPath });
server.start(() => {
  console.log(
    `⚡️[server]: Ready at http://localhost:${server_port}${graphqlPath}`
  );
});
