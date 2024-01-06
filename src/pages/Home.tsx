import { LatestBlogs } from "../components";
import Hero from "../components/home/Hero";
const Home = () => {
  return (
    <section className="py-8 lg:py-24 dark:bg-gray-800">
      <div className="px-4 mx-auto">
        <Hero />
        <LatestBlogs />
      </div>
    </section>
  );
};

export default Home;
