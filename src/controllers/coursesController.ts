import { Request, Response } from "express"
import { courseService } from "../services/courseService"
import { getPaginationParams } from "../helpers/getPaginationParams"

export const coursesController = {
        //GET /courses/featured
    featured: async (req: Request, res: Response) => {
        try{
            const featuredCourses = await courseService.getRandomFeaturedCourses()
            return res.json(featuredCourses)
        }catch(err){
            if(err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }   
        }
    },

    //GET /courses/newest
    newest: async (req: Request, res: Response) => {
        try{
            const newestCourses = await courseService.getTopTenNewst()
            return res.json(newestCourses)
        }catch(err){
            if(err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }   
        }
    },

    //GET /courses/search?name=
    search: async (req: Request, res: Response) => {
        const { name } = req.query
        const [page, perPage] = getPaginationParams(req.query)
        try{
            if ( typeof name !== 'string') throw new Error ('Name must be a string')
            const courses = await courseService.findByName(name, page, perPage)
            return res.json(courses)
        }catch(err){
            if(err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }   
        }
    },
    //GET /courses/:id
    show: async (req: Request, res: Response) => {
        const { id } = req.params

        try{
            const course = await courseService.findByIdWithEpisodes(id)
            return res.json(course)
        }catch(err){
            if(err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }   
        }
    }
}