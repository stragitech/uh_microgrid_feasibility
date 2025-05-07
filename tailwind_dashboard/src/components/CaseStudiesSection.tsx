'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CaseStudiesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef(null);

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
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    const currentRef = sectionRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Case study data
  const caseStudies = [
    {
      id: 'srjc',
      title: 'SRJC Microgrid',
      location: 'Santa Rosa Junior College, California',
      image: '/images/case_studies/SRJC.png',
      overview: 'SRJC built a sophisticated solar-powered microgrid on its Petaluma campus designed to keep operations running during wildfire season and statewide blackouts. The system integrates solar panels, advanced battery storage systems, and intelligent control technology.',
      strengths: [
        {
          title: 'Emergency Resilience',
          description: 'When PG&E implemented Public Safety Power Shutdowns during fire threats, SRJC\'s Petaluma campus remained operational, serving as a safe haven for students and faculty.'
        },
        {
          title: 'Green Power Generation',
          description: 'The system\'s solar panels and battery storage not only enhance campus energy independence but also support California\'s clean energy goals by reducing carbon emissions.'
        },
        {
          title: 'Educational Resource',
          description: 'Students gain hands-on experience with renewable energy systems through the microgrid, which serves as both a teaching tool and a model for similar institutions.'
        },
        {
          title: 'Cost Effective',
          description: 'The project delivers significant energy cost savings while providing greater energy security, demonstrating that resilience and economic benefits can go hand-in-hand.'
        }
      ],
      challenges: [],
      texasLessons: 'This microgrid model is ideally suited for rural or semi-rural areas in Texas prone to weather-related outages. Community facilities like schools, libraries, and municipal buildings could adopt similar systems to provide essential services during emergencies while advancing sustainability goals.',
      links: [
        {
          text: 'SRJC Sustainability',
          url: 'https://sustainability.santarosa.edu/srjc-micro-grid'
        }
      ]
    },
    {
      id: 'utaustin',
      title: 'UT Austin Microgrid',
      location: 'University of Texas at Austin, Texas',
      image: '/images/case_studies/UT.png',
      overview: 'UT Austin operates a comprehensive, utility-grade energy system powering its entire 20-million-square-foot campus. This sophisticated microgrid features a Combined Heat and Power (CHP) plant, thermal energy storage, chilled water systems, rooftop solar installations, and smart metering infrastructure. While initially built around natural gas generation, the system has evolved to become one of the greenest microgrids in the United States.',
      strengths: [
        {
          title: 'Zero Unplanned Outages',
          description: 'During 2021\'s Winter Storm Uri, when much of Texas experienced devastating power failures, the UT microgrid maintained operations, providing critical heating, electricity, and water when the surrounding city went dark.'
        },
        {
          title: 'Green Energy Integration',
          description: 'The university has progressively incorporated rooftop solar generation and thermal energy storage, significantly reducing greenhouse gas emissions. UT has committed to carbon neutrality and continues to phase in renewable energy sources annually.'
        },
        {
          title: 'Efficient Design Philosophy',
          description: 'The system captures waste heat from electricity generation and repurposes it for water and building heating, creating a virtuous cycle that both reduces costs and minimizes environmental impact.'
        },
        {
          title: 'Resilient Architecture',
          description: 'The microgrid\'s sophisticated design includes redundant systems and islanding capabilities that allow it to disconnect from the main grid during disturbances without service interruption.'
        }
      ],
      challenges: [],
      texasLessons: 'UT Austin demonstrates that large-scale microgrids can achieve both sustainability and exceptional reliability. This model could be adapted for Texas hospitals, municipal complexes, and industrial parks – combining solar generation, battery storage, and intelligent energy management to ensure operations during grid failures while advancing clean energy goals.',
      links: [
        {
          text: 'UT Austin Case Study (PDF)',
          url: 'https://peer.gbci.org/sites/default/files/resources/UT-Austin-Case-Study.pdf'
        },
        {
          text: 'More on UT Power Plant',
          url: 'https://law.utexas.edu/transnational/events/field-trip-ut-power-plant/'
        }
      ]
    },
    {
      id: 'bronxzoo',
      title: 'Bronx Zoo Microgrid',
      location: 'New York City, New York',
      image: '/images/case_studies/zoo.png',
      overview: 'The Bronx Zoo implemented a green microgrid incorporating solar panels, battery systems, and fuel cells to reduce its carbon footprint while ensuring reliable power for sensitive animal habitats. This initiative aligned with the zoo\'s conservation mission and aimed to improve energy efficiency while demonstrating environmental leadership.',
      strengths: [
        {
          title: 'Environmental Innovation',
          description: 'The zoo utilized clean energy technologies to minimize its environmental impact, reinforcing its conservation mission and commitment to sustainability.'
        },
        {
          title: 'Operational Cost Reduction',
          description: 'Solar generation and fuel cells helped lower utility expenses and reduced dependence on New York City\'s congested power grid.'
        },
        {
          title: 'Critical Systems Protection',
          description: 'The microgrid maintained power to animal habitats and essential life-support systems during grid disruptions, protecting vulnerable species.'
        }
      ],
      challenges: [
        {
          title: 'Limited Storage Capacity',
          description: 'Battery limitations meant power could only be sustained for a few hours during extended blackouts, revealing the need for more robust storage solutions.'
        },
        {
          title: 'Maintenance Complexity',
          description: 'Some technologies, particularly fuel cells, required frequent maintenance and specialized technical expertise, creating operational challenges.'
        },
        {
          title: 'Public Perception Issues',
          description: 'The facility was widely perceived as fully self-sufficient, though it still relied significantly on the main grid during peak demand periods.'
        }
      ],
      texasLessons: 'The Bronx Zoo case highlights the importance of balancing innovative green technology with practical reliability considerations. Texas facilities with critical power needs – such as zoos, aquariums, and research centers – should ensure sufficient backup capacity and prioritize maintainable designs that can function in real-world conditions.',
      links: [
        {
          text: 'Bronx Zoo Energy Overhaul',
          url: 'https://www.facilitiesdive.com/news/bronx-zoos-energy-overhaul-promises-nearly-500k-in-annual-cost-savings-n/716823/'
        },
        {
          text: 'Waste Heat Project Info',
          url: 'https://amny.com/sponsored/con-edison-and-bronx-zoos-waste-heat-project/'
        }
      ]
    }
  ];

  // Combined Texas lessons
  const combinedTexasLessons = [
    {
      title: "Blend Green Technology with Reliability",
      description: "While clean energy is the ultimate goal, Texas microgrids must incorporate adequate battery storage and backup generation to maintain operations during extended emergencies. UT Austin's success during Winter Storm Uri demonstrates the importance of designing for extreme conditions."
    },
    {
      title: "Prioritize Community Infrastructure",
      description: "Schools, hospitals, emergency shelters, and public buildings should be first in line for microgrid implementation. These facilities, like SRJC's campus, provide the greatest community benefit during crises when conventional power fails."
    },
    {
      title: "Design for Maintainability",
      description: "The Bronx Zoo's challenges with complex systems highlight the need for simpler, more easily maintained designs. Practical, robust solutions are often better suited for Texas communities than cutting-edge but maintenance-intensive technologies."
    },
    {
      title: "Capture Multiple Benefits",
      description: "The most successful microgrids, like UT Austin's, deliver multiple advantages: energy independence, cost savings, environmental benefits, and educational opportunities. Texas implementations should be designed to maximize these co-benefits."
    },
    {
      title: "Start Small, Scale Intelligently",
      description: "Communities can begin with targeted microgrids serving critical facilities and expand as technology matures and costs decrease. SRJC's focused approach demonstrates that even smaller systems can deliver significant resilience benefits."
    }
  ];

  return (
    <section
      id="case-studies"
      ref={sectionRef}
      className={`py-16 bg-gradient-to-b from-gray-50 to-gray-100 transition-all duration-600 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-red-700 mb-4">Case Studies: Microgrids in Action</h2>
        <p className="text-center max-w-3xl mx-auto mb-12 text-gray-600 text-lg">
          Examining real-world examples helps illustrate the capabilities and challenges of microgrids, 
          particularly in university and critical facility settings. These cases offer valuable lessons for 
          Texas resilience planning.
        </p>

        {/* Case Study Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {caseStudies.map((study, index) => (
            <div 
              key={study.id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl border border-gray-200"
            >
              {/* Image */}
              <div className="relative h-56 w-full bg-gray-200">
                <Image 
                  src={study.image} 
                  alt={`${study.title} microgrid`} 
                  fill
                  style={{objectFit: 'cover'}}
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
              
              {/* Content */}
              <div className="p-6 flex-grow">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-2xl font-bold text-red-700">{study.title}</h3>
                </div>
                <p className="text-gray-500 text-sm mb-4">{study.location}</p>
                <p className="text-gray-700 mb-6 italic">{study.overview}</p>
                
                {/* Strengths */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">
                    What Worked Well
                  </h4>
                  <ul className="space-y-3">
                    {study.strengths.map((strength, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="inline-flex items-center justify-center flex-shrink-0 w-6 h-6 mr-2 bg-green-100 rounded-full text-green-600">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </span>
                        <div>
                          <span className="font-medium text-gray-900">{strength.title}: </span>
                          <span className="text-gray-700">{strength.description}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Challenges - Only for Bronx Zoo */}
                {study.challenges.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">
                      Challenges Faced
                    </h4>
                    <ul className="space-y-3">
                      {study.challenges.map((challenge, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="inline-flex items-center justify-center flex-shrink-0 w-6 h-6 mr-2 bg-red-100 rounded-full text-red-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                          </span>
                          <div>
                            <span className="font-medium text-gray-900">{challenge.title}: </span>
                            <span className="text-gray-700">{challenge.description}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Texas Lessons */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">
                    What Texas Can Learn
                  </h4>
                  <p className="text-gray-700">{study.texasLessons}</p>
                </div>
              </div>
              
              {/* Links */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {study.links.map((link, idx) => (
                    <Link 
                      key={idx}
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      <span>{link.text}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Combined Texas Lessons Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-5xl mx-auto mt-16 mb-8">
          <div className="bg-red-700 px-8 py-6">
            <h3 className="text-3xl font-bold text-white">Key Lessons for Texas Microgrids</h3>
            <p className="text-red-100 mt-2">
              Combined insights from SRJC, UT Austin, and Bronx Zoo case studies
            </p>
          </div>
          
          <div className="p-8">
            <div className="grid gap-6 md:grid-cols-2">
              {combinedTexasLessons.map((lesson, idx) => (
                <div 
                  key={idx} 
                  className="bg-gray-50 p-6 rounded-lg border-l-4 border-red-600 shadow-sm"
                >
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">{lesson.title}</h4>
                  <p className="text-gray-700">{lesson.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Conclusion</h4>
              <p className="text-gray-700">
                Texas has a unique opportunity to lead in reliable, sustainable energy with strategic microgrid implementation. 
                From SRJC's simple but effective solar configuration to UT Austin's sophisticated and resilient campus system, 
                these real-world examples provide a roadmap for Texas communities seeking energy security. The future lies not just 
                in surviving extreme weather events, but in building energy systems that simultaneously protect people, reduce costs, 
                and advance environmental goals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;