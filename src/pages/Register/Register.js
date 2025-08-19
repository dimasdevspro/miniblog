import styles from "./Register.module.css";
import '../../index.css'; // Importando o CSS global
import { useState, useEffect } from "react";

import { useAuthentication } from "../../hooks/useAuthetication"; // Importando o hook de autenticação

const Register = () => {

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [error, setError] = useState("");  

  const { createUser, error: authError, loading} = useAuthentication();

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpa o erro antes de tentar cadastrar

    const user = {
      displayName,
      email,
      password,
    }

    // Validação simples
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    const res = await createUser(user);

    // Aqui você pode adicionar a lógica para enviar os dados para o servidor
    console.log("Usuário cadastrado:", { displayName, email, password });
  }

  return (
    <div className={styles.register}>
      <h1>Cadastre-se para postar</h1>
      <p>Crie seu usuário e compartilhe suas histórias</p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="displayName">
          <span>Nome:</span>
          <input
            type="text"
            name="displayName"
            required
            placeholder="Nome do usuário"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
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
        <label htmlFor="confirmPassword">
          <span>Senha:</span>
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        {!loading && <button className="btn">Cadastrar</button>}
        {loading && <button className="btn" disabled>Aguarde...</button>}
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default Register;
