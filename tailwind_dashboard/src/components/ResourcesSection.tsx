'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const ResourcesSection = () => {
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
      id="resources"
      ref={sectionRef}
      className={`py-12 px-4 bg-gray-100 transition-all duration-600 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-red-700 mb-4">Resources & Further Reading</h2>
        <p className="text-center max-w-3xl mx-auto mb-8 text-gray-600">Explore these links for more detailed information:</p>
        <ul className="list-disc list-inside mb-8 text-gray-700 max-w-3xl mx-auto ml-5">
          <li className="mb-2"><Link href="https://www.energy.gov/oe/services/technology-development/smart-grid/microgrids" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">U.S. Department of Energy - Office of Electricity Microgrids</Link></li>
          <li className="mb-2"><Link href="https://www.energy.gov/oe/microgrid-program-strategy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">DOE Microgrid Program Strategy</Link></li>
          <li className="mb-2"><Link href="https://www.energy.gov/gdo/grid-deployment-office" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">DOE Grid Deployment Office (GDO)</Link></li>
          <li className="mb-2"><Link href="https://www.energy.gov/gdo/inflation-reduction-act" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">DOE GDO - Inflation Reduction Act Information</Link></li>
          <li className="mb-2"><Link href="https://www.energy.gov/gdo/grid-resilience-and-innovation-partnerships-grip-program" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">DOE GDO - GRIP Program</Link></li>
          <li className="mb-2"><Link href="https://building-microgrid.lbl.gov/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Berkeley Lab - Building Microgrid Research</Link></li>
          <li className="mb-2"><Link href="https://www.nrel.gov/grid/microgrids.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">NREL - Microgrid Research</Link></li>
          <li className="mb-2"><Link href="https://microgridknowledge.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Microgrid Knowledge (News & Articles)</Link></li>
          <li className="mb-2"><Link href="https://utilities.utexas.edu/about-us/resources/ut-austin-energy-data" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">UT Austin Energy Data & Resources</Link></li>
          <li className="mb-2"><Link href="https://uh.edu/facilities-services/programs/facilities%20services%20safety%20program%20/ehls-final-utility_tunnel_safety_manual-with-ehls-changes-rmade-9-19.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">UH Utility Tunnel Safety Manual (PDF)</Link></li>
          <li><Link href="https://greenpowerenergy.com/whats-a-solar-battery-microgrid-how-does-it-power-your-home-during-outages-in-durham/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Example: Solar + Battery Microgrid Explanation</Link></li>
        </ul>
      </div>
    </section>
  );
};

export default ResourcesSection;