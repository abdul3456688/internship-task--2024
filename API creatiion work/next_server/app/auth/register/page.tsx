'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import zxcvbn from 'zxcvbn'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    password: '',
    consent: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    if (name === 'password') {
      const result = zxcvbn(value)
      setPasswordStrength(result.score)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Here you would typically send the data to your backend
  }

  const getPasswordStrengthColor = () => {
    const colors = ['#ff4d4f', '#faad14', '#52c41a', '#1890ff']
    return colors[passwordStrength] || '#d9d9d9'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg"
    >
      <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOffIcon className="h-4 w-4 text-gray-500" />
              ) : (
                <EyeIcon className="h-4 w-4 text-gray-500" />
              )}
            </button>
          </div>
          <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full"
              style={{ backgroundColor: getPasswordStrengthColor() }}
              initial={{ width: '0%' }}
              animate={{ width: `${(passwordStrength + 1) * 25}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-xs mt-1 text-gray-500">
            Password strength: {['Weak', 'Fair', 'Good', 'Strong'][passwordStrength]}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="consent"
            name="consent"
            checked={formData.consent}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, consent: checked as boolean }))}
          />
          <Label htmlFor="consent" className="text-sm">
            I agree to the Terms of Service and Privacy Policy
          </Label>
        </div>
        <Button type="submit" className="w-full" disabled={!formData.consent}>
          Register
        </Button>
      </form>
    </motion.div>
  )
}