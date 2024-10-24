'use client'

import React, { useState } from 'react'
import {
  BarChart as LucideBarChart,
  FileText,
  User,
  HelpCircle,
  Download,
  Plus
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts'

interface SidebarProps {
  activeItem: string;
  setActiveItem: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, setActiveItem }) => {
  const menuItems = [
    { name: 'Dashboard', icon: LucideBarChart },
    { name: 'Policies', icon: FileText },
    { name: 'Profile', icon: User },
    { name: 'Help & Support', icon: HelpCircle },
  ]

  return (
    <div className="w-64 bg-white border-r h-screen p-4">
      <div className="flex items-center mb-8">
        <LucideBarChart className="mr-2" />
        <h1 className="text-xl font-bold">Life Insurance</h1>
      </div>
      {menuItems.map((item) => (
        <button
          key={item.name}
          className={`flex items-center w-full p-2 mt-2 text-left ${activeItem === item.name ? 'bg-gray-200' : ''}`}
          onClick={() => setActiveItem(item.name)}
        >
          <item.icon className="mr-2" />
          {item.name}
        </button>
      ))}
    </div>
  )
}

const DashboardContent = () => {
  const monthlyRevenueData = [
    { name: 'Jan', revenue: 4000 },
    { name: 'Feb', revenue: 3000 },
    { name: 'Mar', revenue: 5000 },
    { name: 'Apr', revenue: 4500 },
    { name: 'May', revenue: 6000 },
    { name: 'Jun', revenue: 5500 },
  ]

  const policyDistributionData = [
    { name: 'Term Life', value: 400 },
    { name: 'Whole Life', value: 300 },
    { name: 'Universal Life', value: 300 },
    { name: 'Variable Life', value: 200 },
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Policies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-gray-500">+20% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Claims</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-gray-500">-5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Premium Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$567,890</div>
            <p className="text-xs text-gray-500">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-gray-500">+2% from last month</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                revenue: {
                  label: 'Revenue',
                  color: 'hsl(var(--chart-1))',
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Policy Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: 'Policies',
                  color: 'hsl(var(--chart-1))',
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={policyDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {policyDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

const ProfileContent = () => {
  return (
    <div className="flex">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" placeholder="John Doe" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="123 Main St, City, Country" />
            </div>
            <Button type="submit">Update Profile</Button>
          </form>
        </CardContent>
      </Card>
      <div className="flex-1"></div> {/* This empty div pushes the card to the left */}
    </div>
  )
}

const ReportsContent = () => {
  const monthlyClaimsData = [
    { month: 'Jan', claims: 45 },
    { month: 'Feb', claims: 52 },
    { month: 'Mar', claims: 49 },
    { month: 'Apr', claims: 63 },
    { month: 'May', claims: 55 },
    { month: 'Jun', claims: 58 },
  ]

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Monthly Claims Report</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              claims: {
                label: 'Claims',
                color: 'hsl(var(--chart-1))',
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyClaimsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="claims" fill="var(--color-claims)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Claims Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p><strong>Total Claims:</strong> 322</p>
            <p><strong>Average Claims per Month:</strong> 53.67</p>
            <p><strong>Highest Month:</strong> April (63 claims)</p>
            <p><strong>Lowest Month:</strong> January (45 claims)</p>
            <p><strong>Trend:</strong> Claims are showing a slight upward trend over the past 6 months.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const PaymentsContent = () => {
  const paymentHistory = [
    { id: 1, date: '2023-06-01', amount: 500, status: 'Paid' },
    { id: 2, date: '2023-05-01', amount: 500, status: 'Paid' },
    { id: 3, date: '2023-04-01', amount: 500, status: 'Paid' },
    { id: 4, date: '2023-03-01', amount: 500, status: 'Paid' },
    { id: 5, date: '2023-02-01', amount: 500, status: 'Paid' },
  ]

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Payment Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Next Payment Due</p>
              <p className="text-2xl font-bold">July 1, 2023</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Amount Due</p>
              <p className="text-2xl font-bold">$500.00</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Payment Frequency</p>
              <p className="text-2xl font-bold">Monthly</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Paid (YTD)</p>
              <p className="text-2xl font-bold">$3,000.00</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Amount</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment) => (
                  <tr key={payment.id}>
                    <td className="py-2">{payment.date}</td>
                    <td className="py-2">${payment.amount.toFixed(2)}</td>
                    <td className="py-2">
                      <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const PoliciesContent = () => {
  const policies = [
    { id: 1, name: 'Term Life Insurance', coverage: '$500,000', premium: '$50/month', status: 'Active' },
    { id: 2, name: 'Whole Life Insurance', coverage: '$250,000', premium: '$150/month', status: 'Active' },
    { id: 3, name: 'Universal Life Insurance', coverage: '$300,000', premium: '$100/month', status: 'Pending' },
  ]

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Your Policies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="pb-2">Policy Name</th>
                  <th className="pb-2">Coverage</th>
                  <th className="pb-2">Premium</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {policies.map((policy) => (
                  <tr key={policy.id}>
                    <td className="py-2">{policy.name}</td>
                    <td className="py-2">{policy.coverage}</td>
                    <td className="py-2">{policy.premium}</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        policy.status === 'Active' ? 'text-green-800 bg-green-100' : 'text-yellow-800 bg-yellow-100'
                      }`}>
                        {policy.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      <Button>
        <Plus className="mr-2 h-4 w-4" /> Add New Policy
      </Button>
    </div>
  )
}

const ClaimsContent = () => {
  const claims = [
    { id: 1, policyName: 'Term Life Insurance', claimDate: '2023-05-15', amount: '$10,000', status: 'Approved' },
    { id: 2, policyName: 'Whole Life Insurance', claimDate: '2023-06-01', amount: '$5,000', status: 'Pending' },
    { id: 3, policyName: 'Universal Life Insurance', claimDate: '2023-06-10', amount: '$7,500', status: 'Under Review' },
  ]

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Recent Claims</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="pb-2">Policy Name</th>
                  <th className="pb-2">Claim Date</th>
                  <th className="pb-2">Amount</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {claims.map((claim) => (
                  <tr key={claim.id}>
                    <td className="py-2">{claim.policyName}</td>
                    <td className="py-2">{claim.claimDate}</td>
                    <td className="py-2">{claim.amount}</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        claim.status === 'Approved' ? 'text-green-800 bg-green-100' :
                        claim.status === 'Pending' ? 'text-yellow-800 bg-yellow-100' :
                        'text-blue-800 bg-blue-100'
                      }`}>
                        {claim.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      <Button>
        <Plus className="mr-2 h-4 w-4" /> File New Claim
      </Button>
    </div>
  )
}

const SettingsContent = () => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Label htmlFor="email">Email Notifications</Label>
              <Input id="email" type="email" placeholder="your@email.com" />
            </div>
            <div>
              <Label htmlFor="password">Change Password</Label>
              <Input id="password" type="password" placeholder="New password" />
            </div>
            <div>
              <Label htmlFor="language">Preferred Language</Label>
              <select id="language" className="w-full p-2 border rounded">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            <Button type="submit">Save Changes</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

const HelpSupportContent = () => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Enter the subject of your inquiry" />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Describe your issue or question" rows={5} />
            </div>
            <Button type="submit">Send Message</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>FAQs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">How do I file a claim?</h3>
              <p>You can file a claim by logging into your account and navigating to the Claims section. Follow the prompts to submit your claim.</p>
            </div>
            <div>
              <h3 className="font-semibold">How long does it take to process a claim?</h3>
              <p>Typically, claims are processed within 5-7 business days. Complex claims may take longer.</p>
            </div>
            {/* Add more FAQs as needed */}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Main component definition
export const Dashboard: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>('Dashboard')

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
      <MainContent activeItem={activeItem} />
    </div>
  )
}

interface MainContentProps {
  activeItem: string;
}

const MainContent: React.FC<MainContentProps> = ({ activeItem }) => {
  return (
    <div className="flex-1 p-8 overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">{activeItem}</h2>
        <div className="flex items-center">
          <span className="mr-4">Jan 20, 2023 - Feb 09, 2023</span>
          <Button variant="outline">
            <Download className="mr-2" />
            Download
          </Button>
        </div>
      </div>
      {activeItem === 'Dashboard' && <DashboardContent />}
      {activeItem === 'Policies' && <PoliciesContent />}
      {activeItem === 'Claims' && <ClaimsContent />}
      {activeItem === 'Payments' && <PaymentsContent />}
      {activeItem === 'Reports' && <ReportsContent />}
      {activeItem === 'Profile' && <ProfileContent />}
      {activeItem === 'Settings' && <SettingsContent />}
      {activeItem === 'Help & Support' && <HelpSupportContent />}
    </div>
  )
}
