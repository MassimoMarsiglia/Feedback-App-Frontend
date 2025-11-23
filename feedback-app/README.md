# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Available Scripts

- `npm run dev` - Start development server (uses .env.development)
- `npm run build` - Build for production (uses .env.production)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Environment Variables

This project uses environment-specific configuration files:

- `.env.development` - Development environment variables (used with `npm run dev`)
- `.env.production` - Production environment variables (used with `npm run build`)
- `.env.example` - Example environment file (for reference)

### Available Environment Variables

- `VITE_API_BASE_URL` - Backend API URL
- `VITE_APP_ENV` - Application environment (development/production)

### Usage in Code

Import the environment config:

```typescript
import { env } from '@/config/env'

// Use environment variables
const apiUrl = env.apiBaseUrl
const isDev = env.isDevelopment
```

**Note:** All Vite environment variables must be prefixed with `VITE_` to be exposed to the client-side code.

## AWS S3 Deployment via CodePipeline

This project includes a `buildspec.yml` file for AWS CodeBuild integration.

### Prerequisites

1. **AWS S3 Bucket** configured for static website hosting
2. **AWS CodePipeline** set up with:
   - **Source**: GitHub (this repository)
   - **Build**: AWS CodeBuild (uses buildspec.yml)
   - **Deploy**: AWS S3

### S3 Bucket Configuration

1. Create an S3 bucket for static website hosting
2. Enable "Static website hosting" in bucket properties
3. Set index document to `index.html`
4. Set error document to `index.html` (for React Router support)
5. Update bucket policy to allow public read access:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    }
  ]
}
```

### CodePipeline Setup

1. **Create Pipeline** in AWS CodePipeline console
2. **Source Stage**: Connect to your GitHub repository
3. **Build Stage**: 
   - Provider: AWS CodeBuild
   - Create a new build project with:
     - Environment: Managed image (Amazon Linux 2)
     - Runtime: Standard
     - Image: aws/codebuild/standard:7.0
     - Buildspec: Use buildspec.yml from repository
4. **Deploy Stage**:
   - Provider: Amazon S3
   - Bucket: Your S3 bucket name
   - Extract files before deploy: Yes

### CloudFront (Optional but Recommended)

For better performance and HTTPS support:

1. Create a CloudFront distribution
2. Set origin to your S3 bucket website endpoint
3. Configure custom error responses:
   - HTTP 404 → /index.html (200 response)
   - HTTP 403 → /index.html (200 response)

This ensures React Router works correctly with direct URL access.

---

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
