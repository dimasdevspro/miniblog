import styles from './Login.module.css';

import { useState, useEffect, useNavigate } from "react";

import { useAuthentication } from "../../hooks/useAuthetication"; // Importando o hook de autenticação


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");  
  
    const { login, error: authError, loading} = useAuthentication();
  
    useEffect(() => {
      if (authError) {
        setError(authError);
      }
    }, [authError]);
  
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(""); // Limpa o erro antes de tentar cadastrar
  
      const user = {
        email,
        password,
      }
  
    const res = await login(user);
    
    navigate("/dashboard"); // Redireciona para o dashboard após o login
    if (res) {
      setEmail("");
      setPassword("");
    }
  }

  return (
    <div className={styles.login}>
      <h1>Entrar</h1>
      <p>Faça o login para utilizar o sistema.</p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="email">
          <span>Email:</span>
          <input
            type="email"
            name="email"
            required
            placeholder="Email do usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Insira sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {!loading && <button className="btn">Entrar</button>}
        {loading && <button className="btn" disabled>Aguarde...</button>}
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  )
}

export default Login()