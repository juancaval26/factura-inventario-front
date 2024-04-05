import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/login', { email, password });
            // Manejar la respuesta del servidor (por ejemplo, redireccionar al usuario a una página después de iniciar sesión correctamente)
        } catch (error) {
            setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
            // Manejar errores (por ejemplo, mostrar un mensaje de error al usuario)
        }
    }

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
            </form>
        </div>
    );
}

export default Login;
