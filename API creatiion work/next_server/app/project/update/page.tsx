'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon, TrashIcon } from 'lucide-react'
import { format } from 'date-fns'
import { useProjectStore } from '@/store/useProjectStore'

export default function UpdateProject() {
    // Get the projectId from the Zustand store
    const projectId = useProjectStore.getState().projectId

    // Initialize local state with empty fields
    const [localProject, setLocalProject] = useState({
        title: '',
        description: '',
        // startDate: undefined,
        // endDate: undefined,
        inventory: [{ resourceType: '', price: 0, description: '', unit: '' }]
    })

    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    // Fetch project data when component mounts
    useEffect(() => {
        async function fetchProject() {
            try {
                const response = await fetch(`http://localhost:3000/v1/project/${projectId}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch project data')
                }
                const projectData = await response.json()
                setLocalProject(projectData) // Populate local state with the fetched project data
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error occurred while fetching project data')
            }
        }

        if (projectId) {
            fetchProject()
        }
    }, [projectId])

    // Handle form submission to update project
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setSuccess(null)

        try {
            const response = await fetch(`http://localhost:3000/v1/project/${projectId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(localProject)
            })

            if (!response.ok) {
                throw new Error('Failed to update project')
            }

            setSuccess('Project updated successfully!')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error occurred')
        }
    }

    // Update local state when input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setLocalProject((prev) => ({ ...prev, [name]: value }))
    }

    // Update date fields
    // const handleDateChange = (name: string, date: Date | undefined) => {
    //     setLocalProject((prev) => ({ ...prev, [name]: date }))
    // }

    // Update inventory fields
    const handleInventoryChange = (index: number, field: string, value: string | number) => {
        const updatedInventory = localProject.inventory.map((item, i) => {
            if (i === index) {
                return { ...item, [field]: value }
            }
            return item
        })
        setLocalProject((prev) => ({ ...prev, inventory: updatedInventory }))
    }

    // Add new inventory item
    const addInventoryItem = () => {
        setLocalProject((prev) => ({
            ...prev,
            inventory: [...prev.inventory, { resourceType: '', price: 0, description: '', unit: '' }]
        }))
    }

    // Remove inventory item
    const removeInventoryItem = (index: number) => {
        const updatedInventory = localProject.inventory.filter((_, i) => i !== index)
        setLocalProject((prev) => ({ ...prev, inventory: updatedInventory }))
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 flex items-center justify-center p-4">
            <motion.form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl space-y-6"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}>
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Update Project</h1>

                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}

                <div className="space-y-2">
                    <Label htmlFor="title">Project Title</Label>
                    <Input
                        id="title"
                        name="title"
                        value={localProject.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Project Description</Label>
                    <Textarea
                        id="description"
                        name="description"
                        value={localProject.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {localProject.startDate ? format(new Date(localProject.startDate), 'PPP') : 'Pick a date'}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={localProject.startDate ? new Date(localProject.startDate) : undefined}
                                    onSelect={(date) => handleDateChange('startDate', date)}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="space-y-2">
                        <Label>End Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {localProject.endDate ? format(new Date(localProject.endDate), 'PPP') : 'Pick a date'}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={localProject.endDate ? new Date(localProject.endDate) : undefined}
                                    onSelect={(date) => handleDateChange('endDate', date)}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div> */}

                <div className="space-y-4">
                    <Label>Inventory</Label>
                    {localProject.inventory.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
                            <Input
                                placeholder="Resource Type"
                                value={item.resourceType}
                                onChange={(e) => handleInventoryChange(index, 'resourceType', e.target.value)}
                                required
                            />
                            <Input
                                type="number"
                                placeholder="Quantity"
                                value={item.price}
                                onChange={(e) => handleInventoryChange(index, 'price', Number(e.target.value))}
                                required
                            />
                            <Input
                                placeholder="Description"
                                value={item.description}
                                onChange={(e) => handleInventoryChange(index, 'description', e.target.value)}
                                required
                            />
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Unit"
                                    value={item.unit}
                                    onChange={(e) => handleInventoryChange(index, 'unit', e.target.value)}
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => removeInventoryItem(index)}
                                    className="ml-2">
                                    <TrashIcon className="h-4 w-4" />
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                    <Button
                        type="button"
                        onClick={addInventoryItem}
                        variant="secondary"
                        className="w-full">
                        Add Inventory Item
                    </Button>
                </div>

                <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    variant="default">
                    Update Project
                </Button>
            </motion.form>
        </motion.div>
    )
}
