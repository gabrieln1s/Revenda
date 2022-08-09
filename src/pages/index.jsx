import { useState, useEffect } from "react";
import Router from "next/router";
import Link from "next/link";

//components
import GroupInputs from "../components/GroupInputs";
import Input from "../components/Input";
import Image from "next/image";
import LogoSimples from "../public/images/logo_simples-controle.jpg";

const CreateRevenda = () => {
  const [inputValue, setInputValue] = useState({
    dominio: "",
    code_zone: "ssd789dsf789789sfd978sdf798sdf",
    login: "",
    senha: "",
    slug: "",
    callback: "/api/create-result",
  });
  const [confirmSenha, setConfirmSenha] = useState(null);

  const validateInputs = () => {
    for (const key in inputValue) {
      if (!inputValue[key]) {
        alert("Todos os campos precisam ser preencidos.");
        return false;
      }
    }
    if (inputValue.login < 4) {
      alert("O usuário deve ter pelo menos quatro (4) caracteres.");
      return false;
    }
    if (inputValue.senha < 6) {
      alert("A senha deve ter pelo menos oito (8) caracteres.");
      return false;
    }
    if (inputValue.senha != confirmSenha) {
      alert("Repita exatamente a senha que você colocou acima.");
      return false;
    }

    return true;
  };

  const create = async () => {
    if (!validateInputs()) return;

    const headers = new Headers();
    headers.append("Authorization", "1ebd74f1-8c51-44e7-a0b6-8eb87f8b56a6");
    headers.append("Content-Type", "application/json");
    headers.append(
      "Cookie",
      "XSRF-TOKEN=eyJpdiI6IkFpRDg0VzlpaFA3VnN5U0FCS0JqZVE9PSIsInZhbHVlIjoiTk5ieW9yYm5iVW80ZUpkVjdrcWpjdlVSeXhJbnhFQ0p6QjFKMmxpUG8zc2JueTFiZUl4bUZ5c3VCd0g4c2xPK2xmTS8vcW4xZ2VzV2ZHOTFteUFEMHRYZE1kUXhaQUtWM3dSMUEzMkI5b3R1UGRvTkw4ZHY2S3JGTmg3QThRWTAiLCJtYWMiOiI1MmNmNTMyY2M2YzYwMDlkYTViMTlkMTMyNGVjNmUzOGYwMWUyMzUyNjFkN2YwZWI2NWE5NDMxYTlhOGIwYjAxIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IncvUEdCcnNLSzdsME5rdnd2RkN1VFE9PSIsInZhbHVlIjoiRExZc283aTZ2QzIxLzV0MUp2K0ZGZmdrQnI3ZHN4dVRsM05qSjJucnlMS3JSWmpweEpzNFZuU21rcGVEclJnT01vQy9paU5SblVva1FlUjR3ZE5UZGN3VFFjN2dUMXJCUXVjaHpzSld3OUpXRXNabTF5L01wdHRBYUg1aVhtSzMiLCJtYWMiOiIyYjg4Y2UzZGU1ZjdlMGE1NmUxOWIxOTUzNjVmZWFjYjU3ZWQ3ZGQ1YzE4ZDk1MDRhY2Q2Zjk1YjMzM2ViMzdhIiwidGFnIjoiIn0%3D"
    );

    try {
      let response = await fetch(
        "https://api.simplescontrole.com.br/api/v1/resale/create",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(inputValue),
          redirect: "follow",
        }
      );
      response = await response.json();
      if (response.message) alert(response.message);

      Router.push(`/create-result?slug=${inputValue.slug}`);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const callbackEndpoint = `${window.location.hostname}/api/create-result`;
    setInputValue({ ...inputValue, callback: callbackEndpoint });
  }, []);

  return (
    <main className="w-3/5 md:w-full p-8 sm:p-4 m-auto">
      <header>
        <div className="w-32 m-auto">
          <Image src={LogoSimples} />
        </div>

        <div className="flex flex-wrap justify-between">
          <h1 className="text-2xl font-roboto font-bold">Cadastro</h1>
          <button
            type="button"
            className="px-9 py-2 font-roboto font-bold bg-simples1 text-white rounded-lg"
            onClick={create}
          >
            Criar
          </button>
        </div>
      </header>

      <div className="" title="formulário de criação">
        <GroupInputs>
          <Input
            type="text"
            label="Domínio"
            getValue={(value) =>
              setInputValue({ ...inputValue, dominio: value })
            }
          />
          <Input
            type="text"
            label="Code zone"
            getValue={(value) =>
              setInputValue({ ...inputValue, code_zone: value })
            }
          />
          <Input
            type="text"
            label="Usuário"
            getValue={(value) => setInputValue({ ...inputValue, login: value })}
          />
        </GroupInputs>

        <GroupInputs cols="repeat(2, 1fr)">
          <Input
            type="password"
            label="Senha"
            getValue={(value) => setInputValue({ ...inputValue, senha: value })}
          />
          <Input
            type="password"
            label="Repita a senha"
            getValue={(value) => setConfirmSenha(value)}
          />
        </GroupInputs>

        <GroupInputs cols="0.3fr 1fr">
          <Input
            type="text"
            label="slug"
            getValue={(value) => setInputValue({ ...inputValue, slug: value })}
          />
        </GroupInputs>
      </div>
    </main>
  );
};

export default CreateRevenda;