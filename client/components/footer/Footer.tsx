const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center text-center text-white py-8 bg-gradient-to-r from-blue-500 to-purple-600 p-8">
      <p className="mb-4">&copy; 2024 Stream-Roll. All rights reserved.</p>
      <div className="flex space-x-4">
        <a href="#" className="hover:text-gray-300 transition duration-300">
          Privacy Policy
        </a>
        <a href="#" className="hover:text-gray-300 transition duration-300">
          Terms of Service
        </a>
        <a href="#" className="hover:text-gray-300 transition duration-300">
          Contact Us
        </a>
      </div>
    </footer>
  );
};

export default Footer;