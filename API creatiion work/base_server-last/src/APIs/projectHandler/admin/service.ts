// import projectModel from '../../site-production/_shared/models/project.model'
// import { IProjectWithId } from '../../site-production/_shared/types/project.interface'
// import validation from '../../site-production/functionality/validation/validation'
// import { CustomError } from '../../../utils/errors'
// import responseMessage from '../../../constant/responseMessage'

// export const getProjectDetailsByIdService = async (id: string): Promise<IProjectWithId> => {
//     // Validate the project ID
//     await validation.ensureProjectExists(id)

//     try {
//         const project = await projectModel
//             .findById(id)
//             .populate('owner', 'email name')
//             .populate('createdBy', 'email name') // Optional: populate createdBy if needed
//             .populate('inventory.resourceType', 'price description unit') // Populate resources if applicable
//             .exec()

//         if (!project) {
//             throw new CustomError(responseMessage.project.NOT_FOUND('Project'), 404)
//         }

//         // Map the document to IProjectWithId type, converting _id to string
//         return {
//             ...project.toObject(),
//             _id: project._id.toString()
//         } as IProjectWithId
//     } catch (error) {
//         console.error('Error in getProjectDetailsByIdService:', error)
//         if (error instanceof Error) {
//             throw new CustomError(error.message || 'Error fetching project details', 500)
//         }

//         // Handle other unknown errors
//         throw new CustomError('Unknown error occurred', 500)
//     }
// }
