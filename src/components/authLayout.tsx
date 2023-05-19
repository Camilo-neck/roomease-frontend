import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		// <div className="bg-primary-80">
		// 	<div className="grid grid-cols-2 lg:grid-cols-3 h-screen">
		// 		<div className="bg-primary-80 flex items-center">
		// 			<div className='flex flex-col items-center lg:items-end w-full'>
		// 				<picture>
		// 					<img className='translate-x-20 lg:translate-x-36 w-[200rem] h-[32rem]' alt='coliving' src='/auth-coliving-people-fig.png' />
		// 				</picture>
		// 			</div>
		// 		</div>
		// 		<div className="col-span-1 lg:col-span-2 bg-neutral-99 rounded-l-[44px]">
		// 			<div className="flex items-center justify-items-center bg-primary-40/5 rounded-l-[44px] h-full">
		// 			{children}
		// 			</div>
		// 		</div>
		// 	</div>
		// </div>
		<div className="bg-[#FAFDFD]">
			<section className="bg-primary-40/10 min-h-screen flex items-center justify-center p-5">
				{/*Login container */}
				<div className="bg-[#FAFDFD] rounded-2xl">
					<div className="bg-primary-90/5 md:h-auto h-full flex items-center rounded-2xl shadow-xl shadow-black/40 max-w-4xl p-5 ">
						{/*Login form */}
						<div className="md:w-1/2 px-8 transition-all ease-in-out duration-300">{children}</div>
						{/*Login image */}
						<div className="sm:block hidden w-1/2 p-5">
							<img className="rounded-2xl shadow-md" src="/login.jpg" alt="coliving" />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default AuthLayout;
