import FeatureCategory from './components/FeatureCategory.jsx';
import Banner from './components/Banner.jsx';

const Home = () => {
  return (<div className="w-full text-center bg-gray-100 ">
        <div><Banner/></div>
        <div>
          <FeatureCategory/>
        </div>
      </div>);
};

export default Home;
