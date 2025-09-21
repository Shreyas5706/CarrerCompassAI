# Deploying CareerCompass to Vercel

Follow these steps to deploy your CareerCompass application to Vercel:

## Prerequisites

1. Create a [Vercel account](https://vercel.com/signup) if you don't have one
2. Install the Vercel CLI: `npm install -g vercel`

## Deployment Steps

1. **Login to Vercel**
   ```
   vercel login
   ```

2. **Set up environment variables**
   Create a `.env` file based on the `.env.example` template and fill in your actual Firebase and Google Cloud credentials.

3. **Deploy to Vercel**
   Run the following command in your project directory:
   ```
   vercel
   ```
   
   Follow the prompts:
   - Set up and deploy? Yes
   - Which scope? (Select your account)
   - Link to existing project? No
   - Project name? career-compass (or your preferred name)
   - Directory? ./
   - Override settings? No

4. **Set environment variables on Vercel**
   After deployment, go to your Vercel dashboard, select your project, and add all the environment variables from your `.env` file in the "Settings" > "Environment Variables" section.

5. **Deploy with production settings**
   ```
   vercel --prod
   ```

## Custom Domain (Optional)

1. In your Vercel dashboard, go to your project settings
2. Click on "Domains"
3. Add your custom domain and follow the verification steps

## Continuous Deployment

Vercel automatically deploys your application when you push to your connected Git repository. To set this up:

1. Push your code to GitHub, GitLab, or Bitbucket
2. In Vercel, connect your repository in the project settings
3. Configure the build settings if needed

Your CareerCompass application is now hosted on the internet and accessible worldwide!