'use client';

import { useState, useEffect, useRef } from 'react';

const UHMapSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Optionally stop observing once visible
            // observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.1, // Trigger when 10% of the section is visible
      }
    );

    const currentRef = sectionRef.current; // Capture the current ref value

    if (currentRef) {
      observer.observe(currentRef);
    }

    // Cleanup function
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount
  return (
    <section
      id="uh-map"
      ref={sectionRef}
      className={`py-12 px-4 bg-white transition-all duration-600 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
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