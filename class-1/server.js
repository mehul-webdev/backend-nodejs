const http = require("http");

const server = http.createServer((req, res) => {
  //   res.setHeader("Content-Type", "text/html");
  //   res.write("<html><body><h1>Hello World</h1></body></html>");

  res.setHeader("Content-Type", "application/json");

  res.write(
    JSON.stringify({
      message: "Hello World",
      date: new Date(),
    })
  );

  res.end();
});

server.listen(3000, "localhost", () => {
  console.log("server is running");
});
