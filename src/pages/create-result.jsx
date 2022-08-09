import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

//components
import AnimationLoading from "../components/AnimationLoading";
import Alert from "../components/Alert";

const CreateResult = () => {
  const router = useRouter();
  let { slug } = router.query;

  const [countReq, setCountReq] = useState(0);
  const [alertMessage, setAlertMessage] = useState(null);
  const [statusRevenda, setStatusRevenda] = useState("pending");

  const queryResult = async () => {
    try {
      let response = await fetch(`api/create-result?slug=${slug}`);
      response = await response.json();

      if (!response) return setStatusRevenda("pending");

      if (response.falhou) {
        setStatusRevenda("error");

        return setAlertMessage({
          color: "#ff7260",
          text: "Erro ao criar a revenda!",
        });
      }

      setAlertMessage({
        color: "#2db84f",
        text: "Revenda criada com sucesso!",
      });

      setStatusRevenda("success");
    } catch (error) {
      setStatusRevenda("error");
      setAlertMessage({
        color: "#ff7260",
        text: "Ocoreu um erro, tente novamente mais tarde!",
      });
    }
  };

  useEffect(() => {
    if (slug) {
      window.localStorage.setItem("slug", slug);
    } else {
      slug = window.localStorage.getItem("slug");
    }

    setInterval(() => {
      if (countReq >= 8) {
        setStatusRevenda(null);

        return setAlertMessage({
          color: "#ff7260",
          text: "Ocoreu um erro, tente novamente mais tarde!",
        });
      }

      queryResult();
      setCountReq(countReq++);
    }, 20000);
  }, []);

  return (
    <main className="w-3/5 md:w-full h-screen p-8 sm:p-4 m-auto text-center">
      <div className="m-auto">
        {alertMessage && (
          <Alert color={alertMessage.color} text={alertMessage.text} />
        )}

        {statusRevenda === "pending" && (
          <>
            <AnimationLoading />
            <h2 className="font-roboto font-bold text-[1.3rem]">
              Aguarde, a revenda está sendo criada!
            </h2>
          </>
        )}
      </div>
    </main>
  );
};

export default CreateResult;
