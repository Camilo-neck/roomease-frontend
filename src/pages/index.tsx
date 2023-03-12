// Next
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

// Styles
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

// Material UI
import { Button } from '@mui/material'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '@/redux/slices/user.slice'
import { logoutUser } from '@/controllers/auth.controllers'
import { useEffect } from 'react'
import { getCookie } from '@/lib/cookie'
import jwt from 'jsonwebtoken'
import { fetchUserInfo } from '@/redux/thunks/user.thunk'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    // Fetch the user
    async function f() {
      const cookie = getCookie('auth-token')
      if (cookie) {
        const decoded: any = jwt.decode(cookie)
        if (decoded) {
          const { _id } = decoded
          dispatch(fetchUserInfo(_id, cookie))
        }
      }
    }
    f()
  }, [])

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>src/pages/index.tsx</code>
          </p>
          <p>{user.name}</p>

          {!user.name ? (
            <>
              <Link href='/auth/login'>
                <Button
                  variant='outlined'
                  className='text-[#D0BCFF] hover:bg-[#D0BCFF]/5 focus:bg-[#D0BCFF]/10 rounded-full border focus:border-[#D0BCFF] hover:border-[#938F99] border-[#938F99]'>
                  Login
                </Button>
              </Link>
              <Link href='/auth/register'>
                <Button
                  variant='outlined'
                  className='text-[#CDE5FF] hover:bg-[#CDE5FF]/5 focus:bg-[#CDE5FF]/10 rounded-full border focus:border-[#CDE5FF] hover:border-[#6F797A] border-[#6F797A]'>
                  Register
                </Button>
              </Link>
            </>
          ) :
            <Button
              variant='outlined'
              onClick={() => dispatch(logoutUser())}
              className='text-error-30 hover:bg-error-30/5 focus:bg-error-30/10 rounded-full border focus:border-neutral-30 hover:border-error-20 border-neutral-30'>
              Logout
            </Button>
          }
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' '}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <div className={styles.thirteen}>
            <Image
              src="/thirteen.svg"
              alt="13"
              width={40}
              height={31}
              priority
            />
          </div>
        </div>

        <div className={styles.grid}>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Docs <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Find in-depth information about Next.js features and&nbsp;API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Learn <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Templates <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Discover and deploy boilerplate example Next.js&nbsp;projects.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Deploy <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Instantly deploy your Next.js site to a shareable URL
              with&nbsp;Vercel.
            </p>
          </a>
        </div>
      </main>
    </>
  )
}
