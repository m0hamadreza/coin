import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className='flex justify-evenly items-center h-[100vh]'>
      <Link className='flex justify-center items-center w-[100px] h-[48px] border-solid border-[1px] border-[white] rounded-[16px]' href="/CSR">CSR</Link>
      <Link className='flex justify-center items-center w-[100px] h-[48px] border-solid border-[1px] border-[white] rounded-[16px]' href="/SSR">SSR</Link>
    </main>
    
  )
}
