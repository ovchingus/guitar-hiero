/**
 * @file Serve the built Next.js application
 * @description This file is used to serve the built Next.js application with local testing purposes. It respects the basePath and public path from the next.config.ts file.
 */

import handler from "serve-handler";
import http from "http";

import nextConfig from "./next.config.ts";

const basePath = nextConfig.basePath ?? "/";
const PUBLIC_PATH = "out";

const server = http.createServer((request, response) => {
  // Remove the base path from the request URL
  const url = request.url?.replace(basePath, "/");
  request.url = url;

  return handler(request, response, {
    public: PUBLIC_PATH,
    rewrites: [],
  });
});

server.listen(3000, () => {
  console.log(`Running at http://localhost:3000${basePath}`);
});
