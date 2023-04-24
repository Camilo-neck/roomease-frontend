"use client";

import { Button, Link } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function HomePage() {
	return (
		<>
			<div className="w-full h-screen min-h-[520px] flex items-center justify-center">
				<div className="text-center pb-12 md:pb-16 w-[65%]">
					<h1 className="text-5xl md:text-6xl font-extrabold leading-tighter mb-10">
						Facilita tu convivencia con{" "}
						<span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-50 to-secondary-70">
							RoomEase
						</span>
					</h1>
					<div className="max-w-3xl mx-auto">
						<p className="text-xl text-gray-600 mb-8">
							La aplicación ideal para dividir tareas y mantener orden con tus Rommies.
						</p>
						<div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
							<Link href="/app/houses">
								<Button
									variant="outlined"
									className="bg-tertiary-50 text-primary-100 hover:bg-tertiary-40 rounded-xl text-2xl normal-case"
								>
									<p>Crea tu casa ahora</p>
								</Button>
							</Link>
						</div>
					</div>
					<div className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2">
						<ExpandMoreIcon className="text-5xl text-primary-50 animate-bounce mt-10" />
					</div>
				</div>
			</div>
		</>
	);
}
