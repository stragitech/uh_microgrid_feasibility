const HomeSection = () => {
  return (
    <section id="home" className="py-12 px-4 bg-gray-100">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-red-700 mb-4">Welcome to the UH Microgrid Educational Platform</h1>
        <p className="mb-4">
          Technology today is moving faster than ever, changing the way we live, work, and power our communities. Instead of relying solely on large, centralized power grids, there's a growing focus on smaller, smarter, local energy solutions. This website explores Microgrids as a promising solution.
        </p>
        <p>
          Here, you'll find comprehensive information about microgrid technology – what it is, why it's useful, its key components, and how it's being implemented in the real world. We'll look at examples from leading universities and other institutions, dive into the specifics of the University of Houston's energy system and microgrid potential, and discuss the funding and policies shaping the future of resilient energy.
        </p>
      </div>
    </section>
  );
};

export default HomeSection;