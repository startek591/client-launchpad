const express = require("express");
const bodyParser = require("body-parser");

const api = require("./api");
const middleware = require("./middleware");

const port = process.env.PORT || 1337;

const app = express();

app.use(middleware.cors);
app.use(bodyParser.json());

app.get("/customers", api.listCustomers);
app.get("/customer/:id", api.getCustomer);
app.post("/customer", api.createCustomer);
app.put("/customer/:id", api.editCustomerData);
app.delete("/customer/:id", api.deleteCustomer);

app.get("/projects", api.listProjects);
app.get("/project/:id", api.getProject);
app.post("/project", api.createProject);
app.put("/project/:id", api.editProject);
app.delete("/project/:id", api.deleteProject);

app.get("/inspirations", api.listInspirations);
app.get("/inspiration/:id", api.getInspiration);
app.post("/inspiration", api.createInspiration);
app.put("/inspiration/:id", api.editInspiration);
app.delete("/inspiration/:id", api.deleteInspiration);

app.use(middleware.handleValidationError);
app.use(middleware.handleError);
app.use(middleware.notFound);

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

if (require.main !== module) {
  module.exports = server;
}
