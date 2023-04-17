import Link from "next/link";

export const stylesData = {
  styles: {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  },
};

interface PokemonCardProps {
  pokemon: {
    id: string;
    number: number;
    name: string;
    types: string[];
    image: string;
  };
}

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  return (
    <Link href={`/pokemons/${pokemon.name}`}>
      <div className="p-4">
        <div className="bg-white py-4 px-6">
          <img
            src={pokemon.image}
            className="h-[152px] w-[152px] sm:h-[200px] sm:w-[200px] p-4"
            alt={pokemon.name}
          />
          <div className="text-center">
            {pokemon.types.map((type: string) => (
              <span
                key={type}
                className=" text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded "
                style={{
                  backgroundColor:
                    stylesData.styles[
                      type.toLowerCase() as keyof typeof stylesData.styles
                    ],
                }}
              >
                {type}
              </span>
            ))}
          </div>
          <p className="text-2xl text-center">
            <span className="font-bold">{pokemon.number}. </span>
            {pokemon.name}
          </p>
        </div>
      </div>
    </Link>
  );
};
