import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import CampoTexto from "@/components/input";
import { api } from "@/utils/api";
import { View, Text, Pressable } from "react-native";
import axios from 'axios';

export default function Login() {
  // Estado para o email e erro de validação
  const [email, setEmail] = useState('example@example.com');
  const [ErrorEmail, setErrorEmail] = useState(false);

  // Estado para a senha e erro de validação
  const [senha, setSenha] = useState('@Example123');
  const [ErrorSenha, setErrorSenha] = useState(false);

  // Estado para mostrar ou esconder a senha
  const [mostrarSenha, setMostrarSenha] = useState(false);

  // Estado para a confirmação de senha e erro de validação
  const [senhaconfirma, setSenhaconfirma] = useState('!Pass123');
  const [ErrorSenhaConfirma, setErrorSenhaConfirma] = useState(false);

  useEffect(() => {
    if (senhaconfirma !== senha) {
      setErrorSenhaConfirma(true); // Se as senhas não coincidirem, exibe erro
    } else {
      setErrorSenhaConfirma(false); // Corrigido o nome da função de atualização do estado
    }
  }, [senha, senhaconfirma]); // A dependência é senha e senha de confirmação

  // Validação do email usando expressão regular
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setErrorEmail(!emailRegex.test(email)); // Se o email não for válido, ativa o erro
  }, [email]); // A dependência é o email

  // Validação da senha usando expressão regular
  useEffect(() => {
    const passwordRegex = /^(?=.[A-Z])(?=.\d)(?=.[!@#$%^&]).{8,}$/;
    setErrorSenha(!passwordRegex.test(senha)); // Se a senha não corresponder ao padrão, ativa o erro
  }, [senha]); // A dependência é a senha

  async function Logar() {
    try {
      const resposta = await api.post('/Cadastro', {
        Email: email,
        Senha: senha,
      });
  
      if (resposta.status === 201) {
        alert("Usuário cadastrado com sucesso!");
      }
    } catch (error) {
      // Verifica se o erro tem a propriedade 'response' (como acontece com erros do axios)
      if (axios.isAxiosError(error)) {
        // Se o erro é uma resposta do axios
        if (error.response) {
          const status = error.response.status;
          if (status === 409) {
            alert("Este email já está cadastrado.");
          } else if (status === 500) {
            alert("Erro inesperado no servidor. Tente novamente mais tarde.");
          } else {
            alert("Erro desconhecido: " + error.response.status);
          }
        } else {
          alert("Erro de conexão. Verifique sua internet.");
        }
      } else {
        // Se o erro não for um erro de rede do axios, podemos tratar erros mais gerais
        alert("Erro inesperado: ");
      }
    }
  }
  

  return (
    <Container>
      <Header>
        <Title>Vamos criar uma conta!!</Title>
      </Header>

      <Campos>
        
        <EmailContainer>
          <TextoCampo>Email</TextoCampo>
          <CampoTexto
            placeholder="Digite seu email..."
            onChangeText={setEmail}
          />
          {ErrorEmail && <TextErrorHint>Email Inválido!!</TextErrorHint>}
        </EmailContainer>

        <SenhaContainer>
          <TextoCampo>Senha</TextoCampo>
          <CampoTexto
            placeholder="Digite sua senha..."
            onChangeText={setSenha}
            secureTextEntry={!mostrarSenha}
          />
          <Pressable onPress={() => setMostrarSenha(!mostrarSenha)} style={{ position: 'absolute', right: 10, top: 34 }}>
            <Ionicons
              name={mostrarSenha ? "eye-off" : "eye"} // Ícone de olho
              size={24}
              color="#000000"
            />
          </Pressable>
          {ErrorSenha && <TextErrorHint>Senha Inválida!!</TextErrorHint>}
        </SenhaContainer>

        {/* Confirmação de Senha */}
        <SenhaConfirma>
          <TextoCampo>Confirma Senha</TextoCampo>
          <CampoTexto
            placeholder="Digite sua senha novamente..."
            onChangeText={setSenhaconfirma}
            secureTextEntry={!mostrarSenha}
          />
          <Pressable onPress={() => setMostrarSenha(!mostrarSenha)} style={{ position: 'absolute', right: 10, top: 34 }}>
            <Ionicons
              name={mostrarSenha ? "eye-off" : "eye"} // Ícone de olho
              size={24}
              color="#000000"
            />
          </Pressable>
          {ErrorSenhaConfirma && <TextErrorHint>As senhas não batem!!</TextErrorHint>}
        </SenhaConfirma>
      </Campos>

      <Acoes>
        <Button onPress={Logar}>
          <ButtonText>Cadastrar</ButtonText>
        </Button>
      </Acoes>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #e0c1b3; /* Fundo claro */
  padding: 20px;
  justify-content: center;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 80px;
  margin-bottom: 110px;
  margin-left: 6px;
  gap: 20px;
`;

const Title = styled.Text`
  padding: 20px;
  font-size: 50px;
  color: #000000; /* Azul escuro */
  font-weight: bold;
  text-align: center;
`;

const TextoCampo = styled.Text`
  margin-left: 5px;
  font-size: 20px;
  color: #001d3d; /* Azul escuro */
  font-weight: bold;
`;

const Campos = styled.View`
  gap: 15px;
  margin-bottom: 20px;
`;

const SenhaConfirma = styled.View`
  position: relative;
  width: 100%;
`;

const SenhaContainer = styled.View`
  position: relative;
  width: 100%;
`;

const TextErrorHint = styled.Text`
  font-size: 14px;
  color: #bf0603; /* Vermelho */
  text-align: left;
`;

const EmailContainer = styled.View`
  position: relative;
  width: 100%;
  margin-bottom: 15px;
`;

const Acoes = styled.View`
  margin-top: 20px;
  align-items: center;
`;

const Button = styled.Pressable`
  width: 100%; /* Ajustado para ocupar toda a largura */
  max-width: 300px; /* Limite máximo de largura */
  height: 50px;
  align-items: center;
  justify-content: center;
  background-color: #846267; /* Botão vermelho */
  border-radius: 8px;
  padding: 10px;
`;

const ButtonText = styled.Text`
  color: #fff; /* Texto branco */
  font-size: 18px;
  font-weight: bold;
`;
