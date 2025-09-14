// app/page.tsx

'use client';

import Image from "next/image";
import Link from "next/link";
import { Caveat } from "next/font/google";
import { useState, useRef } from "react";
import { useCart } from './components/CartContext';
import { parsePriceToCents } from './lib/money';
import { totalmem } from "os";

const caveatFont= Caveat({
  subsets: ["latin"],
  weight: "400",
});

  const images = [
      {
        src: "https://maxs-art-site.s3.us-east-2.amazonaws.com/Frog.JPG",
        alt: "Painting of close up of frog",
        originalPrice: "$250",
        printPrice: "$50"
      },
      {
        src: "https://maxs-art-site.s3.us-east-2.amazonaws.com/metal-cat.jpg",
        alt: "Painting of metallic cat",
        originalPrice: "$250",
        printPrice: "$50"
      },
      {
        src: "https://maxs-art-site.s3.us-east-2.amazonaws.com/flower_bou.JPG",
        alt: "Beautiflul flowers on water",
        originalPrice: "$250",
        printPrice: "$50"
      },
      {
        src: "https://maxs-art-site.s3.us-east-2.amazonaws.com/metal_flower.jpg",
        alt: "Painting of metallic flower",
        originalPrice: "$250",
        printPrice: "$50"
      },
      {
        src: "https://maxs-art-site.s3.us-east-2.amazonaws.com/racoons.jpg",
        alt: "Painting of two racoons",
        originalPrice: "$250",
        printPrice: "$50"
      },
      {
        src: "https://maxs-art-site.s3.us-east-2.amazonaws.com/fish.JPG",
        alt: "Underwater painting of school of fish",
        originalPrice: "$250",
        printPrice: "$50"
      },
      {
        src: "https://maxs-art-site.s3.us-east-2.amazonaws.com/frog_a.JPG",
        alt: "frog from underside 1 of 2",
        originalPrice: "$250",
        printPrice: "$50"
      },
      {
        src: "https://maxs-art-site.s3.us-east-2.amazonaws.com/frog_b.JPG",
        alt: "frog fron underside 2 of 2",
        originalPrice: "$250",
        printPrice: "$50"
      },
      {
        src: "https://maxs-art-site.s3.us-east-2.amazonaws.com/snail_toadstool.JPG",
        alt: "Painting of snails on a toadstool",
        originalPrice: "$250",
        printPrice: "$50"
      },
      {
        src: "https://maxs-art-site.s3.us-east-2.amazonaws.com/moth.JPG",
        alt: "Painting of a orange and white moth",
        originalPrice: "$250",
        printPrice: "$50"
      }

    ];

  export default function Home() {
  
  const [selectedImage, setSelectedImage] = useState<null | typeof images[0]>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart, items } = useCart();
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: "",
    visible: false,
  });
  const toastTimer = useRef<NodeJS.Timeout | null>(null);

  const { totalItems } = useCart();

  function showToast(message: string) {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ message, visible: true });
    toastTimer.current = setTimeout(() => {
      setToast((t) => ({...t, visible: false}));
    }, 2500); // auto-dismiss after 2.5s
  }

  let cartCount = 0;

  //Calculates the total number of items currently in the cart.
  //items comes from the cartContext. We guard it with an if check in case
  // it isnt initialized yet.
  // Using Array.reduce to loop through all cart entries and sum up their quantities
  if (items && Array.isArray(items)) {
    cartCount = items.reduce((sum: number, it: any) => {
      const quantity =
        it.quantity !== undefined && it.quantity !== null
        ? it.quantity
        :1; //default to 1 if quantity is missing
      return sum + quantity
    }, 0);
  }

  return (
    <div className="flex flex-col h-screen">
        {/* Main Content Area */}
      <section className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside className=" border-black border-r-[6px] w-64 p-6 justify-center items-center mt-0 flex-shrink-0 bg-[url('https://maxs-art-site.s3.us-east-2.amazonaws.com/Sidebar_background.jpeg')]">

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
            <Link
              href="/cart"
              aria-label={`Open cart${totalItems ? `, ${totalItems} item${totalItems>1?'s':''}` : ''}`}
            >
              <span className="relative w-full inline-flex justify-center px-4 py-3 my-5 rounded-lg bg-[#02120F] backdrop-blur border border-4 border-white/20 text-white text-xl shadow-md hover:bg-white/20 hover:shadow-lg transition duration-200 font-serif">
                Cart
                {totalItems > 0 && (
                  <span
                    className="absolute -top-2 -right-2 min-w-5 h-5 px-3 text-sm flex items-center justify-center text-emerald-700 rounded-full bg-white"
                    aria-hidden="true"
                  >
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </span>
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
              <div key={image.src} className="mb-4 [break-inside:avoid] cursor-pointer" onClick={() => { setSelectedImage(image); setIsModalOpen(true); }}>
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
      {isModalOpen && selectedImage && (
  <div role="dialog" aria-modal="true" className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
    <div className="bg-white rounded-lg p-6 max-w-3xl w-full relative">
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-2 right-2 text-black text-2xl font-bold"
      >
        &times;
      </button>
      <Image
        src={selectedImage.src}
        alt={selectedImage.alt}
        width={800}
        height={600}
        className="w-full h-auto rounded max-h-[70vh] object-contain"
      />
      <p className="mt-4 text-center text-lg">{selectedImage.alt}</p>

      {/*Show Prices */}
      <div className="mt-4 text-center justify-center">
        <p className="text-xl font-semibold text-gray-800">
          Original: {selectedImage.originalPrice}
        </p>
        <p className="text-xl font-semibold text-gray-800">
          Print: {selectedImage.printPrice}
        </p>
      </div>

      <div className="mt-6 flex justify-center gap-4 mb-8">
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          onClick = {() => {
            addToCart({
            id: selectedImage.src,
            title: selectedImage.alt,
            image: selectedImage.src,
            priceCents: parsePriceToCents(selectedImage.originalPrice),
            type: 'original',
            });
            showToast(`Added "${selectedImage.alt}" (Original) to cart`);
          }}>
          Buy Original
        </button>
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          onClick = {() => {
              addToCart({
              id: selectedImage.src,
              title: selectedImage.alt,
              image: selectedImage.src,
              priceCents: parsePriceToCents(selectedImage.printPrice),
              type: 'print',
              });
              showToast(`Added "${selectedImage.alt}" (Print) to cart`);
          }}>
          Buy Print
        </button>
        <button
          onClick={() => setIsModalOpen(false)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Go Back
        </button>
      </div>
    </div>
    {toast.visible && (
  <div
    role="status"
    aria-live="polite"
    className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] max-w-sm w-[90%] bg-[#0b1720] text-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3"
  >
    <span className="flex-1 text-sm">{toast.message}</span>
    <Link href="/cart" aria-label={`Open cart${totalItems ? `, ${totalItems} item${totalItems>1?'s':''}` : ''}`}>
      <span className="relative w-full inline-flex justify-center px-4 py-3 my-5 rounded-lg bg-[#02120F] backdrop-blur border border-4 border-white/20 text-white text-xl shadow-md hover:bg-white/20 hover:shadow-lg transition duration-200 font-serif">
        Cart
        {totalItems > 0 && (
          <span
            className="absolute -top-2 -right-2 min-w-5 h-5 px-1 text-xs leading-5 text-white rounded-full bg-black text-center"
            aria-hidden="true"
          >
            {totalItems > 9 ? '9+' : totalItems}
          </span>
        )}
      </span>
    </Link>
    <button
      onClick={() => setToast((t) => ({ ...t, visible: false }))}
      aria-label="Dismiss"
      className="text-xl leading-none px-1"
      title="Dismiss"
    >
      ×
    </button>
  </div>
)}

  </div>
)}

    </div>
  )
};

