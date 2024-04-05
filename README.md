
# SocialMediaApp

This is a modern, responsive social media application inspired by Meta's Threads. Built with TypeScript, Next.js, and Tailwind CSS, it offers a dynamic and intuitive platform for users to post threads, join communities, and manage community roles including member and admin functionalities. Deployed on Vercel for seamless performance and accessibility.

## Features

- **User Authentication**: Secure sign-up and login functionality.
- **Post Threads**: Users can create, edit, and delete their own threads.
- **Communities**: Users can create or join communities based on their interests.
- **Role Management**: Assign roles within communities, including members and admins, with specific permissions.
- **Responsive Design**: Fully responsive on all devices, ensuring a seamless experience across desktops, tablets, and mobiles.
- **Real-time Updates**: Immediate updates for thread posts and community interactions.
- **Dark Mode**: User preference for dark or light mode.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Installing

Clone the repository:

```bash
git clone https://github.com/mayank3aj3769/socialMediaApp.git
cd socialMediaApp
```

Install dependencies:

```bash
npm i 
```

Create a `.env.local` file at the root of your project and add the necessary environment variables:

```env
NEXT_PUBLIC_VERCEL_URL=<your_vercel_deployment_url>
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<relevant_keys>
CLERK_SECRET_KEY=<Clerk-key>
NEXT_CLERK_WEBHOOK_SECRET=<web hook key from vercel>   

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

MONGODB_URL=<mongo_db cluster url>

UPLOADTHING_SECRET=<relevant-info>
UPLOADTHING_APP_ID=<relevant-info>
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This project is set up to deploy to Vercel with zero configuration. Follow the [Vercel Deployment Documentation](https://vercel.com/docs) for detailed instructions on deploying Next.js applications.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgments

- Inspired by Meta's Threads app

