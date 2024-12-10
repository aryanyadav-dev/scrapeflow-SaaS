# ScrapeFlow

ScrapeFlow is a powerful SaaS platform for workflow automation with integrated web scraping capabilities. Built on Next.js, FlowScrape lets users automate complex data extraction workflows, securely store credentials, manage billing, and monitor performance—all in one intuitive interface.

![FlowScrape1_screenshot](/public/preview/preview_1.png)

![FlowScrape2_screenshot](/public/preview/preview_2.png)

## 📋 Key Features

- **Workflow Automation**: Easily build and execute multi-step workflows. Run tasks in distinct phases with assigned credits, providing granular control over your scraping executions.

- **Advanced Web Scraping Tools**: Access a suite of scraping tools to design customized workflows tailored to different data needs, supporting automated actions and scheduled executions.

- **Credential Storage**: Securely store API keys, tokens, and other sensitive information with encrypted storage, ensuring secure handling of credentials.

- **Billing System with Stripe**: Effortlessly manage your billing and subscriptions with our Stripe integration, allowing for transparent usage tracking, subscription management, and billing history.

- **Intuitive UI and Analytics**: Experience a clean, modern UI built with ShadCn, featuring real-time charts and reports for comprehensive monitoring of scraping performance and usage.

- **Secure Server-Side Handling**: FlowScrape uses Next.js server actions for backend operations, ensuring secure processing of sensitive tasks.

- **AI-Powered Web Scraping (Beta)**: Explore our beta AI-driven feature that intelligently navigates and scrapes data from complex websites.

## 🚀 Getting Started

1. **Sign Up**: Create an account on FlowScrape and choose a subscription plan that suits your needs. FREE 100 credits are provided for first time users.
2. **Add Credentials**: Securely store your API keys, tokens, and other credentials for seamless workflow execution.
3. **Build Your Workflow**: Utilize FlowScrape’s tools to design your workflow phases, and scrape the web with controlled execution.
4. **Monitor and Analyze**: Track the performance of your workflows through real-time analytics, and manage your billing and usage directly on the dashboard.

## 🛠️ Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [Tailwind](https://tailwindcss.com/) and [ShadCn](https://shadcn.dev) for UI components
- **Backend**: Secure server-side processing with [Next.js](https://nextjs.org/) server actions
- **Billing**: [Stripe](https://stripe.com) integration for payment processing
- **Security**: Encrypted credential storage to protect sensitive data
- **Analytics**: Real-time data visualization and reporting

## 📊 Usage & Billing

FlowScrape's credit-based system allows you to manage workflow executions efficiently. The Stripe integration provides transparent billing, letting you track usage and manage subscriptions.

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-web-scraper-builder.git
   cd ai-web-scraper-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add the following:
   ```env
   NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key
   DATABASE_URL=postgresql://username:password@localhost:5432/yourdb
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

---

## Usage

### 1. **Sign Up/Log In**
   - Use NextAuth.js to sign up or log in to your account.

### 2. **Create a Workflow**
   - Drag and drop nodes to define scraping tasks.
   - Use AI suggestions for selector optimization.

### 3. **Set Credentials**
   - Securely store website login credentials if required.

### 4. **Schedule Scraping**
   - Use the scheduling feature to automate scraping tasks.

### 5. **Export Data**
   - Download scraped data in the desired format.

---

## Development

### Scripts
- **Start development server**: `npm run dev`
- **Build for production**: `npm run build`
- **Run production server**: `npm start`

### Linting and Formatting
- **Lint code**: `npm run lint`
- **Format code**: `npm run format`

---

## Roadmap
- Add support for multi-step scraping workflows.
- Integrate more export formats (e.g., Google Sheets, Excel).
- Enhance AI capabilities for broader use cases.



