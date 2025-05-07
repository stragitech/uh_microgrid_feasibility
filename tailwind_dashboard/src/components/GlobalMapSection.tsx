'use client';

import { useState, useEffect, useRef } from 'react';
import MicrogridDashboard from './MicrogridDashboard';

const GlobalMapSection = () => {
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
      id="global-map"
      ref={sectionRef}
      className={`py-12 bg-white transition-all duration-600 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-red-700 mb-4">Global Microgrid Examples</h2>
        <p className="text-center max-w-3xl mx-auto mb-8 text-gray-600">Microgrids are being deployed worldwide in diverse applications. This map showcases examples ranging from remote community power systems to industrial facilities, military bases, and university campuses, illustrating the global trend towards localized, resilient energy solutions.</p>
        <div className="relative w-full max-w-screen-xl mx-auto" style={{ paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}> {/* 16:9 Aspect Ratio */}
          <iframe
            src="https://www.google.com/maps/d/u/0/embed?mid=1epJU454zp0jOsimtUOIdxKscbd-UkL4&ehbc=2E312F&noprof=1"
            className="absolute top-0 left-0 w-full h-full border border-gray-300"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <div className="mt-8"> {/* Added margin-top for spacing */}
          <MicrogridDashboard />
      </div>
    </section>
  );
};

export default GlobalMapSection;