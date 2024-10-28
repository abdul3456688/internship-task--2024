'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DollarSign, Users, TrendingUp, ChevronDown, Bell, Search, User } from 'lucide-react'

export default function AccountantDashboard() {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState('overview')

    const handleNavigation = (path: string) => {
        router.push(path)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 p-8">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Financial Dashboard</h1>
                        <p className="text-gray-600">Welcome back, Chief Accountant</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="outline"
                            size="icon">
                            <Bell className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon">
                            <User className="h-4 w-4" />
                        </Button>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$45,231.89</div>
                            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+2350</div>
                            <p className="text-xs text-muted-foreground">+180 new clients this week</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Sales Growth</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+12.5%</div>
                            <p className="text-xs text-muted-foreground">Compared to last quarter</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex justify-between items-center mb-6">
                    <div className="space-x-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                    Requests <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuItem onSelect={() => handleNavigation('/requests/client')}>Client Requests</DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => handleNavigation('/requests/salesman')}>Salesman Requests</DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => handleNavigation('/requests/admin')}>Admin Requests</DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => handleNavigation('/project/update')}>
                                    Budget Increase Requests
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => handleNavigation('/requests/expense-approval')}>
                                    Expense Approval Requests
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button variant="outline">Generate Report</Button>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Input
                            type="text"
                            placeholder="Search transactions..."
                            className="w-64"
                        />
                        <Button
                            size="icon"
                            variant="ghost">
                            <Search className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="transactions">Transactions</TabsTrigger>
                        <TabsTrigger value="budgets">Budgets</TabsTrigger>
                        <TabsTrigger value="forecasts">Forecasts</TabsTrigger>
                    </TabsList>
                    <TabsContent
                        value="overview"
                        className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Financial Overview</CardTitle>
                                <CardDescription>Your company's financial health at a glance</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[200px] flex items-center justify-center text-2xl font-semibold text-gray-500">
                                    [Financial Overview Chart]
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent
                        value="transactions"
                        className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Transactions</CardTitle>
                                <CardDescription>A list of the most recent financial transactions</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[200px] flex items-center justify-center text-2xl font-semibold text-gray-500">
                                    [Transactions Table]
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent
                        value="budgets"
                        className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Department Budgets</CardTitle>
                                <CardDescription>Overview of allocated budgets and spending</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[200px] flex items-center justify-center text-2xl font-semibold text-gray-500">
                                    [Budget Allocation Chart]
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent
                        value="forecasts"
                        className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Financial Forecasts</CardTitle>
                                <CardDescription>Projected financial performance for the next quarter</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[200px] flex items-center justify-center text-2xl font-semibold text-gray-500">
                                    [Financial Forecast Chart]
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
