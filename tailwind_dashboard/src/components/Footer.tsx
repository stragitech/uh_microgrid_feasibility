import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-yellow-100 text-center py-6 mt-8">
      <p></p>
      <p>
        <Link href="https://github.com/stragitech/uh_microgrid_feasibility" target="_blank" rel="noopener noreferrer" className="text-yellow-100 underline">
          LEARN MORE ABOUT THIS OPEN SOURCE PROJECT!
        </Link>
      </p>
    </footer>
  );
};

export default Footer;