import { useState } from "react";
import { Container, TextField, Button, Box, Typography, Paper, Grid, Autocomplete } from '@mui/material';

const FormularioComponent = () => {
    const [formValues, setFormValues] = useState({
        marca: null,
        modelo: '',
        anio: '',
        km: '',
        estado: '',
        caracteristicas: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleAutocompleteChange = (event, value) => {
        setFormValues({ ...formValues, marca: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Formulario enviado: ', formValues)
    };

    const options = [
        { marca: 'Ford', id: 1 },
        { marca: 'Chevrolet', id: 2 },
        { marca: 'Nissan', id: 3 },
        { marca: 'Renault', id: 4 },
        { marca: 'Toyota', id: 1 }
    ]

    // const options = [
    //     'Ford',
    //     'Chrevrolet',
    //     'Nissan'
    // ]

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', minWidth: '900px' }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2, width: '100%', minWidth: '4em' }}>
                <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                    onSubmit={handleSubmit}
                >
                    <Typography variant="h4" component="h1" align="center" gutterBottom>
                        Cargar auto
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <Autocomplete
                                disablePortal
                                id="combo-marca"
                                options={options}
                                getOptionLabel={(option) => option.marca} // Muestra el nombre de la marca
                                value={formValues.marca}
                                onChange={handleAutocompleteChange}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Marca"
                                        variant="outlined"
                                        name="marca"
                                    />
                                )}
                                isOptionEqualToValue={(option, value) => option.id === value.id} // Compara opciones por id
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Modelo"
                                variant="outlined"
                                name="modelo"
                                value={formValues.modelo}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Año"
                                variant="outlined"
                                name="anio"
                                value={formValues.anio}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Kilometros"
                                variant="outlined"
                                name="km"
                                value={formValues.km}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Estado"
                                variant="outlined"
                                name="estado"
                                value={formValues.estado}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Caracteristicas"
                                variant="outlined"
                                name="caracteristicas"
                                value={formValues.caracteristicas}
                                onChange={handleChange}
                                fullWidth
                                multiline
                                rows={3}
                            />
                        </Grid>
                    </Grid>
                    <Button variant="contained" color="primary" type="submit">
                        Guardar
                    </Button>

                </Box>
            </Paper>

        </Container>
    );
};

export default FormularioComponent;