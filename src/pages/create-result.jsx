import AnimationLoading from "../components/AnimationLoading";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const CreateResult = () => {
  const router = useRouter();
  let { slug } = router.query;

  const [statusRevenda, setStatusRevenda] = useState("creating");

  const queryResult = async () => {
    try {
      let response = await fetch(`api/create-result?slug=${slug}`);
      response = await response.json();
      if (response.falhou) return setStatusRevenda("error");

      return setStatusRevenda("sucess");
    } catch (error) {
      // alert("Ocorreu um erro interno!");
    }
  };

  useEffect(() => {
    if (slug) {
      window.localStorage.setItem("slug", slug);
    } else {
      slug = window.localStorage.getItem("slug");
    }

    setInterval(() => {
      queryResult();
    }, 20000);
  }, []);

  return (
    <main className="w-3/5 md:w-full h-screen p-8 sm:p-4 m-auto text-center">
      <div className="m-auto">
        {statusRevenda === "creating" && (
          <>
            <AnimationLoading />
            <h2 className="font-roboto font-bold text-[1.3rem]">
              Aguarde, a Revenda está sendo criada!
            </h2>
          </>
        )}

        {statusRevenda === "success" && (
          <h2 className="font-roboto font-bold text-[1.3rem]">
            Revenda criada com sucesso!
          </h2>
        )}

        {statusRevenda === "error" && (
          <h2 className="font-roboto font-bold text-[1.3rem]">
            Não foi possivel criar a revenda!
          </h2>
        )}
      </div>
    </main>
  );
};


export default CreateResult;