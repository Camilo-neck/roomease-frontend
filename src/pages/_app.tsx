import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { StyledEngineProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { wrapper } from "@/redux/store";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AuthProvider } from "@/hooks/AuthProvider";

function App({ Component, pageProps }: AppProps) {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<StyledEngineProvider injectFirst>
				<CssBaseline />
				<AuthProvider>
					<Component {...pageProps} />
				</AuthProvider>
			</StyledEngineProvider>
		</LocalizationProvider>
	);
}

export default wrapper.withRedux(App);
