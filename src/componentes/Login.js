import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, Form } from 'react-bootstrap';
import logo from '../img/logo.jpeg';
import Config from "./Config";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${Config}/api/login`, { email, password });
            // Verificar si la respuesta indica una autenticación exitosa
            if (response.data.success) {
                // Guardar el estado de autenticación en localStorage
                localStorage.setItem('isLoggedIn', 'true');
                // Redirigir al usuario a la página principal
                window.location.href = '/';
            } else {
                setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
            }
        } catch (error) {
            setError('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
        }
    }

    return (
        <Container>
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="card p-4" style={{ maxWidth: '400px', width: '100%',  justifyContent: 'center', display: 'flex', alignItems:'center'}}>
                    <img src={logo} alt="ke-rico" style={{ borderRadius: '50%', width: '20%' }} className="d-inline-block align-top" />
                    {error && <div className="alert alert-danger">{error}</div>}
                    <Form onSubmit={handleLogin} style={{  marginTop: '10px' }}>
                        <Form.Group controlId="email">
                            <Form.Label>Correo</Form.Label>
                            <Form.Control placeholder='Correo' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control placeholder='Contraseña' type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </Form.Group>
                        <Button variant="primary" style={{ marginTop: '10px' }} type="submit" block>Ingresar</Button>
                    </Form>
                </div>
            </div>
        </Container>
    );
}

export default Login;
