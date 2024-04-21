'use client';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { saveAs } from 'file-saver';
import {
  pdf,
  Document,
  Page,
  Text,
  View,
  Image as ImageOfPDF,
} from '@react-pdf/renderer';
import { createTw } from 'react-pdf-tailwind';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import axios from 'axios';
import { toast } from 'react-toastify';

import Loader from './../../components/Loader';

const Pagee = () => {
  const { predResultData } = useSelector((state) => state?.predResultLoad);

  const { imageData } = useSelector((state) => state?.imageLoad);

  const [isDownloading, setIsDownloading] = useState(false);
  const [isPaymentDone, setIsPaymentDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const tw = createTw({
    theme: {},
  });

  const makePayment = async () => {
    try {
      onClose();

      const amount = 5000;
      const currency = 'INR';
      const receiptId = '12345678';

      setLoading(true);

      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_NODEJS_URL}/order`, {
        amount: amount,
        currency: currency,
        receipt: receiptId,
      });

      setLoading(false);

      const optionsForRazorpayPopup = {
        key: '',
        amount: amount,
        currency: currency,
        name: 'Malaria Cell Detect',
        description: 'Malaria Cell Detect Full Report Payment',
        order_id: data?.id,
        handler: async (response) => {
          const razorpay_order_id = response?.razorpay_order_id;
          const razorpay_payment_id = response?.razorpay_payment_id;
          const razorpay_signature = response?.razorpay_signature;

          setLoading(true);

          await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_NODEJS_URL}/validate-transaction`, {
            razorpay_order_id: razorpay_order_id,
            razorpay_payment_id: razorpay_payment_id,
            razorpay_signature: razorpay_signature,
          });

          setLoading(false);

          setIsPaymentDone(true);

          toast.success('payment has been done successfully', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'light',
          });
        },
      };

      const instanceOfRazorpay = new Razorpay(optionsForRazorpayPopup);

      instanceOfRazorpay.on('payment.failed', (response) => {
        alert(response.error.code);
      });

      instanceOfRazorpay.open();

      e.preventDefault();
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  };

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
                <Text style={tw('text-center')}>
                  No cure is required as the cell is un-infected.
                </Text>
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

      {loading && <Loader />}

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
                  <p className="text-2xl mt-4 tracking-wide px-8 text-center">
                    The full report of the predicted result is  
                    <span className="text-blue-600 font-semibold ml-2">
                       ready.
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-6">
                {isDownloading ? (
                  <p className="text-xl flex items-center justify-center gap-2">
                    {' '}
                    <i className="fa-solid fa-spinner text-blue-500 text-3xl animate-spin duration-100"></i>{' '}
                    <span>Downloading Report</span>{' '}
                  </p>
                ) : (
                  <>
                    {!isPaymentDone ? (
                      <button
                        onClick={onOpen}
                        className="flex items-center flex-col lg:flex-row justify-center gap-2 text-white bg-blue-500 border-0 py-4 px-8 focus:outline-none hover:bg-blue-600 text-xl tracking-wider rounded-lg shadow-lg"
                      >
                        <i className="fa-solid fa-lock text-2xl"></i>{' '}
                        <span>Download Full Report</span>
                      </button>
                    ) : (
                      <button
                        onClick={downloadReportPdf}
                        className="flex items-center justify-center gap-2 text-white bg-green-500 border-0 py-4 px-8 focus:outline-none hover:bg-green-600 text-xl tracking-wider rounded-lg shadow-lg"
                      >
                        <span>Download Full Report</span>
                      </button>
                    )}
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Full Report Download</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            In order to download the full report, you need to make a payment of
            Rs.50. Are you willing to pay?
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={makePayment}>
              Pay Now
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Pagee;
