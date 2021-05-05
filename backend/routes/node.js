const router = require("express").Router();
let Node = require("../model/node");

router.post("/", async (req, res) => {
  const { firstName, lastName, dob, parent, child } = req.body;

  const node = new Node();

  node.firstName = firstName;
  node.lastName = lastName;
  node.birthday = dob;

  if (parent && child) {
    throw new Error("Bad Request");
  } else if (parent) {
    node.children.push(parent);
    await Node.findByIdAndUpdate(parent, {
      $set: {
        parent: node._id,
      },
    });
  } else if (child) {
    node.parent = child;
    await Node.findByIdAndUpdate(child, {
      $push: {
        children: node._id,
      },
    });
  }

  await node.save();
});

module.exports = router;
