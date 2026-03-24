import Header from "./landing/Header";
import Footer from "./landing/Footer";

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
