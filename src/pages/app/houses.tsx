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
import { 
	Button, 
	ToggleButton, 
	ToggleButtonGroup, 
	IconButton, 
	AvatarGroup, 
	Avatar, 
	Rating,
	Menu,
	MenuItem
} from '@mui/material'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ListRoundedIcon from '@mui/icons-material/ListRounded';
import AddHomeRoundedIcon from '@mui/icons-material/AddHomeRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';

// Components
import GridHouseCard from '@/components/gridHouseCard'
import ListHouseCard from '@/components/listHouseCard'
import CreateHouseModal from '@/components/createHouseModal'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '@/redux/slices/user.slice'
import { logoutUser } from '@/controllers/auth.controllers'
import { useEffect } from 'react'
import { getCookie } from '@/lib/cookie'
import jwt from 'jsonwebtoken'
import { fetchUserInfo } from '@/redux/thunks/user.thunk'
import { useRouter } from 'next/navigation'
import { fetchHouses, createHouse, joinHouse } from '@/controllers/houses.controllers'
import JoinHouseModal from '@/components/joinHouseModal'
import AppNavbar from '@/components/appNavbar'

const inter = Inter({ subsets: ['latin'] })

const Houses = () => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch();
  const [view, setView] = useState('grid')
  const [ houses, setHouses ] = useState<any[]>([])
  const [ addPopoverAnchorEl, setAddPopoverAnchorEl ] = useState<HTMLButtonElement | null>(null)
  const [ createHouseModalOpen, setCreateHouseModalOpen ] = useState<boolean>(false)
  const [ joinHouseModalOpen, setJoinHouseModalOpen ] = useState<boolean>(false)

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

  // Create House Modal
  const openCreateHouseModal = () => {
	  setCreateHouseModalOpen(true)
  }

  const closeCreateHouseModal = () => {
	  setCreateHouseModalOpen(false)
  }

  const onCreateHouseModalSubmit = async (data: any) => {
    await createHouse(data)
    setHouses((prev) => [...prev, data])
  }

  // Join House Modal
  const openJoinHouseModal = () => {
    setJoinHouseModalOpen(true)
  }
  
  const closeJoinHouseModal = () => {
    setJoinHouseModalOpen(false)
  }
  
  const onJoinHouseModalSubmit = async (data: any) => {
    console.log(data)
    await joinHouse(data.houseCode)
    setHouses(await fetchHouses(user._id, getCookie('auth-token')))
  }

  const handleAddPopoverClick = (event: React.MouseEvent<HTMLButtonElement>) => {
	  setAddPopoverAnchorEl(event.currentTarget)
	}

	const handleAddPopoverClose = () => {
		setAddPopoverAnchorEl(null)
	}

	const addPopoverOpen = Boolean(addPopoverAnchorEl);
	const addPopoverId = addPopoverOpen ? 'add-popover' : undefined;


  return (
    <>
      <Head>
        <title>Houses</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-[#FAFDFD] h-screen">
		  <CreateHouseModal onSubmit={onCreateHouseModalSubmit} onClose={closeCreateHouseModal} isOpen={createHouseModalOpen} />
      <JoinHouseModal onSubmit={onJoinHouseModalSubmit} onClose={closeJoinHouseModal} isOpen={joinHouseModalOpen} />
        <div className='bg-primary-40/5 h-screen flex flex-col items-center'>
          <AppNavbar />
          <hr className='border border-neutral_variant-80 w-full' />
          <div className="flex w-[80vw] h-screen items-center justify-center">
            <div className='flex flex-col w-full h-[80vh] p-3 gap-8'>
              <div className="flex flex-row h-fit w-full">
                <div className="flex flex-grow items-center">
                  <Image src="/houses_icon.png" alt='homes icon' width={45} height={45} />
                  <p className="font-semibold text-3xl">Mis casas</p>
                </div>
                <IconButton
					aria-described-by={addPopoverId}
					onClick={handleAddPopoverClick}
                  className="bg-tertiary-60 hover:bg-tertiary-60/90 active:bg-tertiary-60 focus:bg-tertiary-60
                text-white hover:text-tertiary-95 transition-colors ease-linear duration-200 h-fit"
                >
                  <AddHomeRoundedIcon />
                </IconButton>
				<Menu
					id={addPopoverId}
					open={addPopoverOpen}
					anchorEl={addPopoverAnchorEl}
					onClose={handleAddPopoverClose}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
				>
						<MenuItem onClick={openCreateHouseModal} className="text-primary-20 hover:text-primary-30 focus:text-primary-30">
							Crear casa
						</MenuItem>
						<MenuItem onClick={openJoinHouseModal} className="text-primary-20 hover:text-primary-30 focus:text-primary-30">
							Unirse a casa
						</MenuItem>
				</Menu>
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
                            key={house._id}
                            name={house.name}
                            description={house.description}
                            img={house.house_picture}
                            id={house._id}
                          />
                        ))
                        :
                        houses.map((house, index) => (
                          <ListHouseCard
                            key={house._id}
                            name={house.name}
                            description={house.description}
                            img={house.house_picture}
                            id={house._id}
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
