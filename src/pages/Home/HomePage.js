import LandingPage from "../../components/LandingPage/LandingPage";
import Industries from "../../components/Industries/Industries";
import PageFooter from "../../components/Footer/Footer";
import Solutions from "../../components/Solutions/Solutions";
import Services from "../../components/Services/Services";
import TopPage from "../../components/TopPage/TopPage";
function HomePage() {
  return (
    <>
      <div className="overlay" />
      <TopPage />
      <LandingPage />
      <Industries />
      <Solutions />
      <Services />
      <PageFooter />
    </>
  );
}

export default HomePage;
