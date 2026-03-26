// This is a simple file server that serves files from the current directory.
// I think it was necessary because when I created the deno deploy app, I didn't
// configure it as a static file server.
import { serveDir } from "jsr:@std/http/file-server";

Deno.serve((req) => {
  return serveDir(req, {
    fsRoot: ".",
    showDirListing: false,
    enableCors: true,
  });
});
