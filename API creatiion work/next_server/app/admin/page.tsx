'use client'

import { useState } from 'react'
import { Menu, X, Home, Users, Settings, BarChart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { useRouter } from 'next/navigation'

// Dummy data for the chart
const data = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 70 },
    { name: 'Apr', value: 20 },
    { name: 'May', value: 500 },
    { name: 'Jun', value: 700 }
]

export default function AdminDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const router = useRouter()

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

    return (
        <div className="flex h-screen bg-gray-100">
            <aside
                className={`${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
                <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between px-4 py-6">
                        <span className="text-2xl font-semibold">Admin Panel</span>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleSidebar}
                            className="lg:hidden">
                            <X className="h-6 w-6" />
                            <span className="sr-only">Close sidebar</span>
                        </Button>
                    </div>
                    <nav className="flex-1 space-y-2 px-2">
                        <Button
                            variant="ghost"
                            onClick={() => router.push('/admin/projects')}
                            className="w-full justify-start">
                            <Home className="mr-2 h-4 w-4" />
                            All Projects
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start">
                            <Users className="mr-2 h-4 w-4" />
                            Users
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start">
                            <BarChart className="mr-2 h-4 w-4" />
                            Analytics
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start">
                            <Settings className="mr-2 h-4 w-4" />
                            Settings
                        </Button>
                    </nav>
                </div>
            </aside>

            <div className="flex-1 overflow-auto">
                <header className="bg-white shadow">
                    <div className="flex items-center px-4 py-6">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleSidebar}
                            className="mr-2 lg:hidden">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Open sidebar</span>
                        </Button>
                        <h1 className="text-2xl font-semibold">Dashboard</h1>
                    </div>
                </header>

                <main className="container mx-auto mt-6 px-4">
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Monthly Performance</CardTitle>
                            <CardDescription>Overview of Your Constructoin Site Projects</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer
                                config={{
                                    value: {
                                        label: 'Value',
                                        color: 'hsl(var(--chart-1))'
                                    }
                                }}
                                className="h-[400px]">
                                <ResponsiveContainer
                                    width="100%"
                                    height="100%">
                                    <LineChart data={data}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="value"
                                            stroke="var(--color-value)"
                                            strokeWidth={2}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    )
}
