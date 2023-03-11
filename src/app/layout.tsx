import './globals.css'
import { StyledEngineProvider, CssBaseline } from '@/components/mui-material';


export const metadata = {
  title: 'Roomease',
  description: 'App to organize your task with your Roomies',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <html lang="en">
        <body>{children}</body>
      </html>
    </StyledEngineProvider>
  )
}
