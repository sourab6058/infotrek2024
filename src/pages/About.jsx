import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import Nav from "../components/Nav";

const About = () => {
  return (
    <div className="min-h-screen">
      <Nav />
      <section className="flex h-screen items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 w-full sm:w-3/4 lg:w-2/3">
          <div className="text-center">
            <h1 className="font-black text-green-1000 text-6xl uppercase">
              About Us
            </h1>
            <p className="mt-4 text-lg text-gray-700 font-semibold">
              Infotrek, an Inter-Departmental Technical Symposium, held under
              ACM, runs over few days, bringing in the indigenous minds of the
              Campus under one roof thereby giving a stiff competition. It is a
              blend of both Technical and Non-technical events. Technical events
              comprising of Coding, Web-designing, Hacking, De-bugging, etc. The
              Non-technical has in its back, events such as Dumb Charades, Quiz,
              Treasure Hunt, Online game, etc to test your vocal and managerial
              skills. And the endeavours are rewarded with cash prizes. Last but
              not the least, Who is the Star of the Event? The answer to this
              question hinges on the performance of the best performers in this
              closing event. Infotrek bridges the gap between all the
              departments and builds a platform to communicate well among the
              same. It is not just a meet but 'Fun in the Run'.
            </p>
          </div>
        </div>
      </section>

      {/* <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-black text-4xl text-green-1000 uppercase mb-8">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700">
              Fusce ut fringilla nunc, non convallis quam. Integer facilisis
              fermentum erat, ac tristique dolor suscipit ut. In vehicula
              lacinia elementum.
            </p>
          </div>
        </div>
      </section> */}

      {/* <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-black text-4xl text-green-1000 uppercase mb-8">
              Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dummyTeamData.map((member) => (
                <div key={member.id} className="bg-neutral-200 overflow-hidden rounded-lg shadow-lg">
                  <div
                    className="bg-cover bg-center h-64"
                    style={{ backgroundImage: `url(${member.image})` }}
                  >
                    <div className="bg-gradient-to-b from-transparent to-black p-4 text-white text-xl font-bold">
                      {member.name}
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-700">{member.role}</p>
                    <p className="mt-2 text-gray-600">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

const dummyTeamData = [
  {
    id: 1,
    name: "John Doe",
    role: "CEO",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "https://via.placeholder.com/600x400",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "CTO",
    bio: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    image: "https://via.placeholder.com/600x400",
  },
  {
    id: 3,
    name: "Bob Johnson",
    role: "Lead Developer",
    bio: "Integer aliquam mauris nec mi ultricies, in pretium nunc hendrerit.",
    image: "https://via.placeholder.com/600x400",
  },
];

export default About;
