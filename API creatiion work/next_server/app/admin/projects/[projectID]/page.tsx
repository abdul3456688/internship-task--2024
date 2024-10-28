// 'use client'

// import { useQuery } from '@tanstack/react-query'
// import { useRouter } from 'next/navigation'
// import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
// import { Badge } from '@/components/ui/badge'
// import { Button } from '@/components/ui/button'
// import { Progress } from '@/components/ui/progress'
// import { Skeleton } from '@/components/ui/skeleton'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { CalendarIcon, UserIcon, MailIcon, ClockIcon, BarChart2Icon, PackageIcon } from 'lucide-react'
// import { IProjectWithId } from '@/types/project.interface'

// const fetchProjectDetail = async (projectID: string): Promise<IProjectWithId> => {
//     const response = await fetch(`http://localhost:3000/v1/admin/${projectID}`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })

//     if (!response.ok) {
//         throw new Error('Network response was not ok')
//     }

//     const data = await response.json()
//     return data.data
// }

// const ProjectDetail = ({ params }: { params: { projectID: string } }) => {
//     const { projectID } = params
//     const router = useRouter()

//     const {
//         data: project,
//         isError,
//         isLoading
//     } = useQuery<IProjectWithId>({
//         queryKey: ['project', projectID],
//         queryFn: () => fetchProjectDetail(projectID),
//         enabled: !!projectID
//     })
//     console.log(project)

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
//             <Card className="max-w-4xl mx-auto bg-white bg-opacity-90 backdrop-blur-lg shadow-xl">
//                 <CardHeader className="border-b border-gray-200">
//                     <div className="flex justify-between items-center">
//                         <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => router.back()}
//                             className="text-gray-500 hover:text-gray-700">
//                             ← Back to Projects
//                         </Button>
//                         {project && (
//                             <Badge
//                                 variant={project.status.isActive ? 'success' : 'secondary'}
//                                 className="text-sm">
//                                 {project.status.isActive ? 'Active' : 'Inactive'}
//                             </Badge>
//                         )}
//                     </div>
//                     {isLoading ? (
//                         <Skeleton className="h-9 w-2/3" />
//                     ) : (
//                         <CardTitle className="text-3xl font-bold text-gray-800">{project?.title}</CardTitle>
//                     )}
//                 </CardHeader>

//                 {isLoading && (
//                     <CardContent className="pt-6">
//                         <div className="space-y-4">
//                             <Skeleton className="h-4 w-full" />
//                             <Skeleton className="h-4 w-5/6" />
//                             <Skeleton className="h-4 w-4/6" />
//                         </div>
//                     </CardContent>
//                 )}

//                 {isError && (
//                     <CardContent>
//                         <div
//                             className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
//                             role="alert">
//                             <p className="font-bold">Error</p>
//                             <p>There was an error loading the project. Please try again later.</p>
//                         </div>
//                     </CardContent>
//                 )}

//                 {project && (
//                     <CardContent className="pt-6">
//                         <Tabs
//                             defaultValue="overview"
//                             className="space-y-4">
//                             <TabsList>
//                                 <TabsTrigger value="overview">Overview</TabsTrigger>
//                                 <TabsTrigger value="details">Details</TabsTrigger>
//                                 <TabsTrigger value="resources">Resources</TabsTrigger>
//                             </TabsList>

//                             <TabsContent
//                                 value="overview"
//                                 className="space-y-4">
//                                 <p className="text-gray-600">{project.description}</p>
//                                 <div className="grid grid-cols-2 gap-4">
//                                     <div className="flex items-center gap-2">
//                                         <UserIcon className="h-5 w-5 text-gray-500" />
//                                         <span className="text-sm text-gray-700">{project.creatorName}</span>
//                                     </div>
//                                     <div className="flex items-center gap-2">
//                                         <MailIcon className="h-5 w-5 text-gray-500" />
//                                         <span className="text-sm text-gray-700">{project.creatorEmail}</span>
//                                     </div>
//                                     <div className="flex items-center gap-2">
//                                         <CalendarIcon className="h-5 w-5 text-gray-500" />
//                                         <span className="text-sm text-gray-700">Created: {new Date(project.createdAt).toLocaleDateString()}</span>
//                                     </div>
//                                     <div className="flex items-center gap-2">
//                                         <ClockIcon className="h-5 w-5 text-gray-500" />
//                                         <span className="text-sm text-gray-700">Updated: {new Date(project.updatedAt).toLocaleDateString()}</span>
//                                     </div>
//                                 </div>
//                                 <div className="mt-4">
//                                     <div className="flex justify-between items-center mb-2">
//                                         <span className="text-sm font-medium text-gray-700">Progress</span>
//                                         <span className="text-sm font-medium text-gray-700">{project.status.progressPercentage}%</span>
//                                     </div>
//                                     <Progress
//                                         value={project.status.progressPercentage}
//                                         className="w-full"
//                                     />
//                                 </div>
//                             </TabsContent>

//                             <TabsContent
//                                 value="details"
//                                 className="space-y-4">
//                                 <div className="grid grid-cols-2 gap-4">
//                                     <div>
//                                         <h3 className="text-lg font-semibold text-gray-700 mb-2">Status</h3>
//                                         <div className="space-y-2">
//                                             <div className="flex items-center justify-between">
//                                                 <span className="text-sm text-gray-600">Start Date:</span>
//                                                 <span className="text-sm font-medium">
//                                                     {project.status.startDate ? new Date(project.status.startDate).toLocaleDateString() : 'Not set'}
//                                                 </span>
//                                             </div>
//                                             <div className="flex items-center justify-between">
//                                                 <span className="text-sm text-gray-600">End Date:</span>
//                                                 <span className="text-sm font-medium">
//                                                     {project.status.endDate ? new Date(project.status.endDate).toLocaleDateString() : 'Not set'}
//                                                 </span>
//                                             </div>
//                                             <div className="flex items-center justify-between">
//                                                 <span className="text-sm text-gray-600">Is Active:</span>
//                                                 <Badge variant={project.status.isActive ? 'success' : 'secondary'}>
//                                                     {project.status.isActive ? 'Yes' : 'No'}
//                                                 </Badge>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <h3 className="text-lg font-semibold text-gray-700 mb-2">Confirmation</h3>
//                                         <div className="space-y-2">
//                                             <div className="flex items-center justify-between">
//                                                 <span className="text-sm text-gray-600">Status:</span>
//                                                 <Badge variant={project.confirmation.status ? 'success' : 'destructive'}>
//                                                     {project.confirmation.status ? 'Confirmed' : 'Not Confirmed'}
//                                                 </Badge>
//                                             </div>
//                                             <div className="flex items-center justify-between">
//                                                 <span className="text-sm text-gray-600">Token:</span>
//                                                 <span className="text-sm font-medium">{project.confirmation.token}</span>
//                                             </div>
//                                             <div className="flex items-center justify-between">
//                                                 <span className="text-sm text-gray-600">Code:</span>
//                                                 <span className="text-sm font-medium">{project.confirmation.code}</span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </TabsContent>

//                             <TabsContent
//                                 value="resources"
//                                 className="space-y-4">
//                                 <div className="flex items-center justify-between mb-4">
//                                     <h3 className="text-lg font-semibold text-gray-700">Inventory</h3>
//                                     <Badge
//                                         variant="outline"
//                                         className="text-sm">
//                                         {project.inventory.length} Resources
//                                     </Badge>
//                                 </div>
//                                 {project.inventory.length > 0 ? (
//                                     <ul className="space-y-2">
//                                         {project.inventory.map((resource, index) => (
//                                             <li
//                                                 key={index}
//                                                 className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
//                                                 <PackageIcon className="h-5 w-5 text-gray-500" />
//                                                 <span className="text-sm text-gray-700">{resource.resourceType}</span>
//                                                 <Badge
//                                                     variant="secondary"
//                                                     className="ml-auto">
//                                                     {resource.price}
//                                                 </Badge>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 ) : (
//                                     <p className="text-sm text-gray-500">No resources in the inventory.</p>
//                                 )}
//                             </TabsContent>
//                         </Tabs>
//                     </CardContent>
//                 )}

//                 <CardFooter className="border-t border-gray-200 mt-6 flex justify-end">
//                     <Button
//                         variant="default"
//                         className="mr-2">
//                         Edit Project
//                     </Button>
//                     <Button variant="destructive">Delete Project</Button>
//                 </CardFooter>
//             </Card>
//         </div>
//     )
// }

// export default ProjectDetail

'use client'

import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CalendarIcon, UserIcon, MailIcon, ClockIcon, BarChart2Icon, PackageIcon, PlusCircleIcon, DollarSignIcon } from 'lucide-react'
import { IProjectWithId } from '@/types/project.interface'

const fetchProjectDetail = async (projectID: string): Promise<IProjectWithId> => {
    const response = await fetch(`http://localhost:3000/v1/admin/${projectID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (!response.ok) {
        throw new Error('Network response was not ok')
    }

    const data = await response.json()
    return data.data
}

const ProjectDetail = ({ params }: { params: { projectID: string } }) => {
    const { projectID } = params
    const router = useRouter()

    const {
        data: project,
        isError,
        isLoading
    } = useQuery<IProjectWithId>({
        queryKey: ['project', projectID],
        queryFn: () => fetchProjectDetail(projectID),
        enabled: !!projectID
    })

    const handleAskForResources = () => {
        // Implement the logic for asking for more resources
        console.log('Asking for more resources')
        router.push('/acountant/requests')
    }

    const handleRequestBudgetIncrease = () => {
        // Implement the logic for requesting budget increase
        console.log('Requesting budget increase')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
            <Card className="max-w-4xl mx-auto bg-white bg-opacity-90 backdrop-blur-lg shadow-xl">
                <CardHeader className="border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.back()}
                            className="text-gray-500 hover:text-gray-700">
                            ← Back to Projects
                        </Button>
                        {project && (
                            <Badge
                                variant={project.status.isActive ? 'success' : 'secondary'}
                                className="text-sm">
                                {project.status.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                        )}
                    </div>
                    {isLoading ? (
                        <Skeleton className="h-9 w-2/3" />
                    ) : (
                        <CardTitle className="text-3xl font-bold text-gray-800">{project?.title}</CardTitle>
                    )}
                </CardHeader>

                {isLoading && (
                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                            <Skeleton className="h-4 w-4/6" />
                        </div>
                    </CardContent>
                )}

                {isError && (
                    <CardContent>
                        <div
                            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
                            role="alert">
                            <p className="font-bold">Error</p>
                            <p>There was an error loading the project. Please try again later.</p>
                        </div>
                    </CardContent>
                )}

                {project && (
                    <CardContent className="pt-6">
                        <Tabs
                            defaultValue="overview"
                            className="space-y-4">
                            <TabsList>
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="details">Details</TabsTrigger>
                                <TabsTrigger value="resources">Resources</TabsTrigger>
                            </TabsList>

                            <TabsContent
                                value="overview"
                                className="space-y-4">
                                <p className="text-gray-600">{project.description}</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-2">
                                        <UserIcon className="h-5 w-5 text-gray-500" />
                                        <span className="text-sm text-gray-700">{project.creatorName}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MailIcon className="h-5 w-5 text-gray-500" />
                                        <span className="text-sm text-gray-700">{project.creatorEmail}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CalendarIcon className="h-5 w-5 text-gray-500" />
                                        <span className="text-sm text-gray-700">Created: {new Date(project.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ClockIcon className="h-5 w-5 text-gray-500" />
                                        <span className="text-sm text-gray-700">Updated: {new Date(project.updatedAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-gray-700">Progress</span>
                                        <span className="text-sm font-medium text-gray-700">{project.status.progressPercentage}%</span>
                                    </div>
                                    <Progress
                                        value={project.status.progressPercentage}
                                        className="w-full"
                                    />
                                </div>
                            </TabsContent>

                            <TabsContent
                                value="details"
                                className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Status</h3>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600">Start Date:</span>
                                                <span className="text-sm font-medium">
                                                    {project.status.startDate ? new Date(project.status.startDate).toLocaleDateString() : 'Not set'}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600">End Date:</span>
                                                <span className="text-sm font-medium">
                                                    {project.status.endDate ? new Date(project.status.endDate).toLocaleDateString() : 'Not set'}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600">Is Active:</span>
                                                <Badge variant={project.status.isActive ? 'success' : 'secondary'}>
                                                    {project.status.isActive ? 'Yes' : 'No'}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Confirmation</h3>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600">Status:</span>
                                                <Badge variant={project.confirmation.status ? 'success' : 'destructive'}>
                                                    {project.confirmation.status ? 'Confirmed' : 'Not Confirmed'}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600">Token:</span>
                                                <span className="text-sm font-medium">{project.confirmation.token}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600">Code:</span>
                                                <span className="text-sm font-medium">{project.confirmation.code}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent
                                value="resources"
                                className="space-y-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-700">Inventory</h3>
                                    <Badge
                                        variant="outline"
                                        className="text-sm">
                                        {project.inventory.length} Resources
                                    </Badge>
                                </div>
                                {project.inventory.length > 0 ? (
                                    <ul className="space-y-2">
                                        {project.inventory.map((resource, index) => (
                                            <li
                                                key={index}
                                                className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                                                <PackageIcon className="h-5 w-5 text-gray-500" />
                                                <span className="text-sm text-gray-700">{resource.resourceType}</span>
                                                <Badge
                                                    variant="secondary"
                                                    className="ml-auto">
                                                    {resource.price}
                                                </Badge>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500">No resources in the inventory.</p>
                                )}
                                <div className="flex justify-end space-x-2 mt-4">
                                    <Button
                                        variant="outline"
                                        onClick={handleAskForResources}
                                        className="flex items-center">
                                        <PlusCircleIcon className="h-4 w-4 mr-2" />
                                        Ask for more resources
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={handleRequestBudgetIncrease}
                                        className="flex items-center">
                                        <DollarSignIcon className="h-4 w-4 mr-2" />
                                        Request budget increase
                                    </Button>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                )}

                <CardFooter className="border-t border-gray-200 mt-6 flex justify-end">
                    <Button
                        variant="default"
                        className="mr-2">
                        Edit Project
                    </Button>
                    <Button variant="destructive">Delete Project</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default ProjectDetail
