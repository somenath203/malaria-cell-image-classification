'use client';
import { useDropzone } from 'react-dropzone';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

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
          `http://127.0.0.1:8000/predict`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        setLoading(false);

        dispatch(setPredResult(data?.predicted_result));
        dispatch(setImage(URL.createObjectURL(acceptedFiles[0])))

        router.push('/pages/result');

      } catch (error) {

        setLoading(false);

        alert('something went wrong');

        console.log(error);
      }
    },
    onDropRejected: () => {
      // toast.error("Multiple photos are not allowed");
      alert('multiple files are not allowed');
    },
  });

  return (
    <>

      {loading && <Loader />}

      <section>
        <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <div
            className={`w-8/12 p-20 mt-10 py-24 border-blue-500 border-dotted rounded-3xl border-2 bg-blue-50 flex items-center justify-center hover:cursor-pointer ${
              isDragActive ? 'border-blue-900 bg-blue-200' : 'border-blue-600'
            }`}
            {...getRootProps()}
          >
            <input {...getInputProps()} />

            <p className="text-gray-800 tracking-wider flex flex-col justify-center items-center gap-3 text-center">
              <span>
                <i className="fa-solid fa-cloud-arrow-up text-5xl text-blue-500"></i>
              </span>
              <span className="text-lg tracking-wide">
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
