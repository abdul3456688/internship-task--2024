'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { UserIcon, LogOut, UserPlus } from 'lucide-react'

export default function Component() {
    const [showHealth, setShowHealth] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false) // State to track login status
    const router = useRouter()

    // Fetch system health data only when `showHealth` is true
    const { data, isError, isLoading, isSuccess } = useQuery({
        queryKey: ['health'],
        queryFn: async () => {
            const response = await fetch('http://localhost:3000/v1/health', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return await response.json()
        },
        enabled: showHealth
    })
    const uptime = data?.data?.application.uptime || 'N/A'
    const serverMemoryUsage = data?.data?.application.memoryUsage.heapUsed || 'N/A'
    const totalHeapMemory = data?.data?.application.memoryUsage.heapTotal || 'N/A'
    const yourMemoryUsage = data?.data?.system?.freeMemory || 'N/A'
    const yourTotalMemory = data?.data?.system?.totalMemory || 'N/A'

    const handleLogin = () => {
        // Implement login logic here
        router.push('/auth/login')
        setIsLoggedIn(true)
    }

    const handleLogout = () => {
        // Implement logout logic here
        router.push('/auth/logout')
        setIsLoggedIn(false)
    }

    const handleRegister = () => {
        // Implement register logic here
        router.push('/auth/register')
        console.log('Register clicked')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex flex-col">
            <motion.nav
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white bg-opacity-10 backdrop-blur-lg shadow-lg p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                    <div className="space-x-2">
                        {isLoggedIn ? (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-white hover:text-purple-200"
                                onClick={handleLogout}>
                                <LogOut className="mr-2 h-4 w-4" /> Logout
                            </Button>
                        ) : (
                            <>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-white hover:text-purple-200"
                                    onClick={handleLogin}>
                                    <UserIcon className="mr-2 h-4 w-4" /> Login
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-white hover:text-purple-200"
                                    onClick={handleRegister}>
                                    <UserPlus className="mr-2 h-4 w-4" /> Register
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </motion.nav>

            <div className="flex-grow flex flex-col items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-center">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 shadow-text">Welcome to Your Dashboard</h2>
                    <div className="space-y-4">
                        <Button
                            variant="secondary"
                            size="lg"
                            className="w-64 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 bg-white text-purple-600 hover:bg-purple-100"
                            onClick={() => setShowHealth(!showHealth)}>
                            {showHealth ? 'Hide' : 'Show'} System Health
                        </Button>
                        <Button
                            variant="secondary"
                            size="lg"
                            className="w-64 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 bg-white text-pink-600 hover:bg-pink-100"
                            onClick={() => router.push('/project/create')}>
                            Create Projects
                        </Button>
                    </div>
                </motion.div>

                {showHealth && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="mt-8 p-6 bg-white rounded-lg shadow-xl">
                        <h3 className="text-2xl font-bold text-purple-600 mb-4">System Health</h3>
                        {isLoading && <p className="text-gray-700">Loading system health data...</p>}
                        {isError && <p className="text-gray-700">Error loading system health data.</p>}
                        {isSuccess && (
                            <div>
                                <p className="text-gray-700">Uptime: {uptime}</p>
                                <p className="text-gray-700">Server Memory Usage: {serverMemoryUsage}</p>
                                <p className="text-gray-700">Total Heap Memory : {totalHeapMemory}</p>
                                <p className="text-gray-700">Free Memory: {yourMemoryUsage}</p>
                                <p className="text-gray-700">Total Memory: {yourTotalMemory}</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </div>

            <style
                jsx
                global>{`
                .shadow-text {
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
                }
            `}</style>
        </div>
    )
}
