const { rest } = require("msw");
const { setupServer } = require("msw/node");
const url = "https://api.backend.dev/user";

const server = setupServer(
  rest.all(url, (req, res, ctx) => {
    return res(ctx.status(200));
  })
);

server.listen({
  onUnhandledRequest: "error",
});

const util = require("util");
const request = require("request");
const requestPromise = util.promisify(request);

async function load() {
  const options = {
    url: "https://api.backend.dev/user/",
  };
  try {
    const response = await requestPromise(options);
    console.log(response.status);
  } catch (error) {
    console.log(error);
  }
}

server.printHandlers();
load();
server.close();
