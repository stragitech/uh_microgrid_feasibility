'use client';

import { useState, useEffect, useRef } from 'react';

const FundingPolicySection = () => {
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
      id="funding-policy"
      ref={sectionRef}
      className={`py-12 px-4 bg-white transition-all duration-600 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-red-700 mb-4">Funding and Policy Landscape</h2>
        <p className="text-center max-w-3xl mx-auto mb-8 text-gray-600">Developing microgrids involves significant investment, but various funding mechanisms and supportive policies are emerging:</p>

        <h3 id="funding-sources" className="text-2xl font-semibold text-gray-800 mb-3 mt-8">Funding Sources</h3>
        <ul className="list-disc list-inside mb-4 text-gray-700 ml-6">
          <li className="mb-2"><strong>Federal Grants:</strong> Programs like the U.S. Department of Energy&apos;s (DOE) Microgrid Program, Grid Deployment Office initiatives, and FEMA&apos;s Hazard Mitigation Assistance offer grants, particularly for projects enhancing resilience and integrating renewables.</li>
          <li className="mb-1.5"><strong>Tax Credits:</strong> The Inflation Reduction Act (IRA) provides significant investment tax credits for solar, battery storage, and other microgrid components, substantially lowering project costs.</li>
          <li className="mb-1.5"><strong>State Programs:</strong> Texas has programs like the Texas Energy Reliability Program (potentially expanding) and proposed legislation (e.g., Texas Microgrid and Resiliency Act) aimed at supporting grid stability and resilience projects.</li>
          <li className="mb-1.5"><strong>Utility Partnerships:</strong> Collaboration with utilities (like CenterPoint) can sometimes unlock funding or streamline interconnection.</li>
          <li className="mb-1.5"><strong>Private Investment & ESPCs:</strong> Energy Savings Performance Contracts allow institutions to partner with private companies to finance and implement energy projects, paying them back through the achieved savings.</li>
          <li className="mb-1.5"><strong>Institutional Funding:</strong> Universities can allocate funds from sustainability budgets, capital improvement plans, or research grants.</li>
        </ul>

        <h3 id="policy-advocacy" className="text-2xl font-semibold text-gray-800 mb-3 mt-8">Policy and Advocacy</h3>
        <p className="mb-4 text-gray-700">
          Supportive policies are crucial for accelerating microgrid adoption. Key areas include:
        </p>
        <ul className="list-disc list-inside mb-4 text-gray-700 ml-5">
          <li className="mb-2">Streamlining interconnection standards and tariffs for microgrids.</li>
          <li className="mb-2">Clarifying regulations around islanding capabilities.</li>
          <li className="mb-2">Continued funding for federal and state grant programs.</li>
          <li className="mb-2">Incentivizing resilience benefits provided by microgrids.</li>
        </ul>
        <p className="mb-4 text-gray-700">
          Institutions like UH can play a role by advocating for supportive policies at state and federal levels, potentially partnering with other universities and organizations. Engaging with programs like the DOE&apos;s Grid Resilience Innovation Partnership (GRIP) and aligning with local initiatives like the Resilient Houston plan can also strengthen proposals and impact.
        </p>
      </div>
    </section>
  );
};

export default FundingPolicySection;