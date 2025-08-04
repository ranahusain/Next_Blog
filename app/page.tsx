import Navbar from "@/components/Navbar";
import HomePageBody from "@/components/HomePageBody";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className="main-hompage">
        <Navbar />
        <HomePageBody />
        <Footer />
      </div>
    </>
  );
}
