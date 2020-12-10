const db = require("../models");
const Demo = db.demo;

exports.create = (req, res) => {
    if (!req.body.fullname) {
        res.status(400).send({message: "Full name can not be empty"});
        return;
    }
    const demo = new Demo({
        fullname: req.body.fullname,
        dept: req.body.dept,
        address: req.body.address,
        isActive: req.body.isActive ? req.body.isActive : false
    });

    demo.save(demo).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Demo not create, there is an issue."
        });
    });
};

exports.findAll = (req, res) => {
    const demo = req.query.demo;
    let condition = demo ? {demo: {$regex: new RegExp(demo), $options: "i"}} : {};

    Demo.find(condition).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Didn't find Demo data"
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Demo.findById(id).then(data => {
        if (!data)
            res.status(404).send({
                message: "Demo Not find, the id is " + id
            });
        else
            res.send(data)
    }).catch(err => {
        res.status(500).send({message: "Error when find Demo id " + id});
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Demo.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: 'Cannot update Demo with id='+id+'.'
                });
            } else res.send({message: "Demo was updated successfully."});
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Demo with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Demo.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: 'Cannot delete Demo with id='+id
                });
            } else {
                res.send({
                    message: "Demo was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Demo with id=" + id
            });
        });
};


exports.findAllDemo = (req, res) => {
    Demo.find({ isActive: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while fetching demos."
            });
        });
};



