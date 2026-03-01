import '@testing-library/jest-dom'
import 'whatwg-fetch'

// Set dummy environment variables to bypass validation in src/config/env.ts during tests
process.env.NEXT_PUBLIC_SUPABASE_URL = 'http://localhost:54321'
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'dummy-anon-key'
process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000'
