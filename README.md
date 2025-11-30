# Multi-Business Organizer

A comprehensive multi-business management platform with financial tracking, CRM, expense management, and subscription-based payments.

## 🚀 Features

- **Multi-Business Management**: Manage multiple businesses from a single dashboard
- **Financial Tracking**: Track income, expenses, and generate detailed reports
- **CRM Integration**: Manage clients and contacts for each business
- **Analytics & Reports**: Visual charts and reports for business performance
- **Subscription Management**: Stripe-powered subscription plans
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time Updates**: Live data synchronization across all components

## 📋 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Redux Toolkit** - State management
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Stripe** - Payment processing
- **JWT** - Authentication

## 🛠️ Installation

### Prerequisites
- Node.js 18+ and npm/yarn
- Git
- Stripe account (for payment features)

### Step 1: Clone the Repository

```bash
git clone <your-gitlab-repo-url>
cd multi-business-organizer
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Environment Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
# Stripe Keys (get from https://dashboard.stripe.com/apikeys)
VITE_STRIPE_PUBLIC_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_secret_key

# API Configuration
VITE_API_URL=http://localhost:5000/api

# JWT Secret (generate a random string)
JWT_SECRET=your_super_secret_jwt_key_here

# Server Port
PORT=5000
```

### Step 4: Run the Application

**Development mode (frontend + backend):**

Terminal 1 - Frontend:
```bash
npm run dev
```

Terminal 2 - Backend:
```bash
npm run server
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## 📦 Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## 🚢 Deployment

### Deploy to Vercel (Frontend)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables in Vercel dashboard:
   - `VITE_STRIPE_PUBLIC_KEY`
   - `VITE_API_URL`

### Deploy Backend to Railway/Render

1. Create a new project on Railway.app or Render.com
2. Connect your GitLab repository
3. Set environment variables:
   - `STRIPE_SECRET_KEY`
   - `JWT_SECRET`
   - `PORT`
4. Deploy!

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

## 📖 Usage Guide

### Creating Your First Business

1. **Register/Login**: Create an account or sign in
2. **Navigate to Businesses**: Click on "Businesses" in the sidebar
3. **Add Business**: Click "Add Business" button
4. **Fill Details**: Enter business name, type, industry, and description
5. **Save**: Click "Create Business"

### Managing Expenses

1. **Go to Expenses**: Click "Expenses" in sidebar
2. **Add Transaction**: Click "Add Transaction"
3. **Select Type**: Choose "Income" or "Expense"
4. **Fill Details**: Select business, category, amount, and description
5. **Save**: Click "Add Transaction"

### Viewing Reports

1. **Navigate to Reports**: Click "Reports" in sidebar
2. **View Charts**: See revenue vs expenses charts
3. **Analyze Performance**: Check business-specific performance metrics
4. **Export Data**: Download reports as PDF or CSV

### Managing Subscription

1. **Go to Subscription**: Click "Subscription" in sidebar
2. **Choose Plan**: Select Free, Basic, Premium, or Enterprise
3. **Payment**: Enter payment details (Stripe Checkout)
4. **Confirm**: Complete payment and enjoy features!

## 🎨 Project Structure

```
multi-business-organizer/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── auth/       # Login, Register
│   │   ├── business/   # Business management
│   │   ├── dashboard/  # Dashboard
│   │   ├── expenses/   # Expense tracking
│   │   ├── layout/     # Layout components
│   │   ├── payments/   # Subscription & payments
│   │   └── reports/    # Reports & analytics
│   ├── store/          # Redux store
│   │   └── slices/     # Redux slices
│   ├── services/       # API services
│   ├── types/          # TypeScript types
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Entry point
├── server.js           # Express backend
├── package.json        # Dependencies
└── README.md          # This file
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Businesses
- `GET /api/businesses` - Get all businesses
- `GET /api/businesses/:id` - Get single business
- `POST /api/businesses` - Create business
- `PUT /api/businesses/:id` - Update business
- `DELETE /api/businesses/:id` - Delete business

### Expenses
- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Create expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

### Subscriptions
- `GET /api/subscription/plans` - Get all plans
- `GET /api/subscription/current` - Get current plan
- `POST /api/create-checkout-session` - Create Stripe checkout

## 🧪 Testing

```bash
npm run test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@multibusinessorganizer.com or join our Slack channel.

## 🗺️ Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Multi-currency support
- [ ] Team collaboration features
- [ ] Integration with accounting software
- [ ] Automated invoicing
- [ ] Inventory management
- [ ] Calendar & scheduling

## ⭐ Acknowledgments

- Built with React and TypeScript
- Powered by Stripe for payments
- Deployed on Vercel/Netlify
- Icons by Lucide React
- Charts by Recharts
