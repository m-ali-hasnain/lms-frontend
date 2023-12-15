import "bootstrap/dist/css/bootstrap.min.css";
import store, { persistor } from "../store/store";
import { Provider } from "react-redux";
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/layout";

function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </Provider>
      <ToastContainer />
    </>
  );
}

export default App;
