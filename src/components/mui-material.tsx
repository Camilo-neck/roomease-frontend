'use client';

// Material UI components
import {
	Button as MuiButton,
	Autocomplete as MuiAutocomplete,
	CssBaseline as MuiCssBaseline,
	TextField as MuiTextField,
} from '@mui/material';
// Material UI styles
import { 
	StyledEngineProvider as MuiStyledEngineProvider, 
	ThemeProvider as MuiThemeProvider, 
	createTheme as MuiCreateTheme,
} from '@mui/material/styles';

// Export Material UI components
export const Button = MuiButton;
export const Autocomplete = MuiAutocomplete;
export const TextField = MuiTextField

// Export Material UI styles
export const StyledEngineProvider = MuiStyledEngineProvider;
export const ThemeProvider = MuiThemeProvider;
export const createTheme = MuiCreateTheme;
export const CssBaseline = MuiCssBaseline;