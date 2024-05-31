This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Getting Started
These instructions will guide you on how to set up and run the project on your new machine.

## Prerequisites
Make sure you have the following software installed:

Node.js, npm or Yarn,  Git
## Installation

1. Clone the project repository:
```bash
git clone https://github.com/your-username/your-project.git
cd your-project
```
2. Install project dependencies:
```bash
npm install
# or
yarn install
```
3. Configure environment variables:

- Create a .env file in the project root directory.
- Copy the content from .env.example and paste it into .env.
- Edit the .env file with your specific environment variables (e.g., database connection string to change your database name and password).
```bash
cp .env.example .env
# Then edit .env with the correct values
```
4. Generate Prisma client:
```bash
npx prisma generate
```
5. Run database migrations:
- Run the following command to create or update the database schema.
```bash
npx prisma migrate dev
# or
npx prisma migrate deploy
```
6. Import initial data into database
- Open the importTask.js file and change your database connection string and run this command.
```bash
node importTasks.js
```
7.Running the Project
- After following the installation steps, you can start the project using:
```bash
npm run dev
node index
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
