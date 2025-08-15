import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="d-flex justify-content-center mt-4">
        <div style={{ width: "100%", maxWidth: "1000px" }}>
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
}
