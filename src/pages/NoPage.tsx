import Header from '../components/Header';
import Link from '@mui/material/Link';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ErrorIcon from '@mui/icons-material/Error';

const NoPage = () => {
    const defaultTheme = createTheme();
    
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                sx={{
                    marginTop: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                    
                    <Header title='404 error' />
                    <ErrorIcon sx={{ fontSize: 80}} color='error'/> 
                    <h1>PAGE NOT FOUND! </h1>
                    <Link href="/Home" variant="body2">
                        Back to Home
                        </Link>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default NoPage;