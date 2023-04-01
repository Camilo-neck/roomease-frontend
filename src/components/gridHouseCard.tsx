import Image from "next/image";
import { Avatar, AvatarGroup, Button, Rating } from "@mui/material";
import Link from "next/link";

const GridHouseCard = ({
    name,
    description,
    img,
    id,
}: {
    name: string;
    description: string;
    img: string;
    id: string;
}) => {
    return (
        <div className="flex flex-col bg-white shadow-lg rounded-lg">
            <Image
                src={img ? img : "/house_placeholder.jpg"}
                alt="house placeholder"
                width={300}
                height={250}
                className="rounded-t-lg max-h-36"
                priority
            />
            <div className="flex flex-col gap-2 p-5">
                <div className="flex flex-row w-full items-center">
                    <p className="font-semibold text-lg flex-grow">{name}</p>
                    <AvatarGroup
                        max={3}
                        sx={{
                            "& .MuiAvatar-root": {
                                width: 24,
                                height: 24,
                                fontSize: "14px",
                            },
                        }}
                        className="flex-grow flex justify-end w-6 h-6 text-sm"
                    >
                        <Avatar
                            alt="Remy Sharp"
                            className="w-6 h-6"
                            src="/avatar_placeholder.webp"
                        />
                        <Avatar
                            alt="Travis Howard"
                            className="w-6 h-6"
                            src="/avatar_placeholder.webp"
                        />
                        <Avatar
                            alt="Cindy Baker"
                            className="w-6 h-6"
                            src="/avatar_placeholder.webp"
                        />
                        <Avatar
                            alt="Cindy Baker"
                            className="w-6 h-6"
                            src="/avatar_placeholder.webp"
                        />
                    </AvatarGroup>
                </div>
                <div className="flex flex-row w-full items-center">
                    <Rating
                        className="flex-grow"
                        name="read-only"
                        value={4}
                        size="small"
                        readOnly
                    />
                    <Link href={`/app/house/${id}`}>
                        <Button
                            size="small"
                            variant="outlined"
                            className="bg-tertiary-80/30 hover:bg-tertiary-80/50 active:bg-tertiary-80/70 border-tertiary-20 
                            hover:border-tertiary-20 text-tertiary-20 rounded-full"
                        >
                            Abrir
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default GridHouseCard;
