// Next
import Head from "next/head";
import Image from "next/image";

// React
import * as React from "react";
import { useState } from "react";

// Styles
import { Inter } from "next/font/google";

// Material UI
import { Button, Drawer, Box, useMediaQuery } from "@mui/material";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "@/redux/slices/user.slice";
import { useEffect } from "react";
import MediaCard from "@/components/mediaCard";
import PeopleCard from "@/components/peopleCard";
import { getHouse } from "@/controllers/houses.controllers";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import AppNavbar from "@/components/appNavbar";
import { useAuth } from "@/hooks/useAuth";

const sidebarWidth = 290;

const House = ({
  house,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  useAuth();
  const user = useSelector(selectUser);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const dispatch = useDispatch();
  const [view, setView] = useState("grid");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [container, setContainer] = useState<undefined | HTMLElement>(
    undefined
  );

  useEffect(() => {
    setContainer(window ? () => document.body : undefined);
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard - {house.house_code}</title>
        <meta name="description" content="Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-[#FAFDFD] h-screen">
        <div className="bg-primary-40/5 h-screen flex flex-col items-center">
          {/* Upper bar*/}
          <AppNavbar sidebarWidth={isMobile ? 0 : sidebarWidth} />
          <hr className="border border-neutral_variant-80 w-full" />
          {/*Main*/}
          <div className="flex flex-row w-full h-full">
            {/* Sidebar */}
            <nav className={`md:w-[270px] md:flex-shrink-0`}>
              <Drawer
                sx={{
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: sidebarWidth,
                  },
                }}
                variant="permanent"
                className="bg-primary-95 hidden md:block"
              >
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
                    <PeopleCard
                      users={house.users}
                      pending_users={house.pending_users}
                      house_id={house._id}
                    />
                  </div>
                </div>
              </Drawer>
              <Drawer
                sx={{
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: sidebarWidth,
                  },
                }}
                anchor="left"
                open={mobileSidebarOpen}
                onClose={() => setMobileSidebarOpen(false)}
                container={container}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
                className="bg-primary-95 block md:hidden"
              >
                <div className="bg-primary-40/10 h-full">
                  <Button
                    onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                    className="block md:hidden"
                  >
                    Toggle
                  </Button>
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
                    <PeopleCard
                      users={house.users}
                      pending_users={house.pending_users}
                      house_id={house._id}
                    />
                  </div>
                </div>
              </Drawer>
            </nav>
            {/* Content */}
            <Box
              sx={{
                flexGrow: 1,
                p: 3,
                width: { md: `calc(100% - ${sidebarWidth}px)` },
              }}
              component="main"
              className="h-full"
            >
              <Button
                onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                className="block md:hidden"
              >
                Toggle
              </Button>
              <div className="flex flex-col justify-center items-center w-full h-full">
                <Image
                  src={"/construction-warning-xd.webp"}
                  alt="construction"
                  width={500}
                  height={500}
                />
              </div>
            </Box>
          </div>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{ house: any }> = async (
  ctx: GetServerSidePropsContext
) => {
  const cookie = ctx.req.cookies["auth-token"];
  if (!cookie) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  ctx.res.setHeader(
    "Cache-Control",
    "public, s-maxage=30, stale-while-revalidate=59"
  );
  const house = await getHouse(ctx.query.hid as string, cookie);

  if (
    house.message ===
      "User not belongs to this house or the house doesn't exist" ||
    !house
  ) {
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
