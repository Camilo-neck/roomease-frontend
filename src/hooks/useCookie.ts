import { useContext, useState, useEffect } from "react";
import { CookieContext } from "@/hooks/CookiesContext";

export const useCookies = () => {
  const { cookies, setCookies } = useContext(CookieContext);
  const [value, setValue] = useState(cookies);

  useEffect(() => {
    setCookies(document.cookie);
  }, []);

  const getCookie = (name: string) => {
    setCookies(document.cookie);
    const currCookies = document.cookie;
    const value = `; ${currCookies}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return "";
  };

  const setCookie = (
    name: string,
    value: string,
    date: Date = new Date(),
    exdays: number | null = null,
    time: number | null = null,
    path: string = "/"
  ) => {
    const d = date;
    if (exdays) d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    else if (time) d.setTime(d.getTime() + time);
    let expires = "expires=" + d.toUTCString();
    const newCookie = `${name}=${value}; ${expires}; path=${path}`;
    updateCookies(newCookie);
  };

  const deleteCookie = (name: string) => {
    const newCookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    updateCookies(newCookie);
  };

  const updateCookies = (cookie: string) => {
    const newCookies = `${cookies}; ${cookie}`;
    setCookies(newCookies);
    setValue(newCookies);
  };

  return { cookies: value, updateCookies, getCookie, setCookie, deleteCookie };
};
