import Image from "next/image";
import Link from "next/link";
import Logo from "~/components/elements/logo";

const Maintenance = () => {
  return (
    <>
      <div className="h-screen flex items-center justify-center mb-10">
        <div className="container">
          <div className="space-y-5">
            <div className="max-w-xl mx-auto text-center">
              <div className="gap-2 mx-auto items-center flex justify-center">
                <Logo />
              </div>
              <h2 className="md:text-3xl text-2xl font-semibold text-gray-950 dark:text-white mt-5">
                We'll be back soon
              </h2>
              <p className="md:text-lg text-base font-semibold text-gray-500 dark:text-gray-200 mt-4">
                Unshackled is undergoing maintenance and will be back shortly.
              </p>
            </div>

            <div className="h-96 mx-auto items-center flex justify-center">
              <Image
                src="/maintainance.svg"
                width={500}
                height={500}
                alt="Unshackled Maintenance"
              />
            </div>

            <div className="max-w-xl mx-auto text-center">
              <p className="md:text-lg text-base font-semibold text-gray-500 dark:text-gray-200 mt-4">
                Thank you for your patience while we improve our services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Maintenance;