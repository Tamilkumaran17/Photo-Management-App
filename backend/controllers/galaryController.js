const GalaryService = require('../services/galaryService');
const cloudinary = require('cloudinary').v2;

exports.uploadImage = async(req,res)=>{
try {
    const {title,description} = req.body;
    const fileBuffer = req.file.buffer;
    const base64 = fileBuffer.toString('base64');
    const result = await cloudinary.uploader.upload(`data:image/png;base64,${base64}`,{
        resource_type:"image"
    });
    console.log(result);
    
    if(result.http_code===400) return res.status(400).json({message:result.message});
    if(result.url){
        const dbResponse = await GalaryService.addImageData({imageURL:result.url,title,description, public_id: result.public_id});
        console.log(dbResponse);
        
        return res.status(200).json(dbResponse);
    }else{
        return res.status(400).json({message:"Unable to upload image"});
    }
} catch (error) {
    console.log(error);
    res.status(500).json({error:error.message});
}
}

exports.getAllImages = async(req,res)=>{
    try {
        const images = await GalaryService.getImageData();
        if(!images) return res.status(404).json({message:"No imagess"});
        res.status(200).json(images);

    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message});
    }
}

exports.deleteImage = async (req,res)=>{
    try {
        const id = req.params.id;
        const image = await GalaryService.getImageById(id);
        
        if(!image) return res.status(404).json({message:"Image not found"});
        const result = await cloudinary.uploader.destroy(image.public_id);
        console.log(result);
        
        if(result){
            const dbResponse = await GalaryService.deleateData(id);
            return res.status(200).json(dbResponse);
        }else{
            return res.status(400).json({message:"Unable to delete image"});
        }
        
    }catch(error){
        console.log(error);
    res.status(500).json({error:error.message});

    }


};

exports.update = async (req,res)=>{
    try {
        const id = req.params.id;
        const {title,description} = req.body;
        const image = await GalaryService.getById(id); 
        console.log(image + "image" + id);
        if(!image) return res.status(404).json({message:"Image not found"});

        image.title = title || image.title;
        image.description = description || image.description;

       const updated =  await image.save();
       res.status(200).json({message: "updated",updated});
    }catch(error){
        console.log(error);
        res.status(500).json({error : error.message});

    }

}
