import Navbar from "@/components/HomePage/Navbar";
import HomePageBody from "@/components/HomePage/HomePageBody";
import Footer from "@/components/HomePage/Footer";

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
