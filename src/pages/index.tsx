import Image from 'next/image';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center text-white ${inter.className}`}
    >
      <div className='flex items-center justify-center my-40 mx-10 max-[640px]:flex-col max-[640px]:text-center'>
        <div className='flex-1 gap-6 '>
          <h1 className='text-5xl mb-6 font-bold '>
            Create worksheets in just a few steps.
          </h1>
          <h3 className='text-xl'>
            Create and save worksheets for yourself or your students. Style
            worksheets however you want.
          </h3>
          <Link href='/worksheet'>
            <button className='px-6 py-2 mt-5 rounded-lg bg-sky-500 hover:bg-sky-800'>
              Create{' '}
            </button>
          </Link>
        </div>
        <div className=' flex-1 flex items-center justify-end '>
          <Image src='/icon.png' width={300} height={200} alt='icon' />
        </div>
      </div>
    </main>
  );
}
