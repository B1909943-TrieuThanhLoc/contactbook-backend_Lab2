const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");
const ContactService = require("../services/contact.service");


exports.findAll=(req, res) => {
    res.send({messeage:"findAll handler"});
}

exports.findOne=(req, res) => {
    res.send({messeage:"findOne handler"});
}

exports.update=(req, res) => {
    res.send({messeage:"update handler"});
}

exports.delete=(req, res) => {
    res.send({messeage:"delete handler"});
}

exports.deleteAll=(req, res) => {
    res.send({messeage:"deleteAll handler"});
}

exports.findAllFavorite=(req, res) => {
    res.send({messeage:"findAllFavorite handler"});
}

// Create abd Save a new Contact 
exports.create= async(req, res, next) => {

    if (!req.body?.name){
        
          return next (new ApiError(400, "Name can not be empty"));
    }
    try{
        const contactServer = new ContactService(MongoDB.client);
        const document = await contactServer.create(req.body);
        return res.send(document);
    }
    catch (error){
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
};
// Retrieve
exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const contactService = new ContactService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await contactService.findByName(name);
        } else {
            documents = await contactService.find({});
        }
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while retrieving contacts'));
    }
    return res.send(documents);
}

//Find a singlle contact wiath an id
exports.findOne = async (req, res) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findById(req.params.id);

        return document
            ? res.send(document)
            : next(new ApiError(500, 'contact not found'));
    } catch (error) {
        return next(new ApiError(500, 'Error retrieving contact'));
    }
};

//Update
exports.update = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, 'Data to update can not be empty'));
    }
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.update(req.params.id, req.body);
        return document
            ? res.send({ message: req.body })
            : next(new ApiError(500, 'contact not found'));
    } catch (error) {
        return next(new ApiError(500, 'Error updating contact'));
    }
};

//delete
exports.delete = async (req, res) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.delete(req.params.id);

        return document
            ? res.send({ message: req.body })
            : next(new ApiError(500, 'contact not found'));
    } catch (error) {
        return next(new ApiError(500, 'Error updating contact'));
    }
};

//delete All
exports.deleteAll = async (req, res) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.deleteAll();

        return document
            ? res.send({ message: 'deleteAll was successfully' })
            : next(new ApiError(500, 'contact not found'));
    } catch (error) {
        return next(new ApiError(500, 'Error updating contact'));
    }
};

// fine Favorite
exports.findAllFavorite = async (_req, res, next) => {
    try{
        const contactServer = new ContactService(MongoDB.client);
        const documents = await contactServer.findFavorite();
        return res.send(documents);
    }catch (error){
        return next(
            new ApiError(
                500,
                "An error occured while retrieving favorite contacts "
            )
        );
    }
};