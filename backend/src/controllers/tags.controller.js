/*     postTagsController,
    getTagsController,
    getTagsByIdController */
import TagsService from "../services/tag.service.js"

const tagsService = new TagsService()

export const getTagsController=async(req,res)=>{
    try {
        const tags = await tagsService.getAll()
        res.status(200).send({status:"Success", payload:tags})
    } catch (error) {
        res.status(500).send("error")
    }
}

export const getTagsByIdController=async(req,res)=>{
    try {
        const {tid}=req.params
        const tag = await tagsService.getById(tid)
        if (!tag) {
            return res.status(404).send("No se encontro el tag")
        }
        res.status(200).send({status:"Success", payload:tag})
    } catch (error) {
        res.status(500).send("error")
    }
}

export const postTagsController=async(req,res)=>{
    try {
        const {name, color}=req.body;
        if(!name, !color){
            return res.status(400).send("Debe completar los campos")
        }
        const tag = await tagsService.create({name, color})
        res.status(200).send({status:"Success", payload:tag})
    } catch (error) {
        res.status(500).send("error")
    }
}