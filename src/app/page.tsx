// app/page.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Caveat } from 'next/font/google';
import { useState, useRef } from 'react';
import { artworks, type Artwork } from '@/data/artworks';
import { useCart } from './components/CartContext';
import { parsePriceToCents } from './lib/money';
import { cents } from './components/cart-types';

const caveatFont = Caveat({ subsets: ['latin'], weight: '400' });

export default function Home() {
  const { addToCart, totalItems } = useCart();
  const [selectedArt, setSelectedArt] = useState<Artwork | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });
  const toastTimer = useRef<NodeJS.Timeout | null>(null);

  function showToast(message: string) {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ message, visible: true });
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2500);
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Main Content Area */}
      <section className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside className="border-black border-r-[6px] w-64 p-6 justify-center items-center mt-0 flex-shrink-0 bg-[url('https://maxs-art-site.s3.us-east-2.amazonaws.com/Sidebar_background.jpeg')]">
          <Image
            src="https://maxs-art-site.s3.us-east-2.amazonaws.com/Max+Profile+Pic.jpg"
            alt="Max's picture"
            width={600}
            height={400}
            className="rounded-full"
          />

          <h2 className={`flex justify-center pt-5 text-center text-xl ${caveatFont.className}`}>
            “I paint things that make me smile. Hope they make you smile too.”
          </h2>

          {/* Navigation Buttons */}
          <div className="w-full flex flex-col space-y-3 pt-7">
            <Link href="/about">
              <button className="w-full px-4 py-3 my-5 rounded-lg bg-[#02120F] backdrop-blur border border-4 border-white/20 text-white text-xl shadow-md hover:bg-white/20 hover:shadow-lg transition duration-200 font-serif">
                About
              </button>
            </Link>

            <Link href="/cart" aria-label={`Open cart${totalItems ? `, ${totalItems} item${totalItems > 1 ? 's' : ''}` : ''}`}>
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

        {/* Gallery */}
        <div className="flex-1 min-h-0 bg-[#02120f] overflow-auto">
          <div className="columns-2 md:columns-3 gap-2 p-4 bg-[#02120f]">
            {artworks.map((art) => (
              <div
                key={art.id}
                className="relative mb-4 [break-inside:avoid] cursor-pointer group"
                onClick={() => {
                  setSelectedArt(art);
                  setIsModalOpen(true);
                }}
              >
                <Image src={art.image} alt={art.alt} width={600} height={400} className="w-full h-auto rounded-lg shadow-md" />
                {/* Sold badge overlay for originals */}
                {art.sold && (
                  <span className="absolute top-2 right-2 rounded-full bg-gray-900/90 text-white text-xs px-2 py-1">
                    Sold
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedArt && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-3xl w-full relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-2 text-black text-2xl font-bold">
              &times;
            </button>

            <Image
              src={selectedArt.image}
              alt={selectedArt.alt}
              width={800}
              height={600}
              className="w-full h-auto rounded max-h-[70vh] object-contain"
            />
            <p className="mt-4 text-center text-lg">{selectedArt.alt}</p>

            {/* Prices */}
            <div className="mt-4 text-center justify-center">
              <p className="text-xl font-semibold text-gray-800">Original: {selectedArt.originalPrice}</p>
              {selectedArt.printPrice && (
                <p className="text-xl font-semibold text-gray-800">Print: {selectedArt.printPrice}</p>
              )}
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-center gap-4 mb-8">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
                disabled={selectedArt.sold}
                onClick={() => {
                  if (selectedArt.sold) return;
                  addToCart({
                    id: selectedArt.id,
                    title: selectedArt.alt,
                    image: selectedArt.image,
                    priceCents: cents(parsePriceToCents(selectedArt.originalPrice)),
                    type: 'original',
                  });
                  showToast(`Added "${selectedArt.alt}" (Original) to cart`);
                }}
              >
                {selectedArt.sold ? 'Sold' : 'Buy Original'}
              </button>

              {selectedArt.printPrice && (
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                  onClick={() => {
                    const result = addToCart({
                      id: selectedArt.id,
                      title: selectedArt.alt,
                      image: selectedArt.image,
                      priceCents: cents(parsePriceToCents(selectedArt.originalPrice)),
                      type: 'original',
                    });

                    if (result?.success) {
                      showToast(`Added "${selectedArt.alt}" (Original) to cart`);
                    } else if (result?.message) {
                      showToast(result.message);
                    }
                  }}
                >
                  Buy Print
                </button>
              )}

              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Go Back
              </button>
            </div>
          </div>

          {/* Toast */}
          {toast.visible && (
            <div
              role="status"
              aria-live="polite"
              className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] max-w-sm w-[90%] bg-[#0b1720] text-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3"
            >
              <span className="flex-1 text-sm">{toast.message}</span>
              <Link
                href="/cart"
                aria-label={`Open cart${totalItems ? `, ${totalItems} item${totalItems > 1 ? 's' : ''}` : ''}`}
              >
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
  );
}
