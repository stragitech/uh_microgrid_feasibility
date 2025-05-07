'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const UHFocusSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageVisibility, setImageVisibility] = useState<Record<number, boolean>>({});
  const sectionRef = useRef(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const galleryContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
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

    // Cleanup function for section observer
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount

  useEffect(() => {
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = imageRefs.current.indexOf(entry.target as HTMLDivElement);
          if (index !== -1) {
            setImageVisibility(prev => ({
              ...prev,
              [index]: entry.isIntersecting,
            }));
          }
        });
      },
      {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.5, // Trigger when 50% of the image is visible
      }
    );

    // Capture the current refs at the time this effect runs - FIX 1
    const currentImageRefs = [...imageRefs.current];

    currentImageRefs.forEach(ref => {
      if (ref) {
        imageObserver.observe(ref);
      }
    });

    // Cleanup function for image observers
    return () => {
      // Use the captured refs in cleanup - FIX 1
      currentImageRefs.forEach(ref => {
        if (ref) {
          imageObserver.unobserve(ref);
        }
      });
    };
  }, []); // Remove dependency on imageRefs.current.length

  useEffect(() => {
    const container = galleryContainerRef.current;
    if (!container) return;

    let animationFrameId: number;
    const scrollSpeed = 0.5; // Adjust scroll speed here

    const scroll = () => {
      if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
        // If scrolled to the end, jump back to the beginning
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += scrollSpeed;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    // Start scrolling after a short delay
    const startScrolling = setTimeout(() => {
      scroll();
    }, 1000); // Delay in milliseconds

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(startScrolling);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  const imagePaths = [
    "/images/uh_central_plant_and_tunnels/flooded_tunnel_1.jpeg",
    "/images/uh_central_plant_and_tunnels/light_tunnel.jpeg",
    "/images/uh_central_plant_and_tunnels/nighttime_uh.jpeg",
    "/images/uh_central_plant_and_tunnels/pipes_and_wires.jpeg",
    "/images/uh_central_plant_and_tunnels/shasta_in_the_tunnel.jpeg",
    "/images/uh_central_plant_and_tunnels/something_with_a_pipe.jpeg",
    "/images/uh_central_plant_and_tunnels/tube_room.jpeg",
    "/images/uh_central_plant_and_tunnels/tunnel_1.jpeg",
    "/images/uh_central_plant_and_tunnels/tunnel_cage.jpeg",
    "/images/uh_central_plant_and_tunnels/tunnel_elbows.jpeg",
    "/images/uh_central_plant_and_tunnels/uh_history_poster_in_tunnel.jpeg",
    "/images/uh_central_plant_and_tunnels/underground_control_room.jpeg",
    "/images/uh_central_plant_and_tunnels/vertical_pipes.jpeg",
    "/images/uh_central_plant_and_tunnels/underground.png",
  ];

  return (
    <section
      id="uh-focus"
      ref={sectionRef}
      className={`py-12 px-4 bg-gray-100 transition-all duration-600 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-red-700 mb-4">Focus: University of Houston Energy</h2>
{/* UH Central Plant Image */}
        <div className="flex justify-center mb-8">
          <Image
            src="/images/uh_central_plant_and_tunnels/UHCentralPlantAngle.jpg"
            alt="University of Houston Central Plant"
            width={800} 
            height={500} 
            className="rounded-lg shadow-lg"
          />
        </div>

        <h3 id="uh-current" className="text-2xl font-semibold text-gray-800 mb-3 mt-8">Current UH Energy System: The Central Plant</h3>
        <p className="mb-4 text-gray-700">
          The University of Houston&apos;s campus operations rely heavily on its Central Plant facility. This plant distributes essential utilities like electricity, chilled water (for cooling), and steam (for heating and other processes) throughout the campus via an extensive network of underground tunnels (approximately 3 miles long). While the plant manages internal distribution, UH currently receives all its electricity from the external Texas grid (ERCOT), supplied via CenterPoint Energy.
        </p>
        <p className="mb-4 text-gray-700">
          The plant has significant capacity, generating about 18,000 tons of chilled water and managing a peak electrical demand around 33 MW. Expansions over the years have added chillers, boilers, and cooling towers. UH has also incorporated some sustainability measures, including 88 rooftop solar panels on the plant itself (powering low-voltage equipment) and automated systems for energy balancing. However, the campus remains fully dependent on the external grid for its primary power supply.
        </p>
        <p className="mb-4 text-gray-700">
          You can learn more about the utility tunnel system in the <Link href="https://uh.edu/facilities-services/programs/facilities%20services%20safety%20program%20/ehls-final-utility_tunnel_safety_manual-with-ehls-changes-rmade-9-19.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">UH Utility Tunnel Safety Manual (PDF)</Link>.
        </p>

        <h4 id="uh-gallery-heading" className="text-xl font-semibold text-gray-800 mb-4 mt-8 text-center">Central Plant & Infrastructure Gallery</h4>
        <div className="overflow-x-auto py-4 bg-gray-800 rounded-lg shadow-inner border border-gray-700" ref={galleryContainerRef}> {/* Container for horizontal scrolling with underground vibe */}
          <div className="flex space-x-6 px-4"> {/* Flex container for images with spacing */}
            {/* Array of image paths */}
            {imagePaths.map((imagePath, index) => (
              <div
                key={index}
                ref={el => { imageRefs.current[index] = el; }}
                className={`flex-shrink-0 w-80 transition-opacity duration-1000 ${imageVisibility[index] ? 'opacity-100' : 'opacity-0'}`} // Add transition and opacity classes
              > {/* Wrapper for each image, adjust width */}
                <Image
                  src={imagePath}
                  alt={`UH Tunnel Gallery Image ${index + 1}`}
                  width={400} // Adjust size
                  height={300} // Adjust size
                  className="rounded-md shadow-lg object-cover w-full h-auto border border-gray-600" // Adjust classes and add border
                />
              </div>
            ))}
          </div>
        </div>

        <h3 id="uh-proposal" className="text-2xl font-semibold text-gray-800 mb-3 mt-8">Proposed UH Microgrid</h3>
        <p className="mb-4 text-gray-700">
          There is significant potential for UH to develop its own microgrid to enhance resilience, sustainability, and educational opportunities. Drawing inspiration from neighbors like Rice University (which uses a CHP plant and solar), a hypothetical UH microgrid could incorporate several key technologies:
        </p>
        <ul className="list-disc list-inside mb-4 text-gray-700">
          <li className="mb-1"><strong>Solar Power:</strong> Leveraging ample rooftop space and parking structures for large-scale solar panel installations (potentially 10-15 MW capacity).</li>
          <li className="mb-1"><strong>Combined Heat and Power (CHP):</strong> Utilizing the existing steam and chilled water infrastructure by integrating natural gas turbines to generate electricity alongside thermal energy (potentially 10-15 MW capacity). CHP systems offer high efficiency (around 80% compared to ~50% for separate generation).</li>
          <li className="mb-1"><strong>Battery Storage:</strong> Installing lithium-ion batteries to store excess solar energy, manage peak demand, and provide critical backup power during islanding.</li>
          <li><strong>Advanced Controls:</strong> Implementing smart controllers, load management systems, and demand response capabilities to optimize energy use and ensure stability.</li>
        </ul>
        <p className="mb-4 text-gray-700">
          <strong>Benefits:</strong> Such a system would significantly improve energy resilience against grid outages (vital during hurricanes or freezes), reduce carbon emissions (especially with high solar penetration), potentially lower long-term energy costs (Rice reports ~$2M annual savings), and create invaluable research and learning opportunities for students in engineering and energy fields. The campus could even serve as a community resilience hub during emergencies.
        </p>
        <p className="mb-4 text-gray-700">
          <strong>Challenges:</strong> The primary hurdle is the substantial upfront capital cost (estimated $20-$50 million), requiring careful financial planning and likely leveraging grants, partnerships, or phased implementation. Regulatory complexities with ERCOT and CenterPoint regarding interconnection and islanding would need resolution. Ongoing maintenance and cybersecurity are also critical considerations. A pilot project, perhaps at the Technology Bridge campus, could be a feasible first step.
        </p>
      </div>
    </section>
  );
};

export default UHFocusSection;