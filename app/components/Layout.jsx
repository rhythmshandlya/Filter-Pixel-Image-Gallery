import Navbar from "./navbar/navbar";
import Providers from "./Providers";

export default function Layout({ children }) {
  return (
    <Providers>
      <div className="site-wrapper">
        <Navbar />
        <main>{children}</main>
      </div>
    </Providers>
  );
}
