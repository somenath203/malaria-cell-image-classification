'use client';
import { useDropzone } from 'react-dropzone';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import Loader from './../../components/Loader';
import { setPredResult } from './../../redux/predictedResultSlice';
import { setImage } from './../../redux/imageSlice';

const Page = () => {
  const [loading, setLoading] = useState();

  const dispatch = useDispatch();

  const router = useRouter();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      try {
        setLoading(true);

        const formData = new FormData();

        formData.append('fileUploadedByUser', acceptedFiles[0]);

        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_FASTAPI_URL}/predict`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        dispatch(setPredResult(data?.predicted_result));
        dispatch(setImage(URL.createObjectURL(acceptedFiles[0])));

        setLoading(false);

        router.push('/pages/result');

        toast.success('Your prediction has been made successfully', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'light',
        });
        
      } catch (error) {
        setLoading(false);

        toast.error('Something went wrong!! Please try after sometime', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'light',
        });

        console.log(error);
      }
    },
    onDropRejected: () => {
      toast.error('Multiple files are not allowed', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
    },
  });

  return (
    <>
      {loading && <Loader />}

      <section>
        <div className="container mx-auto flex px-5 py-16 lg:py-24 items-center justify-center flex-col bg-gradient-to-b from-blue-50 to-white">
          <div
            className={`w-11/12 lg:w-8/12 p-10 lg:p-24 mt-10 py-24 border-blue-500 border-dotted rounded-3xl border-2 bg-blue-100 flex items-center justify-center hover:cursor-pointer ${
              isDragActive ? 'border-blue-900 bg-blue-200' : 'border-blue-600'
            }`}
            {...getRootProps()}
          >
            <input {...getInputProps()} />

            <p className="text-gray-800 tracking-wider flex flex-col justify-center items-center gap-3 text-center">
              <span>
                <i className="fa-solid fa-cloud-arrow-up text-5xl text-blue-500"></i>
              </span>
              <span className="text-sm lg:text-lg tracking-wide">
                drop your cell image or click here to upload
              </span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
