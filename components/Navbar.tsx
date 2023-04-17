import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <header className="h-14 p-2 flex items-center justify-center bg-poke-red shadow-[0_4px_50px_#EF5350]">
      <Link href="/">
        <Image src="/logo.png" width={124} height={100} alt="Pokedex Logo" />
      </Link>
    </header>
  );
};

export default Navbar;
