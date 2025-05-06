import Image from 'next/image';

const TexasInitiativesSection = () => {
  return (
    <section id="texas-initiatives" className="py-12 px-4 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-red-700 mb-4">University Initiatives in Texas</h2>
        <p className="text-center max-w-3xl mx-auto mb-8 text-gray-600">Several universities in Texas are actively exploring or implementing advanced energy solutions, including microgrids and large-scale renewable projects.</p>
        <div className="flex flex-wrap justify-around gap-4 mt-6">

          <div className="text-center flex-basis-30 min-w-[250px]">
            <Image
              src="/images/UT1.png"
              alt="UT Austin campus energy infrastructure diagram"
              width={300} // Placeholder width, adjust as needed
              height={200} // Placeholder height, adjust as needed
              className="max-w-full h-auto border border-gray-300 mx-auto"
            />
            <p className="text-sm text-gray-600 mt-2">UT Austin's established combined heat and power system.</p>
          </div>

          <div className="text-center flex-basis-30 min-w-[250px]">
            <Image
              src="/images/UT2.png"
              alt="UT Austin renewable energy integration graphic"
              width={300} // Placeholder width, adjust as needed
              height={200} // Placeholder height, adjust as needed
              className="max-w-full h-auto border border-gray-300 mx-auto"
            />
            <p className="text-sm text-gray-600 mt-2">UT Austin's focus on integrating renewables and efficiency.</p>
          </div>

          <div className="text-center flex-basis-30 min-w-[250px]">
            <Image
              src="/images/AnM.png"
              alt="Texas A&M RELLIS campus microgrid project overview"
              width={300} // Placeholder width, adjust as needed
              height={200} // Placeholder height, adjust as needed
              className="max-w-full h-auto border border-gray-300 mx-auto"
            />
            <p className="text-sm text-gray-600 mt-2">Texas A&M's RELLIS campus microgrid initiative.</p>
          </div>

          <div className="text-center flex-basis-30 min-w-[250px]">
            <Image
              src="/images/AnM_grid.png"
              alt="Texas A&M grid infrastructure diagram"
              width={300} // Placeholder width, adjust as needed
              height={200} // Placeholder height, adjust as needed
              className="max-w-full h-auto border border-gray-300 mx-auto"
            />
            <p className="text-sm text-gray-600 mt-2">Details of Texas A&M's grid integration.</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TexasInitiativesSection;