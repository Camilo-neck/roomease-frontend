// Next
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

// React
import { useState } from 'react'

// Styles
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

// Material UI
import { Button, ToggleButton, ToggleButtonGroup, IconButton, AvatarGroup, Avatar, Rating } from '@mui/material'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ListRoundedIcon from '@mui/icons-material/ListRounded';
import AddHomeRoundedIcon from '@mui/icons-material/AddHomeRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';

// Components
import GridHouseCard from '@/components/gridHouseCard'
import ListHouseCard from '@/components/listHouseCard'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '@/redux/slices/user.slice'
import { logoutUser } from '@/controllers/auth.controllers'
import { useEffect } from 'react'
import { getCookie } from '@/lib/cookie'
import jwt from 'jsonwebtoken'
import { fetchUserInfo } from '@/redux/thunks/user.thunk'
import { useRouter } from 'next/navigation'
import { fetchHouses } from '@/controllers/houses.controllers'

const inter = Inter({ subsets: ['latin'] })

const houses = [
  {
    name: 'Casa de la playa',
    description: 'Casa de la playa de la familia ',
  },
  {
    name: 'Casa de la playa',
    description: 'Casa de la playa de la familia ',
  },
  {
    name: 'Casa de la playa',
    description: 'Casa de la playa de la familia ',
  },
  {
    name: 'Casa de la playa',
    description: 'Casa de la playa de la familia ',
  },
  {
    name: 'Casa de la playa',
    description: 'Casa de la playa de la familia ',
  },
]


const Houses = () => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch();
  const [view, setView] = useState('grid')
  const [ houses, setHouses ] = useState<any[]>([])

  useEffect(() => {
    // Fetch the user
    async function f() {
      const cookie = getCookie('auth-token')
      if (cookie) {
        const decoded: any = jwt.decode(cookie)
        if (decoded) {
          const { _id } = decoded
          dispatch(fetchUserInfo(_id, cookie))
          setHouses(await fetchHouses(_id, cookie))
        }
      }
    }
    f()
  }, [])


  return (
    <>
      <Head>
        <title>Houses</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-[#FAFDFD] h-screen">
        <div className='bg-primary-40/5 h-screen flex flex-col items-center'>
          <div className="w-full min-w-full items-center flex flex-row p-2">
            <p className="font-bold text-xl text-primary-20 flex-grow">Roomease</p>
            <div className="flex flex-row gap-3 mr-5">
              <IconButton>
                <AccountBoxOutlinedIcon className="text-primary-20" />
              </IconButton>
              <IconButton>
                <HomeOutlinedIcon className="text-primary-20" />
              </IconButton>
              <IconButton>
                <SettingsOutlinedIcon className="text-primary-20" />
              </IconButton>
            </div>
          </div>
          <hr className='border border-neutral_variant-80 w-full' />
          <div className="flex w-[80vw] h-screen items-center justify-center">
            <div className='flex flex-col w-full h-[80vh] p-3 gap-8'>
              <div className="flex flex-row h-fit w-full">
                <div className="flex flex-grow items-center">
                  <Image src="/houses_icon.png" alt='homes icon' width={45} height={45} />
                  <p className="font-semibold text-3xl">Mis casas</p>
                </div>
                <IconButton
                  className='bg-tertiary-60 hover:bg-tertiary-60/90 active:bg-tertiary-60 focus:bg-tertiary-60
                text-white hover:text-tertiary-95 transition-colors ease-linear duration-200 h-fit'
                >
                  <AddHomeRoundedIcon />
                </IconButton>
              </div>
              <div className="flex flex-col gap-3 items-center w-full">
                <div className="flex flex-col w-full items-end">
                  <ToggleButtonGroup
                    className='self-end'
                    value={view}
                    onChange={(e, newAlignment) => setView(newAlignment)}
                    exclusive
                  >
                    <ToggleButton
                      value="list"
                    >
                      <ListRoundedIcon />
                    </ToggleButton>

                    <ToggleButton
                      value="grid"
                    >
                      <GridViewRoundedIcon />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>

                <div className="w-full h-[68vh] overflow-y-auto rounded-lg">
                  <div
                    className={`flex w-full
                  ${view === "grid" ? "flex-row flex-wrap" : "flex-col pr-5"} 
                  gap-14 max-h-full`}>
                    {
                      view === 'grid' ?
                        houses.map((house, index) => (
                          <GridHouseCard
                            key={index}
                            name={house.name}
                            description={house.description}
                          />
                        ))
                        :
                        houses.map((house, index) => (
                          <ListHouseCard
                            key={index}
                            name={house.name}
                            description={house.description}
                          />
                        ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
};

export default Houses;