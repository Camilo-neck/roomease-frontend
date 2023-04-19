import { createContext } from 'react';

interface CookieContextI {
	cookies: string;
	setCookies: (cookies: string) => void;
}

export const CookieContext = createContext<CookieContextI>({
	cookies: '',
	setCookies: () => {},
});
