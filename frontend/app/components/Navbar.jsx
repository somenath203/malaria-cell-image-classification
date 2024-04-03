import Link from 'next/link';

const Navbar = () => {
  return (
    <>
      <nav className="bg-white border-gray-200">
        <div className="max-w-screen-xl flex flex-col lg:flex-row items-center justify-between mx-auto p-4 py-6">
          <a className="flex items-center space-x-3 rtl:space-x-reverse">
            <i className="fa-solid fa-hand-holding-droplet text-3xl text-blue-500"></i>
            <span className="self-center text-xl lg:text-2xl font-semibold whitespace-nowrap">
              Malaria Cell Detect
            </span>
          </a>

          <div className="w-auto text-center">
            <ul className="font-medium flex gap-4 p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
              <li>
                <Link
                  href="/pages/about"
                  className="hover:text-blue-500 transition-all duration-10"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/pages/predict"
                  className="hover:text-blue-500 transition-all duration-100"
                >
                  Predict
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
