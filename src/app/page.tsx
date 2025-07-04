// app/page.tsx

'use client';

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
        src: "https://maxs-art-site.s3.us-east-2.amazonaws.com/flower_bou.JPG",
        alt: "Beautiflul flowers on water"
      },
      {
        src: "https://maxs-art-site.s3.us-east-2.amazonaws.com/metal_flower.jpg",
        alt: "Painting of metallic flower"
      },
      {
        src: "https://maxs-art-site.s3.us-east-2.amazonaws.com/racoons.jpg",
        alt: "Painting of two racoons"
      },
      {
        src: "https://maxs-art-site.s3.us-east-2.amazonaws.com/fish.JPG",
        alt: "Underwater painting of school of fish"
      },
      {
        src: "https://maxs-art-site.s3.us-east-2.amazonaws.com/frog_a.JPG",
        alt: "frog from underside 1 of 2"
      },
      {
        src: "https://maxs-art-site.s3.us-east-2.amazonaws.com/frog_b.JPG",
        alt: "frog fron underside 2 of 2"
      },
      {
        src: "https://maxs-art-site.s3.us-east-2.amazonaws.com/snail_toadstool.JPG",
        alt: "Painting of snails on a toadstool"
      },
      {
        src: "https://maxs-art-site.s3.us-east-2.amazonaws.com/moth.JPG",
        alt: "Painting of a orange and white moth"
      }

    ];

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
              <button className="w-full px-4 py-3 my-5 rounded-lg bg-[#02120F] backdrop-blur border border-4 border-white/20 text-white text-xl shadow-md hover:bg-white/20 hover:shadow-lg transition duration-200 font-serif">
                About
              </button>
            </Link>
            <Link href="/cart">
              <button className="w-full px-4 py-3 my-5 rounded-lg bg-[#02120F] backdrop-blur border border-4 border-white/20 text-white text-xl shadow-md hover:bg-white/20 hover:shadow-lg transition duration-200 font-serif">
                Cart
              </button>
            </Link>
            <Link href="/contact">
              <button className="w-full px-4 py-3 my-5 rounded-lg bg-[#02120F] backdrop-blur border border-4 border-white/20 text-white text-xl shadow-md hover:bg-white/20 hover:shadow-lg transition duration-200 font-serif">
                Contact
              </button>
            </Link>
          </div>
        </aside>
        {/* Gallery Photos */}
        <div className="flex-1 min-h-0 bg-[#02120f] overflow-auto">
          <div className="columns-2 md:columns-3 gap-2 p-4 bg-[#02120f]">
            {images.map((image) => (
              <div key={image.src} className="mb-4 break-inside-avoid">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  
  )};

