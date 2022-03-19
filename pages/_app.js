import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import { CartProvider } from "../contexts/CartContext";

import "../styles/globals.css";

import Layout from "../components/layout";

const initialOptions = {
  "client-id":
    "AbU0MD1K_gLqd89flNB2bJx5CiRaYRq_rqk_k8aozyfoZN1_CWFX-3mSs0gIevLCF_OGzMF2b_R9Epll",
  currency: "USD",
  intent: "capture",
  "data-client-token":
    "A21AAKfMuG0j3CrodyrHBGu-9El76V-CH1xnYzPwDVjkP59Y_M_U7Hy4VCTjyASdevhSmC-tcCRMKNg9_vdyTlPZuvEbYVzhw",
};

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <PayPalScriptProvider
        options={{
          "client-id":
            "AbU0MD1K_gLqd89flNB2bJx5CiRaYRq_rqk_k8aozyfoZN1_CWFX-3mSs0gIevLCF_OGzMF2b_R9Epll",
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PayPalScriptProvider>
    </CartProvider>
  );
}

export default MyApp;
