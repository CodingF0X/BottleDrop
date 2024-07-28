import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addBeverageToWarehouse } from '../../State/State_Warehouse/warehouseThunk';

const BeverageForm = () => {
    const [beverageType, setBeverageType] = useState('');
    const dispatch = useDispatch()
    const status = useSelector((state) => state.warehouse.status);

    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [count, setCount] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // Construct the data object
        const data = {
            beverageType,
            description: {
                brand,
                price: parseFloat(price),
            },
            count: parseInt(count, 10),
        };

        dispatch(addBeverageToWarehouse(data))
        console.log(data);
    };

    return (
        <Container maxWidth="sm" sx={{ marginTop: 4 }}>
             <Typography
        variant="h6"
        gutterBottom
        sx={{
          color: '#333',           
          fontWeight: 'bold',      
          fontFamily: 'Roboto, sans-serif',
        }}
      >
        Add Beverage to Warehouse
      </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off" sx={{ mt: 2 }}>

                {/* Beverage Type */}
                <TextField
                    fullWidth
                    margin="normal"
                    label="Beverage Type"
                    value={beverageType}
                    onChange={(e) => setBeverageType(e.target.value)}
                    required
                />

                {/* Brand */}
                <TextField
                    fullWidth
                    margin="normal"
                    label="Brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    required
                />

                {/* Price */}
                <TextField
                    fullWidth
                    margin="normal"
                    label="Price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    InputProps={{
                        startAdornment: <span>$</span>,
                    }}
                />

                {/* Count */}
                <TextField
                    fullWidth
                    margin="normal"
                    label="Count"
                    type="number"
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                    required
                />

                    
                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                >
                    {status === 'loading' ? 'Adding...' : 'Add Beverage'}
                </Button>
            </Box>
        </Container>
    );
};

export default BeverageForm;
