const router = require('express').Router();
let Node = require('../model/node');

router.post('/', async (req, res) => {
    const { firstName, lastName, birthday, targetId, procedure } = req.body;

    const node = new Node();

    node.firstName = firstName;
    node.lastName = lastName;
    node.birthday = birthday;

    if (procedure === 'P') {
        node.children.push(targetId);
        await Node.findByIdAndUpdate(targetId, {
            $set: {
                parent: node._id,
            },
        });
    } else if (procedure === 'C') {
        node.parent = targetId;
        await Node.findByIdAndUpdate(targetId, {
            $push: {
                children: node._id,
            },
        });
    }

    return res.json({
        node: await node.save(),
    });
});

router.get('/', async (req, res) => {
    let query = {
        parent: null,
    };

    if (req.query.id) {
        query = {
            _id: req.query.id,
        };
    }
    try {
        const node = await Node.find(query);

        return res.json({
            node,
        });
    } catch (e) {}
});

module.exports = router;
