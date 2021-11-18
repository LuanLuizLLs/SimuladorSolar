import "./Form.css";
import React, { useCallback, useState } from "react";
import { Card, CardContent, CardActions } from "@mui/material";
import { FormControl, TextField, Button, Typography } from "@mui/material";
import { Input, InputAdornment, InputLabel } from "@mui/material";
import { Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Mask from "../../functions/Mask";

/**
 * OBJETO DOS TIPOS DE ESTRUTURA
 */
const tipo_estrutura = {
    estrutura: [
        { value: 'fibrocimento-madeira' , label: 'Fibrocimento (Madeira)'},
        { value: 'fibrocimento-metalico' , label: 'Fibrocimento (Metálico)'},
        { value: 'ceramico' , label: 'Ceramico'},
        { value: 'metalico' , label: 'Metálico'},
        { value: 'laje' , label: 'Laje'},
        { value: 'solo' , label: 'Solo'}
    ]
}

export default function Form() {
    const [dados, setDados] = useState({
        estrutura: '',
        valor_conta: '',
        cep: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        dados[name] = value;
        setDados({
            ...dados,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        data.valor_conta = data.valor_conta.replaceAll('.', '');
        data.valor_conta = data.valor_conta.replace(',', '.');
        navigate(`/simulacao?estrutura=${data.estrutura}&valor_conta=${data.valor_conta}&cep=${data.cep}`);
    }

    const handleKeyUp = useCallback((e) => {
        if (e.target.name === 'cep') {
            Mask.Cep(e);
        }
        if (e.target.name === 'valor_conta') {
            Mask.Real(e);
        }
    }, []);

    return (
        <Card sx={{
            p: 2,
            height: 'auto',
            maxWidth: 450,
            backgroundColor: '#FFFFFF99',
            borderRadius: 5
        }}>
            <CardContent>
                <form id="form_simulacao" onSubmit={ handleSubmit }>
                    <Typography sx={{ fontSize: 20, marginBottom: 2 }}>
                        Simule agora mesmo, insira as seguintes informações abaixo:
                    </Typography>
                    <FormControl fullWidth variant="standard">
                        <InputLabel id="estrutura-label">Tipos de Estrutura:</InputLabel>
                        <Select
                            labelId="estrutura-label"
                            id="estrutura"
                            name="estrutura"
                            value={ dados.estrutura }
                            onChange={ handleChange }
                            onKeyUp={ handleKeyUp }
                            label="Tipos de Estrutura:"
                            required
                        >
                        <MenuItem value="">Selecionar</MenuItem>
                        {
                            tipo_estrutura.estrutura.map((dados, index) => (
                                <MenuItem key={index} value={dados.value}>{dados.label}</MenuItem>
                            ))
                        }
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ my: 2 }} variant="standard">
                        <TextField
                            id="cep"
                            name="cep"
                            label="CEP"
                            placeholder="00000-000"
                            onChange={ handleChange }
                            onKeyUp={ handleKeyUp }
                            variant="standard"
                            required
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ my: 2 }} variant="standard">
                        <InputLabel htmlFor="valor_conta">Valor da Conta de Luz:</InputLabel>
                        <Input
                            id="valor_conta"
                            name="valor_conta"
                            placeholder="0,00"
                            onChange={ handleChange }
                            onKeyUp={ handleKeyUp }
                            startAdornment={
                                <InputAdornment position="start">R$</InputAdornment>
                            }
                            required
                        />
                    </FormControl>
                </form>
            </CardContent>
            <CardActions>
                <Button form="form_simulacao" type="submit" variant="contained" color="primary" fullWidth>
                    Simular
                </Button>
            </CardActions>
        </Card>
    )
}