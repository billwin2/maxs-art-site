// app/page.tsx

'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Caveat } from "next/font/google";

const caveatFont= Caveat({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  
  const images = [
      {
        src: "https://maxs-art-site.s3.us-east-2.amazonaws.com/Frog.JPG",
        alt: "Painting of close up of frog",
      },
      {
        src: "https://maxs-art-site.s3.us-east-2.amazonaws.com/metal-cat.jpg",
        alt: "Painting of metallic cat",
      },
      {
        src: "https://maxs-art-site.s3.us-east-2.amazonaws.com/metal_flower.jpg",
        alt: "Painting of metallic flower"
      },
      {
        src: "https://maxs-art-site.s3.us-east-2.amazonaws.com/racoons.jpg",
        alt: "Painting of two racoons"
      }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    // Switch images every 10 seconds
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 10000);
      return () => clearInterval(interval);
    }, [images.length]);

  return (
    <div className="flex flex-col h-screen">
        {/* Main Content Area */}
      <section className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside className="border-r border-black border-r-6 w-64 p-6 justify-center items-center mt-0 flex-shrink-0 bg-[url('https://maxs-art-site.s3.us-east-2.amazonaws.com/Sidebar_background.jpeg')]">

          {/* Max's Picture */}
          <Image
            src="https://maxs-art-site.s3.us-east-2.amazonaws.com/Max+Profile+Pic.jpg" 
            alt="Max's picture"
            width={600}
            height={400}
            className="rounded-full"
          />

          <h2 className={`flex justify-center pt-5 text-center text-xl ${caveatFont.className}`}>“I paint things that make me smile. Hope they make you smile too.”</h2>

          {/* Navigation Buttons */}
          <div className="w-full flex flex-col space-y-3 pt-7">
            <Link href="/about">
              <button className="w-full px-4 py-3 my-5 rounded-lg bg-#02120F backdrop-blur border border-4 border-white/20 text-white text-xl shadow-md hover:bg-white/20 hover:shadow-lg transition duration-200 font-serif">
                About
              </button>
            </Link>
            <Link href="/cart">
              <button className="w-full px-4 py-3 my-5 rounded-lg bg-#02120F backdrop-blur border border-4 border-white/20 text-white text-xl shadow-md hover:bg-white/20 hover:shadow-lg transition duration-200 font-serif">
                Cart
              </button>
            </Link>
            <Link href="/contact">
              <button className="w-full px-4 py-3 my-5 rounded-lg bg-#02120F backdrop-blur border border-4 border-white/20 text-white text-xl shadow-md hover:bg-white/20 hover:shadow-lg transition duration-200 font-serif">
                Contact
              </button>
            </Link>
          </div>
        </aside>

        {/* Gallery Photos */}
        <div className="flex-1 min-h-0 m-0">
          <div className="w-full h-full relative flex items-center justify-center bg-[#02120f]">
            <Image
              key={images[currentIndex].src}
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              fill
              className="rounded shadow-md object-contain h-full transition-opacity duration-1000"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
