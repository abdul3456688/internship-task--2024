// import Project from '../../../site-production/_shared/models/project.model'
import projectModel from '../../../site-production/_shared/models/project.model'
import { IProjectWithId } from '../../../site-production/_shared/types/project.interface'

export default {
    bringAllProjects: async (): Promise<IProjectWithId[]> => {
        try {
            const projects = await projectModel.find().populate('owner', 'email name').exec()

            // Map the documents to IProjectWithId type, converting _id to string
            return projects.map((project) => ({
                ...project.toObject(),
                _id: project._id.toString()
            })) as IProjectWithId[]
        } catch (error) {
            console.error('Error fetching projects:', error)
            throw new Error('Could not retrieve projects')
        }
    },

    getProjectDetailsById: (id: string) => {
        return projectModel.findOne({
            'id': id
        })
    }
}
