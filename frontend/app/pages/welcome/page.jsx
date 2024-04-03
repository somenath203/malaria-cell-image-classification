import Link from 'next/link';

import MalariaCell from './../../assets/malariacellimg.jpg';
import Image from 'next/image';


const Page = () => {
  return (
    <>
      <section className="text-gray-600 body-font bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <Image
            className="mb-10 object-cover object-center rounded-full shadow-lg w-56"
            alt="malariacellimage"
            src={MalariaCell}
          />
          <div className="text-center lg:w-2/3 w-full">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Malaria Cell Detector
            </h1>
            <p className="mb-8 leading-relaxed">
              It is an AI tool which analyze cellular images, determining
              whether they exhibit signs of malaria infection or not.
            </p>
            <div className="flex justify-center">
              <Link href='/pages/predict'>
                <button className="inline-flex text-white bg-blue-500 border-0 py-4 px-16 focus:outline-none hover:bg-blue-600 text-xl tracking-wider rounded-lg shadow-lg">
                  GET STARTED
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
