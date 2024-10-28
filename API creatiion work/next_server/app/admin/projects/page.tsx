'use client'

import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { CalendarIcon, UserIcon, MailIcon, CheckCircleIcon, XCircleIcon, PlusCircleIcon, PauseCircleIcon, TrashIcon } from 'lucide-react'
import { IProjectWithId } from '@/types/project.interface'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const fetchProjects = async (): Promise<IProjectWithId[]> => {
    const response = await fetch('http://localhost:3000/v1/admin', {
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

export default function ProjectsComponent() {
    const router = useRouter()
    const {
        data: projects,
        isError,
        isLoading
    } = useQuery<IProjectWithId[]>({
        queryKey: ['projects'],
        queryFn: fetchProjects
    })

    // console.log(projects, 'projects')

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white">Projects Dashboard</h1>
            </header>

            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading &&
                    Array.from({ length: 6 }).map((_, index) => (
                        <Card
                            key={index}
                            className="bg-white bg-opacity-80 backdrop-blur-sm">
                            <CardHeader>
                                <Skeleton className="h-6 w-2/3" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-4 w-full mb-2" />
                                <Skeleton className="h-4 w-3/4" />
                            </CardContent>
                        </Card>
                    ))}

                {isError && (
                    <Card className="col-span-full bg-red-100 border-red-300">
                        <CardHeader>
                            <CardTitle className="text-red-600">Error</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-red-600">There was an error loading the projects. Please try again later.</p>
                        </CardContent>
                    </Card>
                )}

                {projects &&
                    Array.isArray(projects) &&
                    projects.map((project) => (
                        <Link
                            href={`/admin/projects/${project._id}`}
                            key={project._id}
                            className="block">
                            <Card className="bg-white bg-opacity-80 backdrop-blur-sm hover:shadow-xl transition-shadow cursor-pointer h-full flex flex-col">
                                <CardHeader>
                                    <CardTitle className="text-xl font-semibold text-purple-700 flex justify-between items-center">
                                        {project.title}
                                        <Badge variant={project.status.isActive ? 'success' : 'secondary'}>
                                            {project.status.isActive ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-gray-600 mb-4">{project.description}</p>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <UserIcon className="h-4 w-4 text-gray-500" />
                                            <span className="text-sm text-gray-700">{project.creatorName}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MailIcon className="h-4 w-4 text-gray-500" />
                                            <span className="text-sm text-gray-700">{project.creatorEmail}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CalendarIcon className="h-4 w-4 text-gray-500" />
                                            <span className="text-sm text-gray-700">Created: {new Date(project.createdAt).toLocaleDateString()}</span>
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
                                </CardContent>
                                <CardFooter className="flex flex-col gap-4">
                                    <div className="flex justify-between items-center w-full">
                                        <div className="flex items-center gap-2">
                                            {project.confirmation.status ? (
                                                <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                            ) : (
                                                <XCircleIcon className="h-5 w-5 text-red-500" />
                                            )}
                                            <span className="text-sm text-gray-700">
                                                {project.confirmation.status ? 'Confirmed' : 'Not Confirmed'}
                                            </span>
                                        </div>
                                        <Badge
                                            variant="outline"
                                            className="text-xs">
                                            {project.inventory.length} Resources
                                        </Badge>
                                    </div>
                                    <div className="flex justify-between gap-2 w-full">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                // Handle asking for more resources
                                            }}>
                                            <PlusCircleIcon className="h-4 w-4 mr-2" />
                                            More Resources
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                // Handle pausing the project
                                            }}>
                                            <PauseCircleIcon className="h-4 w-4 mr-2" />
                                            Pause Project
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                router.push('/project/delete')
                                            }}>
                                            <TrashIcon className="h-4 w-4 mr-2" />
                                            Delete
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                            s
                        </Link>
                    ))}
            </main>
        </div>
    )
}
