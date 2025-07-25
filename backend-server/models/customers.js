const { createId } = require("@paralleldrive/cuid2");
const { isEmail } = require("validator");

const db = require("../db");
const Project = require("./projects").model;

const customerSchema = new db.Schema({
  _id: { type: String, default: createId },
  name: { type: String, required: true },
  email: emailSchema({ required: true }),
  phone: { type: String, required: true },
  business_name: { type: String, required: true },
  industry: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

customerSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      await Project.deleteMany({ customer_id: this.id });
      next();
    } catch (err) {
      console.error("❌ Failed to delete associated projects:", err.message);
      next(err);
    }
  }
);

const Customer = db.model("Customer", customerSchema);

module.exports = {
  get,
  list,
  create,
  edit,
  remove,
  model: Customer,
};

async function list(opts = {}) {
  const { offset = 0, limit = 25, customerId, status } = opts;

  const query = {};
  if (customerId) query.customer = customerId;
  if (status) query.status = status;

  const customers = await Customer.find(query)
    .sort({ _id: 1 })
    .skip(offset)
    .limit(limit);

  return customers;
}

async function get(_id) {
  const customer = await Customer.findById(_id);
  return customer;
}

async function create(fields) {
  const customer = new Customer(fields);
  await isUnique(customer);
  await customer.save();
  return customer;
}

async function edit(_id, change) {
  const customer = await get(_id);
  Object.keys(change).forEach(function (key) {
    customer[key] = change[key];
  });

  if (change.password) await customer.save();
  return customer;
}

async function remove(_id) {
  const customer = await Customer.findById({ _id });
  if (!customer) throw new Error("Customer not found");

  await customer.deleteOne();
}

async function isUnique(customer) {
  const existing = await Customer.findOne({
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
  });

  if (existing) {
    throw new Error(
      `❌ A customer with name "${customer.name}", email "${customer.email}", and phone "${customer.phone}" already exists.`
    );
  }
}

function emailSchema(opts = {}) {
  const { required } = opts;
  return {
    type: String,
    required: !!required,
    validate: {
      validator: isEmail,
      message: (props) => `${props.value} is not a valid email address`,
    },
  };
}
