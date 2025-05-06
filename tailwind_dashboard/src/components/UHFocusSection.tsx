import Image from 'next/image';
import Link from 'next/link';

const UHFocusSection = () => {
  return (
    <section id="uh-focus" className="py-12 px-4 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-red-700 mb-4">Focus: University of Houston Energy</h2>

        <h3 id="uh-current" className="text-2xl font-semibold text-gray-800 mb-3 mt-8">Current UH Energy System: The Central Plant</h3>
        <p className="mb-4 text-gray-700">
          The University of Houston's campus operations rely heavily on its Central Plant facility. This plant distributes essential utilities like electricity, chilled water (for cooling), and steam (for heating and other processes) throughout the campus via an extensive network of underground tunnels (approximately 3 miles long). While the plant manages internal distribution, UH currently receives all its electricity from the external Texas grid (ERCOT), supplied via CenterPoint Energy.
        </p>
        <p className="mb-4 text-gray-700">
          The plant has significant capacity, generating about 18,000 tons of chilled water and managing a peak electrical demand around 33 MW. Expansions over the years have added chillers, boilers, and cooling towers. UH has also incorporated some sustainability measures, including 88 rooftop solar panels on the plant itself (powering low-voltage equipment) and automated systems for energy balancing. However, the campus remains fully dependent on the external grid for its primary power supply.
        </p>
        <p className="mb-4 text-gray-700">
          You can learn more about the utility tunnel system in the <Link href="https://uh.edu/facilities-services/programs/facilities%20services%20safety%20program%20/ehls-final-utility_tunnel_safety_manual-with-ehls-changes-rmade-9-19.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">UH Utility Tunnel Safety Manual (PDF)</Link>.
        </p>

        <h4 id="uh-gallery-heading" className="text-xl font-semibold text-gray-800 mb-4 mt-8 text-center">Central Plant & Infrastructure Gallery</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-screen-lg mx-auto">
          <Image src="/images/uh_central_plant_and_tunnels/flooded_tunnel_1.jpeg" alt="Flooded section of a UH tunnel" width={300} height={200} className="w-full h-auto object-cover rounded-md shadow-md" />
          <Image src="/images/uh_central_plant_and_tunnels/light_tunnel.jpeg" alt="Well-lit section of a UH tunnel" width={300} height={200} className="w-full h-auto object-cover rounded-md shadow-md" />
          <Image src="/images/uh_central_plant_and_tunnels/nighttime_uh.jpeg" alt="Nighttime view of UH campus area" width={300} height={200} className="w-full h-auto object-cover rounded-md shadow-md" />
          <Image src="/images/uh_central_plant_and_tunnels/pipes_and_wires.jpeg" alt="View inside UH tunnel showing pipes and wires" width={300} height={200} className="w-full h-auto object-cover rounded-md shadow-md" />
          <Image src="/images/uh_central_plant_and_tunnels/shasta_in_the_tunnel.jpeg" alt="Shasta mascot graphic inside a UH tunnel" width={300} height={200} className="w-full h-auto object-cover rounded-md shadow-md" />
          <Image src="/images/uh_central_plant_and_tunnels/something_with_a_pipe.jpeg" alt="UH tunnel infrastructure including a large pipe" width={300} height={200} className="w-full h-auto object-cover rounded-md shadow-md" />
          <Image src="/images/uh_central_plant_and_tunnels/tube_room.jpeg" alt="Room with tube-like structures, possibly part of the tunnel system" width={300} height={200} className="w-full h-auto object-cover rounded-md shadow-md" />
          <Image src="/images/uh_central_plant_and_tunnels/tunnel_1.jpeg" alt="General view inside a UH utility tunnel" width={300} height={200} className="w-full h-auto object-cover rounded-md shadow-md" />
          <Image src="/images/uh_central_plant_and_tunnels/tunnel_cage.jpeg" alt="Caged-off area within a UH tunnel" width={300} height={200} className="w-full h-auto object-cover rounded-md shadow-md" />
          <Image src="/images/uh_central_plant_and_tunnels/tunnel_elbows.jpeg" alt="Section of UH tunnel showing pipe elbows" width={300} height={200} className="w-full h-auto object-cover rounded-md shadow-md" />
          <Image src="/images/uh_central_plant_and_tunnels/uh_history_poster_in_tunnel.jpeg" alt="UH history poster displayed inside a tunnel" width={300} height={200} className="w-full h-auto object-cover rounded-md shadow-md" />
          <Image src="/images/uh_central_plant_and_tunnels/underground_control_room.jpeg" alt="Underground control room associated with UH infrastructure" width={300} height={200} className="w-full h-auto object-cover rounded-md shadow-md" />
          <Image src="/images/uh_central_plant_and_tunnels/vault_door.jpeg" alt="Heavy vault door within the UH tunnel system" width={300} height={200} className="w-full h-auto object-cover rounded-md shadow-md" />
          <Image src="/images/uh_central_plant_and_tunnels/vertical_pipes.jpeg" alt="Vertical pipes running inside a UH tunnel" width={300} height={200} className="w-full h-auto object-cover rounded-md shadow-md" />
          <Image src="/images/uh_central_plant_and_tunnels/underground.png" alt="UH logo and Facilities" width={300} height={200} className="w-full h-auto object-cover rounded-md shadow-md" />
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