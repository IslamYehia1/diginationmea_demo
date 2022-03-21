import TransformationStory from "../../components/TransformationStory/TransformationStory";
import Industries from "../../components/Industries/Industries";
import PageFooter from "../../components/Footer/Footer";
import Solutions from "../../components/Solutions/Solutions";
import Services from "../../components/Services/Services";
import LandingPage from "../../components/LandingPage/LandingPage";
function HomePage() {
  return (
    <>
      <div className="overlay" />
      <LandingPage />
      <TransformationStory />
      <Industries />
      <Solutions />
      <Services />
      <PageFooter />
    </>
  );
}

export default HomePage;
