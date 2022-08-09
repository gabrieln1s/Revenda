import React, { useState, useEffect } from "react";
import Router from "next/router";

//components
import Image from "next/image";
import LogoSimples from "../public/images/logo_simples-controle.jpg";
import GroupInputs from "../components/GroupInputs";
import Input from "../components/Input";
import Alert from "../components/Alert";

const randomSlug = (min = 10000, max = 9999999999) => {
  const key = Math.floor(Math.random() * (max - min + 1)) + min;
  return key.toString();
};

const CreateRevenda = () => {
  const [alertMessage, setAlertMessage] = useState(null);
  const [confirmSenha, setConfirmSenha] = useState(null);

  const [logDominio, setLogDominio] = useState("");
  const [logLogin, setLogLogin] = useState("");
  const [logSenha, setLogSenha] = useState("");
  const [logRepiteSenha, setLogRepiteSenha] = useState("");

  const [data, setData] = useState({
    dominio: "",
    login: "",
    senha: "",
    slug: randomSlug(),
    code_zone: "ssd789dsf789789sfd978sdf798sdf",
    callback: "https://revenda.vercel.app/api/create-result",
  });

  const validateInputs = () => {
    let errorCount = 0;

    setLogLogin("");
    setLogDominio("");
    setLogSenha("");
    setLogRepiteSenha("");

    if (data.dominio.length <= 0) {
      setLogDominio("O domínio não pode ficar vazio.");
      errorCount++;
    }
    if (data.login.length < 4) {
      setLogLogin("O usuário deve ter pelo menos quatro (4) caracteres.");
      errorCount++;
    }
    if (data.senha.length < 6) {
      setLogSenha("A senha deve ter pelo menos seis (6) caracteres.");
      errorCount++;
    }
    if (data.senha != confirmSenha) {
      setLogRepiteSenha("Repita exatamente a senha que você colocou ao lado.");
      errorCount++;
    }

    return errorCount <= 0 ? true : false;
  };

  const create = async () => {
    setAlertMessage(null);

    if (!validateInputs()) return;

    const url = "https://api.simplescontrole.com.br/api/v1/resale/create";
    const headers = new Headers();
    headers.append("Authorization", "1ebd74f1-8c51-44e7-a0b6-8eb87f8b56a6");
    headers.append("Content-Type", "application/json");
    headers.append(
      "Cookie",
      "XSRF-TOKEN=eyJpdiI6IkFpRDg0VzlpaFA3VnN5U0FCS0JqZVE9PSIsInZhbHVlIjoiTk5ieW9yYm5iVW80ZUpkVjdrcWpjdlVSeXhJbnhFQ0p6QjFKMmxpUG8zc2JueTFiZUl4bUZ5c3VCd0g4c2xPK2xmTS8vcW4xZ2VzV2ZHOTFteUFEMHRYZE1kUXhaQUtWM3dSMUEzMkI5b3R1UGRvTkw4ZHY2S3JGTmg3QThRWTAiLCJtYWMiOiI1MmNmNTMyY2M2YzYwMDlkYTViMTlkMTMyNGVjNmUzOGYwMWUyMzUyNjFkN2YwZWI2NWE5NDMxYTlhOGIwYjAxIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IncvUEdCcnNLSzdsME5rdnd2RkN1VFE9PSIsInZhbHVlIjoiRExZc283aTZ2QzIxLzV0MUp2K0ZGZmdrQnI3ZHN4dVRsM05qSjJucnlMS3JSWmpweEpzNFZuU21rcGVEclJnT01vQy9paU5SblVva1FlUjR3ZE5UZGN3VFFjN2dUMXJCUXVjaHpzSld3OUpXRXNabTF5L01wdHRBYUg1aVhtSzMiLCJtYWMiOiIyYjg4Y2UzZGU1ZjdlMGE1NmUxOWIxOTUzNjVmZWFjYjU3ZWQ3ZGQ1YzE4ZDk1MDRhY2Q2Zjk1YjMzM2ViMzdhIiwidGFnIjoiIn0%3D"
    );

    try {
      let response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
        redirect: "follow",
      });
      response = await response.json();

      if (response.message) {
        setAlertMessage({
          color: "#2db84f",
          text: response.message,
        });
      }

      Router.push(`/create-result?slug=${data.slug}`);
    } catch (error) {
      setAlertMessage({
        color: "#ff7260",
        text: "Erro ao criar a revenda",
      });
    }
  };

  // useEffect(() => {
  //   const callbackEndpoint = `${window.location.hostname}/api/create-result`;
  //   setData({ ...data, callback: callbackEndpoint });
  // }, []);

  return (
    <main className="w-3/5 md:w-full p-6 sm:p-4 m-auto relative">
      {alertMessage && (
        <Alert color={alertMessage.color} text={alertMessage.text} />
      )}

      <header>
        <div className="w-32 m-auto">
          <Image src={LogoSimples} alt="Logomarca da simples controle" />
        </div>

        <div className="flex flex-wrap justify-between">
          <h1 className="text-2xl font-roboto font-bold">Nova revenda</h1>
          <button
            type="button"
            className="px-9 py-2 font-roboto font-bold bg-simples1 text-white rounded-lg"
            onClick={create}
          >
            Salvar
          </button>
        </div>
      </header>

      <div className="" title="formulário de criação">
        <GroupInputs>
          <Input
            type="text"
            label="Domínio"
            getValue={(value) => setData({ ...data, dominio: value })}
            error={logDominio}
          />

          <Input
            type="text"
            label="Usuário"
            getValue={(value) => setData({ ...data, login: value })}
            error={logLogin}
          />

          <Input
            type="password"
            label="Senha"
            getValue={(value) => setData({ ...data, senha: value })}
            error={logSenha}
          />

          <Input
            type="password"
            label="Repita a senha"
            getValue={(value) => setConfirmSenha(value)}
            error={logRepiteSenha}
          />
        </GroupInputs>
      </div>
    </main>
  );
};

export default CreateRevenda;
