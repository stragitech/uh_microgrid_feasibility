import Link from 'next/link';

const CaseStudiesSection = () => {
  return (
    <section id="case-studies" className="py-12 px-4 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-red-700 mb-4">Case Studies: Microgrids in Action</h2>
        <p className="text-center max-w-3xl mx-auto mb-8 text-gray-600">Examining real-world examples helps illustrate the capabilities and challenges of microgrids, particularly in university and critical facility settings. These cases offer valuable lessons for resilience planning.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-xl mx-auto">
          {/* Case Study 1: SRJC */}
          <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm flex flex-col">
            <h3 className="text-xl font-semibold text-red-700 mb-3">SRJC Microgrid (Santa Rosa Junior College, CA)</h3>
            <p className="italic text-gray-600 mb-4 flex-grow">SRJC built a solar-powered microgrid on its Petaluma campus to stay open during wildfire season and statewide blackouts. It uses solar panels, battery storage, and smart controls.</p>

            <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2 border-b border-gray-200 pb-1">Why It Worked Well:</h4>
            <ul className="list-disc list-inside mb-4 text-gray-700">
              <li className="mb-1"><strong>Emergency Resilience:</strong> Stayed open during PG&E power shutdowns, serving as a safe place.</li>
              <li className="mb-1"><strong>Green Power:</strong> Solar panels and batteries enhance energy independence and cleanliness.</li>
              <li><strong>Education & Outreach:</strong> Provides learning opportunities and serves as a community model.</li>
            </ul>

            <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2 border-b border-gray-200 pb-1">What Texas Can Learn:</h4>
            <p className="mb-4 text-gray-700">Ideal for rural/semi-rural areas prone to outages. Schools, libraries, or city halls could use similar models for community support during emergencies.</p>
            <Link href="https://sustainability.santarosa.edu/srjc-micro-grid" target="_blank" rel="noopener noreferrer" className="inline-block mt-2 mr-2 text-blue-600 hover:underline text-sm font-medium">Learn More (SRJC Sustainability)</Link>
          </div>

          {/* Case Study 2: UT Austin */}
          <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm flex flex-col">
            <h3 className="text-xl font-semibold text-red-700 mb-3">UT Austin Microgrid (University of Texas at Austin, TX)</h3>
            <p className="italic text-gray-600 mb-4 flex-grow">UT Austin runs a self-contained, utility-grade energy system powering its campus with a Combined Heat and Power (CHP) plant, chilled water systems, solar panels, and smart meters. It's a leader in green microgrid technology.</p>

            <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2 border-b border-gray-200 pb-1">Why It's So Successful & Green:</h4>
            <ul className="list-disc list-inside mb-4 text-gray-700">
              <li className="mb-1"><strong>Zero Unplanned Outages:</strong> Remained operational during Winter Storm Uri, providing essential services.</li>
              <li className="mb-1"><strong>Green Energy Push:</strong> Incorporates rooftop solar and thermal storage, committed to carbon neutrality.</li>
              <li><strong>Efficient Design:</strong> Captures and reuses waste heat, saving money and cutting emissions.</li>
            </ul>

            <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2 border-b border-gray-200 pb-1">What Texas Can Learn:</h4>
            <p className="mb-4 text-gray-700">Demonstrates that large-scale systems can be sustainable and resilient. Applicable to hospitals, city campuses, and industrial parks, combining renewables and smart energy reuse.</p>
            <Link href="https://peer.gbci.org/sites/default/files/resources/UT-Austin-Case-Study.pdf" target="_blank" rel="noopener noreferrer" className="inline-block mt-2 mr-2 text-blue-600 hover:underline text-sm font-medium">UT Austin Case Study (PDF)</Link>
            <Link href="https://law.utexas.edu/transnational/events/field-trip-ut-power-plant/" target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-blue-600 hover:underline text-sm font-medium">More on UT Power Plant</Link>
          </div>

          {/* Case Study 3: Bronx Zoo */}
          <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm flex flex-col">
            <h3 className="text-xl font-semibold text-red-700 mb-3">Bronx Zoo Microgrid (New York City, NY)</h3>
            <p className="italic text-gray-600 mb-4 flex-grow">The Bronx Zoo installed a green microgrid (solar, batteries, fuel cells) to lower its carbon footprint and ensure power for sensitive animal habitats.</p>

            <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2 border-b border-gray-200 pb-1">What Went Right:</h4>
            <ul className="list-disc list-inside mb-4 text-gray-700">
              <li className="mb-1"><strong>Green Innovation:</strong> Used clean energy sources aligned with its conservation mission.</li>
              <li className="mb-1"><strong>Energy Cost Savings:</strong> Lowered utility bills and reduced grid reliance.</li>
              <li><strong>Backup Power:</strong> Maintained critical animal habitats during outages.</li>
            </ul>

            <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2 border-b border-gray-200 pb-1">Challenges / What Went Wrong:</h4>
            <ul className="list-disc list-inside mb-4 text-gray-700">
              <li className="mb-1"><strong>Limited Storage:</strong> Battery capacity insufficient for longer blackouts.</li>
              <li className="mb-1"><strong>High Maintenance:</strong> Fuel cells required frequent, skilled upkeep.</li>
              <li><strong>Public Misunderstanding:</strong> Perception of full self-sufficiency vs. reality of grid reliance.</li>
            </ul>

            <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2 border-b border-gray-200 pb-1">What Texas Can Learn:</h4>
            <p className="mb-4 text-gray-700">Highlights the need to balance green tech with reliability (sufficient storage/backup). Crucial for facilities like zoos or research centers that cannot afford power loss. Simple, maintainable designs are often better.</p>
            <Link href="https://www.facilitiesdive.com/news/bronx-zoos-energy-overhaul-promises-nearly-500k-in-annual-cost-savings-n/716823/" target="_blank" rel="noopener noreferrer" className="inline-block mt-2 mr-2 text-blue-600 hover:underline text-sm font-medium">Bronx Zoo Energy Overhaul</Link>
            <Link href="https://www.amny.com/sponsored/con-edison-and-bronx-zoos-waste-heat-project/" target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-blue-600 hover:underline text-sm font-medium">Waste Heat Project Info</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;