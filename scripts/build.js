import { build } from 'vite'

async function main() {
  try {
    // Run Vite build programmatically and don't forward unknown CLI flags
    await build()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

main()
