
const Footer = () => {
  return (
    <footer className="bg-[#09090B] border-t border-white/10 py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">

        <h2 className="text-xl font-bold text-white">
          MOVIE<span className="text-purple-500">mela</span>
        </h2>

        <p className="text-gray-400 text-sm text-center">
          © 2026 MOVIEmela. All rights reserved.
        </p>

        <p className="text-gray-400 text-sm">
          Made with ❤️ for Movie Lovers
        </p>

      </div>
    </footer>
  );
};

export default Footer;

