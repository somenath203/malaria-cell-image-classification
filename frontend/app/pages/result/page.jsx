'use client';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { v4 as uuidv4 } from 'uuid';

const Page = () => {

  const { predResultData } = useSelector((state) => state?.predResultLoad);
  const { imageData } = useSelector((state) => state?.imageLoad);

  const resultPrintRef = useRef();

  return (
    <>
      <section>
        <div className="container mx-auto flex py-16 items-center justify-center flex-col gap-6  bg-gradient-to-b from-blue-50 to-white">
          {!predResultData && !imageData && (
            <>
              <p className="text-3xl tracking-wide uppercase">
                No Result to display
              </p>
            </>
          )}

          {predResultData && imageData && (
            <>
              <div className="container mx-auto flex items-center justify-center flex-col gap-6" ref={resultPrintRef}>
                <div>
                  <p className="text-2xl tracking-wider mb-5 font-medium">
                    Predicted Result
                  </p>
                </div>
                <div>
                  <Image
                    src={imageData}
                    width={200}
                    height={200}
                    className="rounded-xl shadow-xl border-8 border-blue-600"
                  />
                </div>
                <div>
                  <p className="text-2xl mt-4 tracking-wide">
                    The above imput image of the cell is{' '}
                    <span className="text-blue-600 font-semibold">
                      {predResultData}
                    </span>
                    .
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <ReactToPrint
                  trigger={() => (
                    <button className="inline-flex text-white bg-blue-500 border-0 py-4 px-8 focus:outline-none hover:bg-blue-600 text-xl tracking-wider rounded-lg shadow-lg">
                      Print the Result
                    </button>
                  )}
                  content={() => resultPrintRef.current}
                  documentTitle={uuidv4()}
                />
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Page;
