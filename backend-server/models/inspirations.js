const { createId } = require("@paralleldrive/cuid2");

const db = require("../db");

const inspirationSchema = new db.Schema({
  _id: { type: String, default: createId },
  project_id: {
    type: String,
    ref: "Project",
    index: true,
    required: true,
  },
  url: String,
  description: String,
});

const Inspiration = db.model("Inspiration", inspirationSchema);

module.exports = {
  get,
  list,
  create,
  edit,
  remove,
  model: Inspiration,
};

async function list(opts = {}) {
  const { offset = 0, limit = 25, project, inspirationId } = opts;
  const query = {};
  if (project) query.project = project;
  if (inspirationId) query.inspirations = inspirationId;

  const inspirations = await Inspiration.find(query)
    .sort({ _id: 1 })
    .skip(offset)
    .limit(limit)
    .populate("project_id")
    .exec();

  return inspirations;
}

async function get(_id) {
  const inspiration = await Inspiration.findById(_id);
  return inspiration;
}

async function create(fields) {
  const inspiration = await Inspiration(fields).save();
  return inspiration;
}

async function edit(_id, change) {
  const inspiration = await get({ _id });
  Object.keys(change).forEach(function (key) {
    inspiration[key] = change[key];
  });
  await inspiration.save();
  return inspiration;
}

async function remove(_id) {
  await Inspiration.deleteOne({ _id });
}
