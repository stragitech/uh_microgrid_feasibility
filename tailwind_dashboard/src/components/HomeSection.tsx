'use client';
import { useState, useEffect, useRef } from 'react';

const HomeSection = () => {
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
      id="home"
      ref={sectionRef}
      className={`py-12 px-4 bg-gray-100 transition-all duration-600 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-red-700 mb-4">Welcome to the UH Microgrid Educational Platform</h1>
        <p className="mb-4">
          Technology today is moving faster than ever, changing the way we live, work, and power our communities. Instead of relying solely on large, centralized power grids, there&apos;s a growing focus on smaller, smarter, local energy solutions. This website explores Microgrids as a promising solution.
        </p>
        <p>
          Here, you&apos;ll find comprehensive information about microgrid technology – what it is, why it&apos;s useful, its key components, and how it&apos;s being implemented in the real world. We&apos;ll look at examples from leading universities and other institutions, dive into the specifics of the University of Houston&apos;s energy system and microgrid potential, and discuss the funding and policies shaping the future of resilient energy.
        </p>
      </div>
    </section>
  );
};

export default HomeSection;