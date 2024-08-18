const imageModel = require('../models/imageModel');
class GalaryService{
    static  addImageData = async(data)=>{
        const newImage = new imageModel(data);
        return await newImage.save();
    }

    static getImageData = async()=>{
        return await imageModel.find().select(`-_id`);
    }

    static deleateData = async(id)=>{
        return await imageModel.deleteOne({id});
    }

    static getImageById = async (id)=>{
        return await imageModel.findOne({id}).select(`-_id`);
    }
}

module.exports = GalaryService;