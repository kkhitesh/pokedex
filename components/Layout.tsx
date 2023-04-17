import Head from "next/head";
import Navbar from "./Navbar";

interface ILayoutProps {
  title: string;
  children: any;
}

const Layout = ({ title, children }: ILayoutProps) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Welcome to Pokedex" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="bg-gray-300 text-gray-800">{children}</div>
    </div>
  );
};

export default Layout;
