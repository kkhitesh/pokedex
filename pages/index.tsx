import { useState, useEffect } from "react";
import { gql } from "@apollo/client/core";
import client from "../apollo-client";
import Layout from "@/components/Layout";
import { GetStaticProps } from "next";
import { PokemonCard } from "../components/PokemonCard";

export default function Home({ pokemons }: any) {
  const [pokemonsArr, setPokemonsArr] = useState(pokemons?.slice(0, 20));
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPokemonsArr(pokemons?.slice(page * 20, page * 20 + 20));
  }, [page]);

  const handlePrevChange = () => {
    setPage((page) => page - 1);
  };

  const handleNextPage = () => {
    setPage((page) => page + 1);
  };

  return (
    <Layout title={"Pokedex"}>
      <div className="flex flex-wrap justify-center items-center mx-auto">
        {pokemonsArr?.map((pokemon: any) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      <div className="flex flex-wrap justify-between pb-5 px-3">
        <button
          className="text-white bg-blue-700 focus:ring-4 font-medium rounded-lg text-sm px-4 py-2 mr-2 mb-2 dark:bg-blue-600 focus:outline-none disabled:bg-gray-500"
          onClick={handlePrevChange}
          disabled={page === 0 ? true : false}
        >
          Previous
        </button>
        <button
          className="text-white bg-blue-700 focus:ring-4 font-medium rounded-lg text-sm px-4 py-2 mr-2 mb-2 dark:bg-blue-600 focus:outline-none disabled:bg-gray-500"
          onClick={handleNextPage}
          disabled={pokemons?.length / 20 - page < 1 ? true : false}
        >
          Next
        </button>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data } = await client.query({
      query: gql`
        query pokemons {
          pokemons(first: 151) {
            id
            number
            name
            types
            image
          }
        }
      `,
    });

    return {
      props: {
        pokemons: data.pokemons,
      },
    };
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      pokemons: null,
    },
  };
};
