export interface IResource {
    resourceType: string
    price: number
    description?: string
    unit?: string // e.g., kg, liters, pieces, etc.
}

export interface IProject {
    title: string
    description: string
    owner?: string
    creatorName: string
    creatorEmail: string
    createdBy?: string
    confirmation: {
        status: boolean
        token: string
        code: string
    }

    status: {
        startDate?: Date
        endDate?: Date
        isActive?: boolean
        progressPercentage?: number
    }
    inventory: IResource[]
    createdAt: Date
    updatedAt: Date
}

export interface IProjectWithId extends IProject {
    _id: string
}
