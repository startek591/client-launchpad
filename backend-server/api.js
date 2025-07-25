const Customers = require("./models/customers");
const Projects = require("./models/projects");

module.exports = {
  getCustomer,
  listCustomers,
  createCustomer,
  editCustomerData,
  deleteCustomer,
  getProject,
  createProject,
  listProjects,
  editProject,
  deleteProject,
};

async function getCustomer(req, res, next) {
  const { id } = req.params;

  const customer = await Customers.get(id);
  if (!customer) return next();

  res.json(customer);
}

async function listCustomers(req, res) {
  const { offset = 0, limit = 25 } = req.query;

  const customers = await Customers.list({
    offset: Number(offset),
    limit: Number(limit),
  });

  res.json(customers);
}

async function editCustomerData(req, res) {
  const change = req.body;
  const customer = await Customers.edit(req.params.id, change);

  res.json(customer);
}

async function createCustomer(req, res) {
  try {
    const customer = await Customers.create(req.body);
    res.status(201).json(customer);
  } catch (err) {
    console.error("Error creating customer:", err.message);

    if (err.message.includes("already exists")) {
      return res.status(400).json({ error: err.message });
    }

    if (err.code === 11000) {
      return res
        .status(400)
        .json({ error: "Duplicate entry. Customer already exists." });
    }

    if (err.name === "ValidationError") {
      return res.status(400).json({
        error: "Validation failed",
        details: err.errors,
      });
    }

    res.status(500).json({ error: "Server error" });
  }
}

async function deleteCustomer(req, res) {
  await Customers.remove(req.params.id);
  res.json({ success: true });
}

async function getProject(req, res) {
  try {
    const project = await Projects.get(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (err) {
    console.error("❌ Error retrieving project:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}

async function createProject(req, res) {
  try {
    const customer = await Customers.get(req.body.customer_id);
    if (!customer) return res.status(404).json({ error: "Customer not found" });

    const project = await Projects.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    console.error("❌ Error creating project:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}

async function listProjects(req, res) {
  const { offset = 0, limit = 25, projectId } = req.query;

  const opts = {
    offset: Number(offset),
    limit: Number(limit),
    projectId,
  };

  const projects = await Projects.list(opts);

  res.json(projects);
}

async function editProject(req, res) {
  try {
    const project = await Projects.get(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    Object.keys(req.body).forEach((key) => {
      project[key] = req.body[key];
    });

    await project.save();
    res.json(project);
  } catch (err) {
    console.error("❌ Failed to update project:", err.message);
    res.status(500).json({ errror: "Server error" });
  }
}

async function deleteProject(req, res) {
  await Projects.remove(req.params.id);
  res.json({ success: true });
}
