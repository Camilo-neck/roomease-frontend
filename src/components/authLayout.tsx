import React from 'react';

const AuthLayout = ({children}: {children: React.ReactNode}) => {
	return (
		<div className="bg-primary-80">
			<div className="grid grid-cols-2 lg:grid-cols-3 h-screen">
				<div className="bg-primary-80 flex items-center">
					<div className='flex flex-col items-center lg:items-end w-full'>
						<picture>
							<img className='translate-x-20 lg:translate-x-36 w-[200rem] h-[32rem]' alt='coliving' src='/auth-coliving-people-fig.png' />
						</picture>
					</div>
				</div>
				<div className="col-span-1 lg:col-span-2 bg-neutral-99 rounded-l-[44px]">
					<div className="flex items-center justify-items-center bg-primary-40/5 rounded-l-[44px] h-full">
					{children}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthLayout;