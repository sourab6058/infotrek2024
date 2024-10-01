import React, { useEffect } from "react";
import Nav from "../components/Nav";
import NET from "vanta/src/vanta.net";
import "./styles/TeamPage.css";
import TeamCard from "../components/TeamCard";
import { images } from "../assets/teammembers";

const team26 = [
  { name: "Aditi", pos: "Office Bearer", img: images.Aditi, year: 2026 },
  { name: "Astik", pos: "Office Bearer", img: images.Astik, year: 2026 },
  { name: "Debanjan", pos: "Office Bearer", img: images.Debanjan, year: 2026 },
  { name: "Nikhil", pos: "Office Bearer", img: images.Nikhil, year: 2026 },
  { name: "Pratham", pos: "Office Bearer", img: images.Pratham, year: 2026 },
  { name: "Rahul", pos: "Office Bearer", img: images.Rahul, year: 2026 },
  { name: "Satish", pos: "Office Bearer", img: images.Satish, year: 2026 },
  { name: "Sourab", pos: "Office Bearer", img: images.Sourab, year: 2026 },
];

const team25 = [
  { name: "Pawan", pos: "Chairperson", img: images.Pawan, year: 2025 },
  { name: "Abhi", pos: "V. Chairperson", img: images.Abhi, year: 2025 },
  { name: "Rishabh", pos: "Treasurer", img: images.Rishab, year: 2025 },
];

function TeamPages() {
  useEffect(() => {
    const netEffects = NET({
      el: "#net_vanta",
      mouseControls: true,
      backgroundColor: "rgb(245, 245, 245)", // Light, off-white-like background
      color: "rgb(85, 85, 85)", // Muted gray color for the net lines
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
    });
  }, []);

  return (
    <>
      <Nav />
      <section class="bg-gray-100 dark:bg-gray-200 team_section">
        {" "}
        {/* Changed from white */}
        <div className="net_background" id="net_vanta">
          <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
            <div class="mx-auto mb-8 max-w-screen-sm lg:mb-16">
              <h2 class="mb-4 text-8xl tracking-tight font-extrabold text-gray-800">
                {" "}
                {/* Off-white instead of white */}
                Our team
              </h2>
              <p class="font-light text-gray-700 sm:text-xl dark:text-gray-400">
                {" "}
                {/* Softer tone */}
                Explore the whole collection of open-source web components and
                elements built with utility classes.
              </p>
            </div>
            <div class="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
              {team26.map((mem) => (
                <TeamCard {...mem} />
              ))}
            </div>
            <div class="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mt-5">
              {team25.map((mem) => (
                <TeamCard {...mem} />
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* <section class="bg-white dark:bg-gray-900 team_section">
        <div className="net_background" id="net_vanta">
            <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
                <div class="mx-auto mb-8 max-w-screen-sm lg:mb-16">
                    <h2 class="mb-4 text-8xl tracking-tight font-extrabold text-off-white dark:text-white">Our team</h2>
                    <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">Explore the whole collection of open-source web components and elements built with the utility classes from Tailwind</p>
                </div> 
                <div class="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <TeamCard name = "Annie Parker" pos = "CEO/Co-founder" img = "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png"/>
                    <TeamCard name = "Harry" pos = "CEO" img = "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png"/>
                    <TeamCard name = "Jese Leos" pos = "SEO & Marketing" img = "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png"/>
                    <TeamCard name = "Joseph Mcfall" pos = "Sales" img = "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png"/>
                    <TeamCard name = "Lana Byrd" pos = "Web Designer" img = "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png"/>
                    <TeamCard name = "Leslie Livingston" pos = "Graphic Designer" img = "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png"/>
                    <TeamCard name = "Michael Gough" pos = "React Developer" img = "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png"/>
                    <TeamCard name = "Neil Sims" pos = "Vue.js Developer" img = "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png"/>
                </div>  
            </div>
    </div>
            </section> */}
    </>
  );
}

export default TeamPages;
