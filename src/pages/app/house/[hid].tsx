
// Next
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from "next/router";

// React
import * as React from 'react';
import { useState } from 'react'

// Styles
import { Inter } from 'next/font/google'

// Material UI
import { Button, ToggleButton, ToggleButtonGroup, IconButton, ListItem } from '@mui/material'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ListRoundedIcon from '@mui/icons-material/ListRounded';
import AddHomeRoundedIcon from '@mui/icons-material/AddHomeRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '@/redux/slices/user.slice'
import { useEffect } from 'react'
import jwt from 'jsonwebtoken'
import { getCookie } from '@/lib/cookie'
import { fetchUserInfo } from '@/redux/thunks/user.thunk'
import MediaCard from '@/components/mediaCard';
import PeopleCard from '@/components/peopleCard';
import { getHouse } from '@/controllers/houses.controllers';
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import AppNavbar from '@/components/appNavbar';

const inter = Inter({ subsets: ['latin'] })

const house = {
    name: "Casa de la playa",
    description:
        "Casa de la playa de la familia de Juan Perez en la que viven Maria Perez y Juan Perez y que tiene una piscina y un jardin",
    address: "Calle 1 # 2 - 3",
    picture:
        "https://www.experimenta.es/wp-content/uploads/2015/04/casa-playa-carmen-yupana-02-4.jpg",
    members: ["1", "2", "3"],
};

const House = ( { house }: InferGetServerSidePropsType<typeof getServerSideProps> ) => {
	const user = useSelector(selectUser)
	const dispatch = useDispatch();
	const [view, setView] = useState('grid')

	useEffect(() => {
        // Fetch the user
        async function f() {
            const cookie = getCookie("auth-token");
            if (cookie) {
                const decoded: any = jwt.decode(cookie);
                if (decoded) {
                    const { _id } = decoded;
                    dispatch(fetchUserInfo(_id, cookie));
                }
            }
        }
        f();
    }, []);

    return (
        <>
            <Head>
                <title>Dashboard - {house.house_code}</title>
                <meta name="description" content="Dashboard" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="bg-[#FAFDFD] h-screen">
                <div className="bg-primary-40/5 h-screen flex flex-col items-center">
                    {/* Upper bar*/}
                    <AppNavbar />
                    <hr className="border border-neutral_variant-80 w-full" />
                    {/*Main*/}
                    <div className="w-full h-full grid grid-cols-6">
                        {/* Sidebar */}
                        <div className="bg-primary-95 col-span-1">
                            <div className="bg-primary-40/10 h-full">
                                {/* House card */}
                                <div className="p-5 items-center">
                                    <MediaCard
                                        name={house.name}
                                        address={house.address}
                                        description={house.description}
                                        picture={house.house_picture}
                                    />
                                </div>
                                {/* House members */}
                                <div className="p-5 pt-0">
                                    <PeopleCard users={house.users} pending_users={house.pending_users} house_id={house._id} />
                                </div>
                            </div>
                        </div>
                        {/* Content */}
                        <div className="col-span-5">
                            <div className='flex flex-col justify-center items-center w-full h-full'>
								<Image src={'/construction-warning-xd.webp'} alt='construction' width={500} height={500} />
							</div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};


export const getServerSideProps: GetServerSideProps<{house: any}> = async (ctx: GetServerSidePropsContext) => {
	const cookie = ctx.req.cookies["auth-token"];
	if (!cookie) {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	}
	ctx.res.setHeader(
		'Cache-Control',
		'public, s-maxage=30, stale-while-revalidate=59'
	)
	const house = await getHouse(ctx.query.hid as string, cookie);

	if (house.message === "User not belongs to this house or the house doesn't exist" || !house) {
		return {
			redirect: {
				destination: "/app/house/not_found",
				permanent: false,
			},
		};
	}

	return {
		props: {
			house,
		},
	};
};

export default House;
