const GlobalMapSection = () => {
  return (
    <section id="global-map" className="py-12 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-red-700 mb-4">Global Microgrid Examples</h2>
        <p className="text-center max-w-3xl mx-auto mb-8 text-gray-600">Microgrids are being deployed worldwide in diverse applications. This map showcases examples ranging from remote community power systems to industrial facilities, military bases, and university campuses, illustrating the global trend towards localized, resilient energy solutions.</p>
        <div className="relative w-full max-w-screen-xl mx-auto" style={{ paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}> {/* 16:9 Aspect Ratio */}
          <iframe
            src="https://www.google.com/maps/d/embed?mid=1epJU454zp0jOsimtUOIdxKscbd-UkL4&ehbc=2E312F"
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

export default GlobalMapSection;