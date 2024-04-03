const Page = () => {
  return (
    <>
      <section className="text-gray-600 body-font bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col text-center gap-8">

          <p className="text-2xl tracking-wider">About</p>

          <p className="text-base tracking-wide lg:px-20 text-blue-600">
            Malaria Cell Detect is a web application that serves as a 
            tool for healthcare professionals, particularly doctors and medical
            specialists, to detect malaria in blood cells. The application
            utilizes CNN along with TensorFlow, a powerful open-source software
            library for machine learning. The primary function of Malaria Cell Detect is
            to analyze images of blood cells that users upload
            to the platform. Once an image is uploaded, the Alexnet Model
            processes the data, identifying patterns and characteristics
            indicative of malaria infection. Early
            detection of malaria is crucial, as it allows for timely
            intervention and treatment, significantly increasing the chances of
            recovery and reducing the risk of severe complications. This tool is
            particularly beneficial in regions where access to medical
            laboratories and specialized diagnostic tools may be limited. The
            user interface of Malaria Cell Detect is designed with simplicity in
            mind, ensuring ease of use for medical professionals of all levels
            of technical expertise. The straightforward user interface allows users to
            navigate the application effortlessly, focusing on the core
            functionality without unnecessary distractions.
          </p>
        </div>
      </section>
    </>
  );
};

export default Page;
