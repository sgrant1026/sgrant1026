import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import Stripe from 'stripe'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
})

// Middleware
app.use(cors())
app.use(express.json())

// Mock database (replace with real database in production)
let users = []
let businesses = []
let expenses = []
let subscriptions = []

// Subscription plans
const SUBSCRIPTION_PLANS = [
  {
    id: '1',
    name: 'Free',
    price: 0,
    interval: 'month',
    features: ['Up to 2 businesses', '100 transactions/month', 'Basic reports', 'Email support'],
    maxBusinesses: 2,
    support: 'email',
    stripePriceId: '',
  },
  {
    id: '2',
    name: 'Basic',
    price: 19,
    interval: 'month',
    features: ['Up to 5 businesses', 'Unlimited transactions', 'Advanced reports', 'Priority support'],
    maxBusinesses: 5,
    support: 'priority',
    stripePriceId: 'price_basic',
  },
  {
    id: '3',
    name: 'Premium',
    price: 49,
    interval: 'month',
    features: ['Up to 15 businesses', 'Unlimited everything', 'Advanced analytics', 'Dedicated support'],
    maxBusinesses: 15,
    support: 'dedicated',
    stripePriceId: 'price_premium',
  },
]

// Auth routes
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body
  
  const existingUser = users.find((u) => u.email === email)
  if (existingUser) {
    return res.status(400).json({ success: false, error: 'User already exists' })
  }
  
  const newUser = {
    id: `user-${Date.now()}`,
    name,
    email,
    createdAt: new Date().toISOString(),
    subscriptionTier: 'free',
    subscriptionStatus: 'active',
  }
  
  users.push(newUser)
  
  res.json({
    success: true,
    data: {
      user: newUser,
      token: `token-${newUser.id}`,
    },
  })
})

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body
  
  const user = users.find((u) => u.email === email)
  if (!user) {
    return res.status(401).json({ success: false, error: 'Invalid credentials' })
  }
  
  res.json({
    success: true,
    data: {
      user,
      token: `token-${user.id}`,
    },
  })
})

// Business routes
app.get('/api/businesses', (req, res) => {
  res.json({ success: true, data: businesses })
})

app.get('/api/businesses/:id', (req, res) => {
  const business = businesses.find((b) => b.id === req.params.id)
  if (!business) {
    return res.status(404).json({ success: false, error: 'Business not found' })
  }
  res.json({ success: true, data: business })
})

app.post('/api/businesses', (req, res) => {
  const newBusiness = {
    id: `business-${Date.now()}`,
    userId: 'user-1',
    ...req.body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    revenue: 0,
    expenses: 0,
    profit: 0,
  }
  
  businesses.push(newBusiness)
  res.json({ success: true, data: newBusiness })
})

app.put('/api/businesses/:id', (req, res) => {
  const index = businesses.findIndex((b) => b.id === req.params.id)
  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Business not found' })
  }
  
  businesses[index] = {
    ...businesses[index],
    ...req.body,
    updatedAt: new Date().toISOString(),
  }
  
  res.json({ success: true, data: businesses[index] })
})

app.delete('/api/businesses/:id', (req, res) => {
  businesses = businesses.filter((b) => b.id !== req.params.id)
  res.json({ success: true, message: 'Business deleted' })
})

// Expense routes
app.get('/api/expenses', (req, res) => {
  const { businessId } = req.query
  let filtered = expenses
  
  if (businessId) {
    filtered = expenses.filter((e) => e.businessId === businessId)
  }
  
  res.json({ success: true, data: filtered })
})

app.post('/api/expenses', (req, res) => {
  const newExpense = {
    id: `expense-${Date.now()}`,
    ...req.body,
    createdAt: new Date().toISOString(),
  }
  
  expenses.push(newExpense)
  res.json({ success: true, data: newExpense })
})

app.put('/api/expenses/:id', (req, res) => {
  const index = expenses.findIndex((e) => e.id === req.params.id)
  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Expense not found' })
  }
  
  expenses[index] = { ...expenses[index], ...req.body }
  res.json({ success: true, data: expenses[index] })
})

app.delete('/api/expenses/:id', (req, res) => {
  expenses = expenses.filter((e) => e.id !== req.params.id)
  res.json({ success: true, message: 'Expense deleted' })
})

// Subscription routes
app.get('/api/subscription/plans', (req, res) => {
  res.json({ success: true, data: SUBSCRIPTION_PLANS })
})

app.get('/api/subscription/current', (req, res) => {
  const currentPlan = SUBSCRIPTION_PLANS.find((p) => p.name.toLowerCase() === 'free')
  res.json({ success: true, data: currentPlan })
})

// Stripe payment routes
app.post('/api/create-checkout-session', async (req, res) => {
  const { priceId, planName } = req.body
  
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${req.headers.origin}/subscription?success=true`,
      cancel_url: `${req.headers.origin}/subscription?canceled=true`,
    })
    
    res.json({ success: true, data: { url: session.url } })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

app.post('/api/create-payment-intent', async (req, res) => {
  const { amount } = req.body
  
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: 'usd',
    })
    
    res.json({
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret,
      },
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📊 API available at http://localhost:${PORT}/api`)
})
