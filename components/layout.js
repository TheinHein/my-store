import useSWR from "swr";
import axios from "axios";

import NavBar from "./NavBar";
import Footer from "./Footer";

// const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Layout({ children }) {
  // const { data, error } = useSWR("http://localhost:3001/products", fetcher);

  // if (error) return <div>Failed to load</div>;
  // if (!data) return <div>Loading...</div>;
  // console.log(data.products);
  return (
    <>
      {/* <NavBar products={data.products} /> */}
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
