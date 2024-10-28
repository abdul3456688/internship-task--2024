'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon, PlusIcon, TrashIcon } from 'lucide-react'
import { format } from 'date-fns'
import Link from 'next/link'
import { useProjectStore } from '@/store/useProjectStore' // Import the Zustand store

export default function ProjectCreationForm() {
    const { setProjectId } = useProjectStore()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [creatorName, setCreatorName] = useState('')
    const [creatorEmail, setCreatorEmail] = useState('')
    const [startDate, setStartDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>()
    const [inventory, setInventory] = useState([{ resourceType: '', price: 0, description: '', unit: '' }])
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setSuccess(null)

        // Prepare the data to be sent
        const projectData = {
            title,
            description,
            creatorName,
            creatorEmail,
            status: { startDate, endDate },
            inventory
        }

        try {
            const response = await fetch('http://localhost:3000/v1/project', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // Authorization: `Bearer ${token}` // Add the token here
                },
                body: JSON.stringify(projectData)
            })

            if (!response.ok) {
                throw new Error('Failed to create project')
            }

            const data = await response.json()
            setSuccess('Project created successfully!')
            setProjectId(data.data.projectId) // Handle success
            // console.log()
        } catch (err) {
            if (err instanceof Error) setError(err.message)
            else {
                setError('unkown error occure')
            }
        }
    }

    const addInventoryItem = () => {
        setInventory([...inventory, { resourceType: '', price: 0, description: '', unit: '' }])
    }

    const removeInventoryItem = (index: number) => {
        setInventory(inventory.filter((_, i) => i !== index))
    }

    const updateInventoryItem = (index: number, field: string, value: string | number) => {
        const updatedInventory = inventory.map((item, i) => {
            if (i === index) {
                return { ...item, [field]: value }
            }
            return item
        })
        setInventory(updatedInventory)
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
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Create New Project</h1>

                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}

                <div className="space-y-2">
                    <Label htmlFor="title">Project Title</Label>
                    <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter project title"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Project Description</Label>
                    <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter project description"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="creatorName">Creator Name</Label>
                        <Input
                            id="creatorName"
                            value={creatorName}
                            onChange={(e) => setCreatorName(e.target.value)}
                            placeholder="Enter creator name"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="creatorEmail">Creator Email</Label>
                        <Input
                            id="creatorEmail"
                            type="email"
                            value={creatorEmail}
                            onChange={(e) => setCreatorEmail(e.target.value)}
                            placeholder="Enter creator email"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {startDate ? format(startDate, 'PPP') : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={startDate}
                                    onSelect={setStartDate}
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
                                    {endDate ? format(endDate, 'PPP') : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={endDate}
                                    onSelect={setEndDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                <div className="space-y-4">
                    <Label>Inventory</Label>
                    {inventory.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
                            <Input
                                placeholder="Resource Type"
                                value={item.resourceType}
                                onChange={(e) => updateInventoryItem(index, 'resourceType', e.target.value)}
                                required
                            />
                            <Input
                                type="number"
                                placeholder="Quantity"
                                value={item.price}
                                onChange={(e) => updateInventoryItem(index, 'price', Number(e.target.value))}
                                required
                            />
                            <Input
                                placeholder="Description"
                                value={item.description}
                                onChange={(e) => updateInventoryItem(index, 'description', e.target.value)}
                                required
                            />
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Unit"
                                    value={item.unit}
                                    onChange={(e) => updateInventoryItem(index, 'unit', e.target.value)}
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => removeInventoryItem(index)}
                                    disabled={inventory.length === 1}>
                                    <TrashIcon className="h-4 w-4" />
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                    <Button
                        type="button"
                        onClick={addInventoryItem}
                        className="w-full">
                        <PlusIcon className="mr-2 h-4 w-4" /> Add Inventory Item
                    </Button>
                </div>

                <Button
                    type="submit"
                    className="w-full">
                    Create Project
                </Button>
                <Link
                    href="/project/update"
                    className="text-blue-600 hover:underline text-center justify-center align-middle">
                    I Want to update My Project
                </Link>
                <Link
                    href="/project/delete"
                    className="text-blue-600 hover:underline text-center justify-center align-middle">
                    I Want to delete My Project
                </Link>
            </motion.form>
        </motion.div>
    )
}
