import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  useEffect(() => {});
  return (
    <section className="flex flex-column justify-center items-center bg-green-1000">
      <div className="flex flex-column justify-center items-center">
        <div className="text-9xl font-black text-off-white animate-trek-text">
          TREKKING
        </div>
        <div className="text-9xl font-black text-neon-100 animate-future-text">
          THE FUTURE
        </div>
        <div className="hero-image flex flex-column justify-top items-center">
          <div className="flex flex-column justify-top items-center animate-future-text">
            <div className="w-[400px] text-center text-off-white mt-4">
              Join Info Trek for captivating tech events! Whether you love
              coding, design, or networking, we’ve got something exciting
              waiting for you.
            </div>
            <Link className="no-underline text-center mt-4 text-green-1000">
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
