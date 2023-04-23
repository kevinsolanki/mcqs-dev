const techModel = require('../models/tech.model')

exports.findAllTech = async ()=>{
    return await techModel.find({isDeleted:false},{isDeleted:false}).lean()
}

exports.createTech = async (techName)=>{
    return await techModel.create({name: techName})
}

exports.deleteTech = async (techId)=>{
    return await techModel.findByIdAndUpdate(techId,{isDeleted:true})
}