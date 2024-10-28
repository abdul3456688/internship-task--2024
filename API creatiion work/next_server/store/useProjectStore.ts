// 'use client'

// import { create } from 'zustand'
// import { persist } from 'zustand/middleware'
// import { immer } from 'zustand/middleware/immer'

// type InventoryItem = {
//     resourceType: string
//     price: number
//     description: string
//     unit: string
// }

// type Project = {
//     projectId : string
//     title: string
//     description: string
//     creatorName: string
//     creatorEmail: string
//     startDate?: Date
//     endDate?: Date
//     progress: number
//     inventory: InventoryItem[]
// }

// type ProjectState = {
//     project: Project
//     setProjectField: <K extends keyof Project>(field: K, value: Project[K]) => void
//     updateProject: (updatedProject: Partial<Project>) => void
//     addInventoryItem: () => void
//     updateInventoryItem: (index: number, field: keyof InventoryItem, value: string | number) => void
//     removeInventoryItem: (index: number) => void
//     resetProject: () => void
// }

// const initialProjectState: Project = {
//     projectId:"",
//     title: '',
//     description: '',
//     creatorName: '',
//     creatorEmail: '',
//     startDate: undefined,
//     endDate: undefined,
//     progress: 0,
//     inventory: [{ resourceType: '', price: 0, description: '', unit: '' }]
// }

// export const useProjectStore = create<ProjectState>()(
//     persist(
//         immer((set) => ({
//             project: initialProjectState,

//             updateProject: (updatedProject) => {
//                 set((state) => {
//                     state.project = { ...state.project, ...updatedProject }
//                 })
//             },

//             setProjectField: (field, value) => {
//                 set((state) => {
//                     state.project[field] = value
//                 })
//             },

//             addInventoryItem: () => {
//                 set((state) => {
//                     state.project.inventory.push({ resourceType: '', price: 0, description: '', unit: '' })
//                 })
//             },

//             updateInventoryItem: (index, field, value) => {
//                 set((state) => {
//                     if (index !== null && index >= 0 && index < state.project.inventory.length) {
//                         ;(state.project.inventory[index][field] as string | number) = value
//                     }
//                 })
//             },
//             removeInventoryItem: (index) => {
//                 set((state) => {
//                     state.project.inventory.splice(index, 1)
//                 })
//             },

//             resetProject: () => {
//                 set((state) => {
//                     state.project = { ...initialProjectState }
//                 })
//             }
//         })),
//         {
//             name: 'project'
//         }
//     )
// )
'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

// Define the ProjectState type with relevant methods
interface ProjectState {
    projectId: string
    setProjectId: (id: string) => void
    resetProject: () => void
}

// Create the Zustand store
export const useProjectStore = create<ProjectState>()(
    persist(
        immer((set) => ({
            projectId: '',

            setProjectId: (id) => {
                set((state) => {
                    state.projectId = id
                })
            },

            resetProject: () => {
                set((state) => {
                    state.projectId = ''
                })
            }
        })),
        {
            name: 'project', // Local storage key
            partialize: (state) => ({ projectId: state.projectId }),
            onRehydrateStorage: () => (state) => {
                console.log('Rehydrating Zustand store:', state)
            }
        }
    )
)

// 'use client'

// import { create } from 'zustand'
// import { persist } from 'zustand/middleware'
// import { immer } from 'zustand/middleware/immer'

// // Define the InventoryItem and Project types
// type InventoryItem = {
//     resourceType: string
//     price: number
//     description: string
//     unit: string
// }

// type Project = {
//     projectId: string // Add projectId field here
//     title: string
//     description: string
//     creatorName: string
//     creatorEmail: string
//     startDate?: Date
//     endDate?: Date
//     progress: number
//     inventory: InventoryItem[]
// }

// // Define the ProjectState type with relevant methods
// type ProjectState = {
//     project: Project
//     setProjectField: <K extends keyof Project>(field: K, value: Project[K]) => void
//     updateProject: (updatedProject: Partial<Project>) => void
//     addInventoryItem: () => void
//     updateInventoryItem: (index: number, field: keyof InventoryItem, value: string | number) => void
//     removeInventoryItem: (index: number) => void
//     setProjectId: (id: string) => void // Method to set the projectId
//     resetProject: () => void
// }

// // Define the initial project state
// const initialProjectState: Project = {
//     projectId: '', // Initialize projectId as empty
//     title: '',
//     description: '',
//     creatorName: '',
//     creatorEmail: '',
//     startDate: undefined,
//     endDate: undefined,
//     progress: 0,
//     inventory: [{ resourceType: '', price: 0, description: '', unit: '' }]
// }

// // Create the Zustand store with immer middleware
// export const useProjectStore = create<ProjectState>()(
//     persist(
//         immer((set) => ({
//             project: initialProjectState,

//             // Method to update the entire project object
//             updateProject: (updatedProject) => {
//                 set((state) => {
//                     state.project = { ...state.project, ...updatedProject }
//                 })
//             },

//             // Method to update a specific field of the project
//             setProjectField: (field, value) => {
//                 set((state) => {
//                     state.project[field] = value
//                 })
//             },

//             // Method to add a new inventory item
//             addInventoryItem: () => {
//                 set((state) => {
//                     state.project.inventory.push({ resourceType: '', price: 0, description: '', unit: '' })
//                 })
//             },

//             // Method to update a specific inventory item
//             updateInventoryItem: (index, field, value) => {
//                 set((state) => {
//                     if (index !== null && index >= 0 && index < state.project.inventory.length) {
//                         ;(state.project.inventory[index][field] as string | number) = value
//                     }
//                 })
//             },

//             // Method to remove an inventory item
//             removeInventoryItem: (index) => {
//                 set((state) => {
//                     state.project.inventory.splice(index, 1)
//                 })
//             },

//             // Method to set the projectId
//             setProjectId: (id) => {
//                 set((state) => {
//                     state.project.projectId = id
//                 })
//             },

//             // Method to reset the project to its initial state
//             resetProject: () => {
//                 set((state) => {
//                     state.project = { ...initialProjectState }
//                 })
//             }
//         })),
//         {
//             name: 'project', // Name of the persisted storage key
//             partialize: (state) => ({ project: { projectId: state.project.projectId } }) // Persist only projectId
//         }
//     )
// )
