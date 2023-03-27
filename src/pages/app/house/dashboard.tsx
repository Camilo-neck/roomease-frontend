// Next
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

// React
import * as React from 'react';
import { useState } from 'react'

// Styles
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

// Material UI
import { Button, ToggleButton, ToggleButtonGroup, IconButton, ListItem } from '@mui/material'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ListRoundedIcon from '@mui/icons-material/ListRounded';
import AddHomeRoundedIcon from '@mui/icons-material/AddHomeRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Avatar from '@mui/material/Avatar';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '@/redux/slices/user.slice'
import { logoutUser } from '@/controllers/auth.controllers'
import { useEffect } from 'react'
import { getCookie } from '@/lib/cookie'
import jwt from 'jsonwebtoken'
import { fetchUserInfo } from '@/redux/thunks/user.thunk'
import { useRouter } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

const house = {
    name: 'Casa de la playa',
    description: 'Casa de la playa de la familia de Juan Perez en la que viven Maria Perez y Juan Perez y que tiene una piscina y un jardin',
    address: 'Calle 1 # 2 - 3',
    picture: 'https://www.experimenta.es/wp-content/uploads/2015/04/casa-playa-carmen-yupana-02-4.jpg',
    members: ['1','2','3']
}

const getUsers = () => {
    const users = 
    {
        'members':[
        {
            id:1,
            name: 'Juan',
            lastName: 'Perez',
            owner: true
        },
        {
            id:2,
            name: 'Maria',
            lastName: 'Perez',
            owner: false
        }
        ],
        'pending':[
            {
                id:3,
                name: 'Pedro',
                lastName: 'Perez',
                owner: false
            },
            {
                id:4,
                name: 'Ana',
                lastName: 'Rodriguez',
                owner: false
            }
        ]
    }
    return users;
}

const MediaCard= ({ name, description, address, picture}: { name: string; description: string, address: string, picture: string }) => {
    return (
        <Card className='shadow-lg rounded-lg' sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 150 }}
            image={picture}
          />
          <CardContent > 
            <Typography className='text-center leading-5 font-semibold text-lg' gutterBottom component="div">
                {name}
            </Typography>
            <Typography className='text-sm text-center line-clamp-1' gutterBottom component="div"  color="text.secondary">
              {address}
            </Typography>
            <Typography className='line-clamp-3 leading-5 text-sm'>
              {description}
            </Typography>
          </CardContent>
          <CardActions className='items-center p-1'>
            <Button className='w-full self-auto' size="small">Editar</Button>
          </CardActions>
        </Card>
    );
}

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 24,
        height: 24,
        fontSize:10
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
  };
}

const DualButton = () => {
  return (
    <ButtonGroup className='flex gap-0' size='small'>
        <Button>
            <Typography className='text-[0.6rem]'>
                Aceptar
            </Typography>
        </Button>
      <Button>
            <Typography className='text-[0.6rem]'>
                Rechazar
            </Typography>
      </Button>
    </ButtonGroup>
  );
}

const NestedList = () => {
    const [open1, setOpen1] = React.useState(true);
    const [open2, setOpen2] = React.useState(true);
    const users = getUsers();
  
    const handleClick1 = () => {
      setOpen1(!open1);
    };
    const handleClick2 = () => {
        setOpen2(!open2);
      };
  
    return (
        <List
            aria-labelledby="nested-list-subheader"
            subheader={
            <ListSubheader className='text-center font-bold text-base p-2' component="div" id="nested-list-subheader">
                Integrantes
            </ListSubheader>
            }
        >
            <ListItemButton className='p-1' onClick={handleClick1}>
                <ListItemIcon>
                    <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Miembros" />
                {open1 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open1} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {
                    users.members.map((user, id) => (
                        <ListItem className='p-1 pl-5' key={id}>
                            <ListItemIcon>
                                <Avatar {...stringAvatar(user.name + ' ' + user.lastName)} />
                            </ListItemIcon>
                            <ListItemText >
                                <Typography className='text-xs'>
                                    {user.name + ' ' + user.lastName}
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    ))
                    }
                </List>
            </Collapse>
            <ListItemButton className='p-1' onClick={handleClick2}>
                <ListItemIcon>
                    <PersonAddIcon />
                </ListItemIcon>
                <ListItemText primary="Pendientes" />
                {open2 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open2} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {
                    users.pending.map((user, id) => (
                        <>
                            <div className='flex flex-col'>
                                <ListItem className='p-1 pl-5' key={id}
                                    secondaryAction={
                                        <>
                                        <IconButton size='small' aria-label="delete">
                                            <CheckIcon htmlColor='green' fontSize='small'/>
                                        </IconButton>
                                        <IconButton size='small' edge="end" aria-label="delete">
                                            <ClearSharpIcon htmlColor='red' fontSize='small'/>
                                        </IconButton>
                                        </>
                                    }
                                >
                                    <ListItemIcon >
                                        <Avatar {...stringAvatar(user.name + ' ' + user.lastName)} />
                                    </ListItemIcon>
                                    <ListItemText >
                                        <Typography className='text-xs'>
                                            {user.name + ' ' + user.lastName}
                                        </Typography>
                                    </ListItemText>
                                </ListItem>
                            </div>
                        </>
                    ))
                    }
                </List>
            </Collapse>
        </List>
    );
}

const PeopleCard = () => {
    return (
      <Card className='shadow-lg rounded-lg'>
        <CardContent>
            <NestedList />
        </CardContent>
        <CardActions className='items-center p-1'>
          <Button className='w-full self-auto' size="small">Ver más</Button>
        </CardActions>
      </Card>
    );
}

const Dashboard = () => {
const user = useSelector(selectUser)
const dispatch = useDispatch();
const [view, setView] = useState('grid')

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
        <title>Dashboard</title>
        <meta name="description" content="Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-[#FAFDFD] h-screen">            
        <div className='bg-primary-40/5 h-screen flex flex-col items-center'>
            {/* Upper bar*/}
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
            {/*Main*/}
            <div className='w-full h-full grid grid-cols-6'>
                {/* Sidebar */}
                <div className='bg-primary-95 col-span-1'>
                    <div className='bg-primary-40/10 h-full'>
                        {/* House card */}
                        <div className='p-5 items-center'>
                            <MediaCard name={house.name} address ={house.address} description = {house.description} picture = {house.picture} />
                        </div>
                        {/* House members */}
                        <div className='p-5 pt-0'>
                            <PeopleCard />
                        </div>
                    </div>
                </div>
                {/* Content */}
                <div className="col-span-5">
                    <div className='flex flex-col w-full p-20 gap-8'>
                    <div className="flex flex-row h-fit w-full">
                        <div className="flex flex-grow items-center">
                        <Image src="/houses_icon.png" alt='homes icon' width={45} height={45} />
                        <p className="font-semibold text-3xl">Dashboard</p>
                        </div>
                        <IconButton
                        className='bg-primary-40 hover:bg-primary-40/90 active:bg-primary-40 focus:bg-primary-40
                        text-white hover:text-primary-95 transition-colors ease-linear duration-200 h-fit'
                        >
                        <AddHomeRoundedIcon />
                        </IconButton>
                    </div>
                    <div className="flex flex-col gap-3">
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

                        <div className={`flex ${ view === "grid" ? "flex-row flex-wrap" : "flex-col" } gap-10`}>
                        {
                            <>
                                <div className="flex flex-col w-full h-full bg-primary-40/5 rounded-lg p-3">
                                <p className="font-semibold text-xl">Casa de la playa</p>
                                <p className="text-sm">Casa de la playa de la familia</p>
                                </div>
                                <div className="flex flex-col w-full h-full bg-primary-40/5 rounded-lg p-3">
                                <p className="font-semibold text-xl">Casa de la playa</p>
                                <p className="text-sm">Casa de la playa de la familia</p>
                                </div>
                            </>
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

export default Dashboard;