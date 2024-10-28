// controllers/admin.controller.ts
import { NextFunction, Request, Response } from 'express'
import httpResponse from '../../../handlers/httpResponse'
import httpError from '../../../handlers/errorHandler/httpError'
import adminRepository from './repo/admin.repository'
import { IProjectWithId } from '../../site-production/_shared/types/project.interface'
import responseMessage from '../../../constant/responseMessage'
// import { getProjectDetailsByIdService } from './service'

const adminController = {
    viewAllProjects: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const projects: IProjectWithId[] = await adminRepository.bringAllProjects()
            httpResponse(res, req, 200, responseMessage.SUCCESS, projects) // Return projects in a structured response
        } catch (error) {
            console.error('Error in viewAllProjects:', error)
            httpError(next, error, req, 500) // Pass the error to the error handler
        }
    },
    getProjectByID: async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        try {
            const project = await adminRepository.getProjectDetailsById(id)

            if (!project) {
                return httpResponse(res, req, 404, `${project} Project not found`, null) // Return a 404 status with a meaningful message
            }
            httpResponse(res, req, 200, responseMessage.SUCCESS, project)
        } catch (error) {
            console.error('Error in getProjectByID:', error)
            httpError(next, error, req, 500)
        }
    }
}

export default adminController
