const UHMapSection = () => {
  return (
    <section id="uh-map" className="py-12 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-red-700 mb-4">UH Campus Microgrid Overview</h2>
        <p className="text-center max-w-3xl mx-auto mb-8 text-gray-600">This map provides a geographical overview of the University of Houston campus, highlighting key buildings and infrastructure relevant to its energy system. Explore the potential locations for components of a future campus microgrid.</p>
        <div className="relative w-full max-w-screen-xl mx-auto" style={{ paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}> {/* 16:9 Aspect Ratio */}
          <iframe
            src="https://www.google.com/maps/d/embed?mid=1n5My0H802elRh-pktsb7AW4JVAxAVrA&hl=en&ehbc=2E312F"
            className="absolute top-0 left-0 w-full h-full border border-gray-300"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default UHMapSection;