import Layout from "@/components/Layout";
import { GetServerSideProps } from "next";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import { PokemonCard, stylesData } from "@/components/PokemonCard";
import { useState } from "react";

interface PokemonDetailsProps {
  pokemon: {
    id: string;
    number: number;
    name: string;
    types: string[];
    image: string;
    weight: {
      minimum: string;
      maximum: string;
    };
    height: {
      minimum: string;
      maximum: string;
    };
    classification: string;
    resistant: string[];
    weaknesses: string[];
  };
}

const PokemonDetails = ({ pokemon }: PokemonDetailsProps) => {
  const [showModal, setShowModal] = useState(false);
  const [evolutions, setEvolutions] = useState([pokemon]);

  const getEvolutions = async () => {
    const { data } = await client.query({
      query: gql`
        query pokemon {
          pokemon(name: "${pokemon.name}") {
            id
            number
            name
            types
            image
            evolutions {
              id
              number
              name
              types
              image
            }
          }
        }
      `,
    });

    evolutions.length === 1 &&
      data.pokemon.evolutions &&
      setEvolutions([...evolutions, ...data.pokemon.evolutions]);

    setShowModal(true);
    return data.pokemon.evolutions;
  };

  return (
    <Layout title={pokemon?.name}>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Evolutions</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex flex-wrap sm:flex-nowrap">
                  {evolutions.map((pokemon, i) => (
                    <div className="flex items-center justify center">
                      {i !== 0 ? (
                        <span className="text-4xl font-bold">{">"}</span>
                      ) : null}
                      <PokemonCard key={pokemon.id} pokemon={pokemon} />
                    </div>
                  ))}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <div className="max-h-screen pt-8 flex flex-wrap sm:flex-nowrap justify-center mx-auto bg-white gap-10 sm:gap-20">
        <div className="px-10 sm:pb-10">
          <img src={pokemon?.image} alt={pokemon?.name} />
        </div>
        <div className="ml-10">
          <p className="text-4xl font-semibold">
            <span className="mr-3">#{pokemon?.number}</span>
            <span>{pokemon?.name}</span>
          </p>
          <p>
            <span className="font-bold">Classification:</span>{" "}
            {pokemon?.classification}
          </p>
          <p>
            <span className="font-bold">Height:</span> {pokemon?.height.minimum}{" "}
            - {pokemon?.height.maximum}
          </p>
          <p>
            <span className="font-bold">Weight:</span> {pokemon?.weight.minimum}{" "}
            - {pokemon?.weight.maximum}
          </p>
          <p>
            <span className="font-bold">Types:</span>{" "}
            {pokemon.types.map((type: string) => (
              <span
                key={type}
                className=" text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded "
                style={{
                  backgroundColor: stylesData.styles[type.toLowerCase()],
                }}
              >
                {type}
              </span>
            ))}
          </p>
          <p>
            <span className="font-bold">Resistant:</span>{" "}
            {pokemon.resistant.map((res: string) => (
              <span
                key={res}
                className=" text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded "
                style={{
                  backgroundColor: stylesData.styles[res.toLowerCase()],
                }}
              >
                {res}
              </span>
            ))}
          </p>
          <p>
            <span className="font-bold">Weaknesses:</span>{" "}
            {pokemon.weaknesses.map((weak: string) => (
              <span
                key={weak}
                className=" text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded "
                style={{
                  backgroundColor: stylesData.styles[weak.toLowerCase()],
                }}
              >
                {weak}
              </span>
            ))}
          </p>
          <button
            className="text-white ml-20 mt-5 bg-blue-700 focus:ring-4 font-medium rounded-lg text-sm px-4 py-2 mr-2 mb-2 dark:bg-blue-600 focus:outline-none disabled:bg-gray-500"
            onClick={getEvolutions}
          >
            Evolutions
          </button>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const { data } = await client.query({
      query: gql`
        query pokemon {
          pokemon(name: "${query.name}") {
            id
            number
            name
            weight {
              minimum
              maximum
            }
            height {
              minimum
              maximum
            }
            classification
            types
            resistant
            weaknesses
            image
          }
        }
      `,
    });

    return {
      props: {
        pokemon: data.pokemon,
      },
    };
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      pokemon: null,
    },
  };
};

export default PokemonDetails;
