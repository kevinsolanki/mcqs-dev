const { findAllRoles } = require("../services/role.service")
const { findAllTech, createTech, deleteTech } = require("../services/tech.service")
const { response } = require("../utils/responseService")



exports.getAllRoles = async (req,res,next)=>{
    try {
        const roles = await findAllRoles()
        if(!roles.length){
            return response(res,200,'Roles list is empty') 
        }
        return response(res,200,'Roles list retrieved successfully',roles)
    } catch (error) {
        return response(res,500,error.message)
    }
}

exports.getAllTech = async(req,res,next)=>{
    try {
        const techs = await findAllTech()
        if(!techs.length){
            return response(res,200,'Roles list is empty') 
        }
        return response(res,200,'Roles list retrieved successfully',techs)
    } catch (error) {
        return response(res,500,error.message)
    }
}

exports.addNewTech = async(req,res,next)=>{
    try {
        const tech = await createTech(req.body.techName)
        return response(res,200,'Tech added successfully',tech.name)
    } catch (error) {
        return response(res,500,error.message)
    }
}

exports.deleteTech = async(req,res,next)=>{
    try {
        await deleteTech(req.params.techId)
        return response(res,200,'Tech deleted successfully')
    } catch (error) {
        return response(res,500,error.message)
    }
}

exports.getAllQuestions = async(req,res,next)=>{
    try {
        
    } catch (error) {
        return response(res,500,error.message)
    }
}

exports.addNewQuestions = async(req,res,next)=>{
    try {
        
    } catch (error) {
        return response(res,500,error.message)
    }
}


exports.deleteQuestion = async(req,res,next)=>{
    try {
        
    } catch (error) {
        return response(res,500,error.message)
    }
}