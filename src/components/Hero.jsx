import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  useEffect(() => {});
  return (
    <section className="flex flex-col justify-center items-center bg-green-1000 p-4 md:p-8 lg:p-12">
      <div className="flex flex-col justify-center items-center text-center">
        <div className="text-5xl md:text-7xl lg:text-9xl font-black text-off-white animate-trek-text">
          TREKKING
        </div>
        <div className="text-5xl md:text-7xl lg:text-9xl font-black text-neon-100 animate-future-text mt-2 md:mt-4">
          THE FUTURE
        </div>
        <div className="hero-image flex flex-col justify-top items-center mt-4 md:mt-8 lg:mt-12">
          <div className="flex flex-col justify-top items-center animate-future-text">
            <div className="w-full md:w-[600px] lg:w-[800px] text-center text-off-white mt-4 md:mt-6 lg:mt-8 px-4">
              Join Info Trek for captivating tech events! Whether you love
              coding, design, or networking, we’ve got something exciting
              waiting for you.
            </div>
            <Link
              to="/events"
              className="no-underline text-center mt-4 md:mt-6 lg:mt-8 text-green-1000"
            >
              <div className="rounded-md py-3 px-4 bg-neon-100 hover:bg-neon-80">
                <p className="text-black font-bold m-0">SEE EVENTS</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
