import IconButton from "@mui/material/IconButton";

const EmptyHouses = () => {
    return (
        <div className="w-full flex-col">
            <div className="flex items-center justify-center">
                <img className="opacity-50 min-w-[300px] max-w-[400px] w-[70%]" src="/houseImg.png" alt="" />
            </div>
            <div className="flex justify-center text-center w-full">
                <p className="font-semibold text-[25px] text-secondary-40">Aquí aparecerán tus casas</p>    
            </div>
            <div className="flex justify-center text-center w-full">
                <p>Crea tu primer casa o únete a una dando clic arriba.</p>
            </div>
        </div>
    );
}

export default EmptyHouses;
