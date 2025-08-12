const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const api = require("./api");
const middleware = require("./middleware");

const port = process.env.PORT || 1337;

const app = express();

// Point static root to the UI folder(note the ..)
app.use(
  express.static(path.resolve(__dirname, "..", "client-launchpad-frontend"))
);
app.use(middleware.cors);
app.use(bodyParser.json());

// Optional but recommend) Prefix API routes to avoid clashes with front-end paths
app.get("/api/customers", api.listCustomers);
app.get("/api/customer/:id", api.getCustomer);
app.post("/api/customer", api.createCustomer);
app.put("/api/customer/:id", api.editCustomerData);
app.delete("/api/customer/:id", api.deleteCustomer);

app.get("/api/projects", api.listProjects);
app.get("/api/project/:id", api.getProject);
app.post("/api/project", api.createProject);
app.put("/api/project/:id", api.editProject);
app.delete("/api/project/:id", api.deleteProject);

app.get("/api/inspirations", api.listInspirations);
app.get("/api/inspiration/:id", api.getInspiration);
app.post("/api/inspiration", api.createInspiration);
app.put("/api/inspiration/:id", api.editInspiration);
app.delete("/api/inspiration/:id", api.deleteInspiration);

app.use(middleware.handleValidationError);
app.use(middleware.handleError);
app.use(middleware.notFound);

// If you later enable HTML5 mode (no #), add this SPA fallback AFTER APIs:
// app.get("*", (req, res) => {
//   res.sendFile(
//     path.resolve(__dirname, "..", "client-launchpad-frontend", "index.html")
//   );
// });

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

if (require.main !== module) {
  module.exports = server;
}
