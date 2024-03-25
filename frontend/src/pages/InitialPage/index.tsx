import PresentationView from "../../components/presentation-view";

import "./styles.css";

const Home = () => {
  return (
    <div id="initial-page">
      <div className="content">
        <header>
          <h1>KnowHowHub</h1>
        </header>

        <main>
          <PresentationView></PresentationView>
        </main>
      </div>
    </div>
  );
};

export default Home;
