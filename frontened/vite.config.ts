import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    server: {
      host: env.VITE_HOST ?? "127.0.0.1",
      port: parseInt(env.VITE_PORT) ?? 3000,
    },
  plugins: [react()],
  }) 
})
