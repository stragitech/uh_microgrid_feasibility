'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const AboutSection = () => {
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
      id="about"
      ref={sectionRef}
      className={`py-12 px-4 bg-white transition-all duration-600 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-red-700 mb-4">About Microgrids</h1>

        <h2 id="what-is" className="text-2xl font-semibold text-gray-800 mb-3">What is a Microgrid?</h2>
        <p className="mb-4">
          A microgrid is a localized group of electricity sources and loads that normally operates connected to the traditional centralized electrical grid (macrogrid) but can also disconnect and operate autonomously. Think of it as a small-scale version of the main grid that can function independently when needed.
        </p>
        <p className="mb-4">
          The defining feature is its ability to intentionally &quot;island&quot; itself from the macrogrid during outages or disturbances, using its own local energy resources to power its designated loads. This capability is managed by a sophisticated microgrid controller.
        </p>
        <div className="text-center my-6">
          <Image
            src="/images/microgrid-system.png"
            alt="Diagram illustrating the components of a microgrid including generation, storage, loads, and grid connection"
            width={600} // Placeholder width, adjust as needed
            height={400} // Placeholder height, adjust as needed
            className="mx-auto border border-gray-300"
          />
        </div>

        <h2 id="why-important" className="text-2xl font-semibold text-gray-800 mb-3 mt-8">Why are Microgrids Important?</h2>
        <p className="mb-4">
          Microgrids offer significant advantages, primarily focused on enhancing <strong>energy resilience</strong> and <strong>reliability</strong>. By operating independently during grid outages caused by weather, equipment failure, or other disruptions, they ensure continuous power for critical facilities (like hospitals, data centers, emergency services) and communities. Examples like UT Austin maintaining power during Winter Storm Uri highlight this crucial benefit.
        </p>
        <p className="mb-4">
          They also facilitate the integration of <strong>Distributed Energy Resources (DERs)</strong>, especially renewables like solar and wind, as well as combined heat and power (CHP) systems and battery storage. This promotes cleaner energy, reduces greenhouse gas emissions, and can potentially lower energy costs through optimized local generation and demand management. Furthermore, microgrids can improve local power quality and provide beneficial services back to the main grid when connected.
        </p>

        <h2 id="how-work" className="text-2xl font-semibold text-gray-800 mb-3 mt-8">How do they Work?</h2>
        <p className="mb-4">
          A microgrid&apos;s operation is orchestrated by its <strong>control system</strong>. This &quot;brain&quot; manages the flow of energy within the microgrid, balancing generation sources (solar, CHP, batteries, generators) with the energy demands of the connected buildings and loads.
        </p>
        <p className="mb-4">
          <strong>Grid-Connected Mode:</strong> When connected to the main grid, the microgrid can import power when local generation is insufficient or export excess power. The controller optimizes this interaction based on energy prices, grid conditions, or pre-defined goals (like minimizing cost or carbon footprint).
        </p>
        <div className="text-center my-6">
          <Image
            src="/images/Microgrids_in_Grid_Connected_Mode.png"
            alt="Diagram showing a microgrid connected to the utility grid with bi-directional power flow"
            width={600} // Placeholder width, adjust as needed
            height={400} // Placeholder height, adjust as needed
            className="mx-auto border border-gray-300"
          />
        </div>
        <p className="mb-4">
          <strong>Island Mode:</strong> During a grid outage or other triggering event, the controller automatically detects the problem and opens a switch (at the Point of Common Coupling - PCC), safely disconnecting the microgrid from the macrogrid. In island mode, the controller must maintain stable voltage and frequency within the microgrid, manage energy storage (charging/discharging batteries), and potentially shed non-essential loads to ensure continuous power for critical functions. When grid power is restored and stable, the controller manages the process of safely reconnecting and synchronizing with the macrogrid. Modern systems often use distributed control architectures for increased flexibility and resilience compared to older centralized controllers.
        </p>
        <div className="text-center my-6">
          <Image
            src="/images/Microgrids_in_Grid_Island_Mode.png"
            alt="Diagram showing a microgrid disconnected from the utility grid and operating in island mode"
            width={600} // Placeholder width, adjust as needed
            height={400} // Placeholder height, adjust as needed
            className="mx-auto border border-gray-300"
          />
        </div>

        <h2 id="components" className="text-2xl font-semibold text-gray-800 mb-3 mt-8">Key Components</h2>
        <p className="mb-4">Typical microgrids integrate several key technologies:</p>
        <ul className="list-disc list-inside mb-4">
          <li><strong>Local Generation:</strong> Sources like solar panels (PV), wind turbines, combined heat and power (CHP) plants, natural gas generators, or fuel cells.</li>
          <li><strong>Energy Storage:</strong> Often lithium-ion batteries, used to store excess energy, smooth out fluctuations from renewables, and provide power during islanding.</li>
          <li><strong>Loads:</strong> The buildings, equipment, and devices that consume electricity within the microgrid&apos;s boundary. These can sometimes be categorized as critical (must stay powered) and non-critical (can be shed if necessary).</li>
          <li><strong>Point of Common Coupling (PCC):</strong> The switchgear and controls that form the interface between the microgrid and the main utility grid, allowing connection and disconnection.</li>
          <li><strong>Microgrid Controller:</strong> The central intelligence that monitors conditions, manages resources, controls the PCC, and optimizes operation in both grid-connected and island modes.</li>
        </ul>

        <h2 id="challenges" className="text-2xl font-semibold text-gray-800 mb-3 mt-8">Challenges & Considerations</h2>
        <p className="mb-4">
          While beneficial, microgrids also present challenges:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li><strong>Cost:</strong> Initial capital investment for generation, storage, and control systems can be substantial, often requiring significant funding or financing arrangements.</li>
          <li><strong>Complexity:</strong> Designing, integrating, and operating the various components requires specialized expertise. Control systems need careful configuration and maintenance.</li>
          <li><strong>Regulatory Hurdles:</strong> Interconnecting with the utility grid involves navigating regulations, tariffs, and agreements, which can vary significantly by location. Islanding capabilities may require specific approvals.</li>
          <li><strong>Maintenance:</strong> Ongoing maintenance is crucial for reliability. Some systems, like the Bronx Zoo&apos;s initial setup, faced challenges with upkeep and ensuring sufficient backup capacity during long outages.</li>
          <li><strong>Potential Emissions:</strong> If heavily reliant on fossil fuel generators (like diesel or natural gas) without sufficient renewable integration or storage, a microgrid could potentially increase local air pollution compared to cleaner grid power. Careful design is needed to maximize environmental benefits.</li>
          <li><strong>Cybersecurity:</strong> As sophisticated control systems, microgrids need robust cybersecurity measures to protect against potential threats.</li>
        </ul>
      </div>
    </section>
  );
};

export default AboutSection;