import { Header, Footer } from "../components/shared";

export default function RootLayout({ children }) {
  return (
        <>
        <Header />
        <main className="mt-8">{children}</main>
        <Footer />
        </>
   
  );
}
