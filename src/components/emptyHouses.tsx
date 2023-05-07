const EmptyHouses = () => {
    return (
        <div className="w-full flex-col">
            <div className="flex items-center justify-center">
                <img className="opacity-50 h-[50%]" src="/houseImg.png" alt="" />
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