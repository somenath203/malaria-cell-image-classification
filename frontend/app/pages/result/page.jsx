'use client';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { saveAs } from 'file-saver';
import { pdf, Document, Page, Text, View, Image as ImageOfPDF } from '@react-pdf/renderer';
import { createTw } from 'react-pdf-tailwind';

const Pagee = () => {
  const { predResultData } = useSelector((state) => state?.predResultLoad);

  const { imageData } = useSelector((state) => state?.imageLoad);

  const [isDownloading, setIsDownloading] = useState(false);

  const tw = createTw({
    theme: {},
  });

  const downloadReportPdf = async () => {
    setIsDownloading(true);

    const content = (
      <Document>
        <Page size="A4">
          <View
            style={tw(
              'p-5 mt-10 flex flex-col items-center justify-center gap-2'
            )}
          >
            <Text style={tw('text-xl')}>Full Report</Text>
            <ImageOfPDF src={imageData} style={tw('w-40 mb-2')} />
            <Text style={tw('text-lg')}>
              Analysis:{' '}
              {predResultData === 'uninfected' ? (
                <>The uploaded image of the cell has no malaria.</>
              ) : (
                <>The uploaded image of the cell has malaria.</>
              )}
            </Text>
            <Text style={tw('text-lg')}>
              Cure of the disease:{' '}
              {predResultData === 'uninfected' ? (
                <Text style={tw('text-center')}>No cure is required as the cell is un-infected.</Text>
              ) : (
                <Text style={tw('text-center')}>
                  Malaria is a serious and sometimes fatal disease caused by a
                  parasite that commonly infects a certain type of mosquito
                  which feeds on humans. The primary treatment for malaria is
                  medication that aims to eliminate the infection in the body.
                  The specific type of medication and the length of treatment
                  depend on various factors such as the type of malaria
                  parasite, the severity of symptoms, the patient’s age, and
                  pregnancy status. Antimalarial drugs include Chloroquine
                  phosphate, which is effective against chloroquine-sensitive
                  strains of the parasite. However, due to widespread drug
                  resistance, Artemisinin-based combination therapies (ACTs) are
                  often used for chloroquine-resistant malaria. These therapies
                  combine drugs like artemether with lumefantrine or artesunate
                  with mefloquine to effectively combat the parasite. Other
                  drugs such as Atovaquone-proguanil, Quinine sulfate combined
                  with doxycycline, and Primaquine phosphate are also used in
                  certain cases.
                </Text>
              )}
            </Text>
          </View>
        </Page>
      </Document>
    );

    const blob = await pdf(content).toBlob();

    saveAs(blob, `${uuidv4()}.pdf`);

    setIsDownloading(false);
  };

  return (
    <>
      <section>
        <div className="container mx-auto flex py-16 text-center items-center justify-center flex-col gap-6  bg-gradient-to-b from-blue-50 to-white">
          {!predResultData && !imageData && (
            <>
              <p className="text-3xl tracking-wide uppercase">
                No Result to display
              </p>
            </>
          )}

          {predResultData && imageData && (
            <>
              <div className="container mx-auto text-center flex items-center justify-center flex-col gap-6">
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
                  <p className="text-2xl mt-4 tracking-wide px-8">
                    The above imput image of the cell is{' '}
                    <span className="text-blue-600 font-semibold">
                      {predResultData}
                    </span>
                    .
                  </p>
                </div>
              </div>
              <div className="mt-6">
                {isDownloading ? (
                  <p className='text-xl flex items-center justify-center gap-2'> <i className="fa-solid fa-spinner text-blue-500 text-3xl animate-spin duration-100"></i> <span>Downloading Report</span> </p>
                ) : (
                  <button
                    onClick={downloadReportPdf}
                    className="inline-flex text-white bg-blue-500 border-0 py-4 px-8 focus:outline-none hover:bg-blue-600 text-xl tracking-wider rounded-lg shadow-lg"
                  >
                    Download Full Report
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Pagee;
