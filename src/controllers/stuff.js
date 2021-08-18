const  Device = require('../models/Device');

exports.createThing = (req, res, next) =>  {
    delete req.body._id;
    const thing = new Device({
        ...req.body
    });
    thing.save()
        .then(() => res.status(201).json({message: 'Post saved successfully!'}))
        .catch(error => res.status(400).json({error}));
};

exports.modifyThing = (req, res, next) => {
    Device.updateOne({_id: req.params.id}, { ...req.body, _id: req.params.id})
        .then(() => res.status(200).json({message: "Thing updated successfully!"}))
        .catch(error => res.status(400).json({error}));
};

exports.deleteThing = (req, res, next) => {
    Device.deleteOne({_id: req.params.id})
        .then(()=> res.status(200).json({message: "Deleted"}))
        .catch(error => res.status(400).json({error}));
};

exports.getOneThing = (req, res, next) => {
    Device.findOne({_id: req.params.id})
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({error}));
};

exports.getAllThings = (req, res, next) => {
    Device.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
};