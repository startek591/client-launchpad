const { createId } = require("@paralleldrive/cuid2");

const db = require("../db");
const Inspiration = require("./inspirations").model;

const projectSchema = new db.Schema({
  _id: { type: String, default: createId },
  customer_id: {
    type: String,
    ref: "Customer",
    index: true,
    required: true,
  },
  project_type: {
    type: String,
    enum: ["website", "app", "both"],
    required: true,
  },
  goals: [String],
  has_brand_assets: Boolean,
  brand_assets_description: String,
  existing_website_url: String,
  launch_date_goal: Date,
  budget_estimate: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
  website_requirements: {
    pages_needed: [String],
    features_needed: [String],
    has_content_ready: Boolean,
    content_details: String,
  },
  app_requirements: {
    platforms: [String],
    features_needed: [String],
    notes: String,
  },
});

projectSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      await Inspiration.deleteMany({ project_id: this._id });
      next();
    } catch (err) {
      console.error("❌ Failed to delete associated inspirations", err.message);
      next(err);
    }
  }
);

const Project = db.model("Project", projectSchema);

module.exports = {
  get,
  list,
  create,
  edit,
  remove,
  model: Project,
};

async function list(opts = {}) {
  const { offset = 0, limit = 25, customer, projectId } = opts;
  const query = {};
  if (customer) query.customer = customer;
  if (projectId) query.projects = projectId;

  const projects = await Project.find(query)
    .sort({ _id: 1 })
    .skip(offset)
    .limit(limit)
    .populate("customer_id")
    .exec();

  return projects;
}

async function get(_id) {
  const project = await Project.findById(_id).populate("customer_id").exec();
  return project;
}

async function create(fields) {
  const project = await Project(fields).save();
  await project.populate("customer_id");
  return project;
}

async function edit(_id, change) {
  const project = await get({ _id });
  Object.keys(change).forEach(function (key) {
    project[key] = change[key];
  });
  await project.save();
  return project;
}

async function remove(_id) {
  const project = await Project.findById({ _id });
  if (!project) throw new Error("Project not found");
  await project.deleteOne({ _id });
}
