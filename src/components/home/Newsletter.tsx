import { CiMail } from 'react-icons/ci';
import React from 'react';

const Newsletter: React.FC = () => {
  return (
    <div className="bg-primary-500 py-10 px-5 lg:px-10 text-white my-5 lg:my-10">
      <div className="mx-auto container">
        <div className="lg:flex items-center w-full justify-between gap-5 mx-auto">
          <div className="lg:flex items-center gap-4 w-full lg:w-1/2 text-center lg:text-left">
            <CiMail className="size-14 mx-auto" />
            <div>
              <h5 className="text-xl font-semibold">
                Join our newsletter and get 20% discount for your first order
              </h5>
              <p>
                Get E-mail updates about our latest shop and special offers.
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 mt-5 lg:mt-0">
            <form className="flex items-center">
              <input
                placeholder="Enter your email"
                type="email"
                className="text-white p-5 w-full rounded-l-md"
              />
              <button className="bg-black text-white p-5 rounded-r-2xl font-medium">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
