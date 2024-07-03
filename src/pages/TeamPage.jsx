import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import Nav from "../components/Nav";

const TeamPage = () => {
  return (
    <div className="bg-off-white">
      <Nav />
      <div className="flex h-48 items-center justify-center">
        <span className="font-black text-green-1000 text-8xl uppercase">
          ACM'S BEST
        </span>
      </div>
      <HorizontalScrollCarousel />
      <div className="flex h-1 items-center justify-center"></div>
      <HorizontalScrollCarousel />
      <div className="flex h-1 items-center justify-center"></div>
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-90%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="p-2 m-5 font-black text-7xl text-green-1000 text-center text-nowrap">
          TEAM 2026
        </div>
        <motion.div style={{ x }} className="flex gap-4">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }) => {
  return (
    <div
      key={card.id}
      className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200"
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
      <div className="absolute inset-0 z-10 grid place-content-center">
        <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-6xl font-black uppercase text-white backdrop-blur-lg">
          {card.title}
        </p>
      </div>
    </div>
  );
};

export default TeamPage;

const cards = [
  {
    url: "/imgs/img1.jpg",
    title: "Title 1",
    id: 1,
  },
  {
    url: "/imgs/img2.jpg",
    title: "Title 2",
    id: 2,
  },
  {
    url: "/imgs/img3.jpg",
    title: "Title 3",
    id: 3,
  },
  {
    url: "/imgs/img4.jpg",
    title: "Title 4",
    id: 4,
  },
  {
    url: "/imgs/img5.jpg",
    title: "Title 5",
    id: 5,
  },
  {
    url: "/imgs/img6.jpg",
    title: "Title 6",
    id: 6,
  },
  {
    url: "/imgs/img7.jpg",
    title: "Title 7",
    id: 7,
  },
];
