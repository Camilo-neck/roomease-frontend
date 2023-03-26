import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { StyledEngineProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { wrapper } from '@/redux/store'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App({ Component, pageProps }: AppProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <Component {...pageProps} />
      </StyledEngineProvider>
    </LocalizationProvider>
  )
}

export default wrapper.withRedux(App)
