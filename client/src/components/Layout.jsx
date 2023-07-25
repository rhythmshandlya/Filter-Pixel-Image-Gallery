import Navbar from "./navbar/navbar";

export default function Layout({ children }) {
  return (
    <div className="site-wrapper">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
