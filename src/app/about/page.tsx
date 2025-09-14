import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#02120F] flex items-center justify-center">
    <main className="max-w-4xl  mx-auto p-8 text-white bg-green-900 rounded-lg">
      {/* Header */}
      <header className="flex justify-center gap-12 mb-12">
          <Link href="/">
            <button className="px-6 py-2  text-[#02120F] rounded-lg shadow hover:bg-gray-200 transition w-32">
              Home
            </button>
          </Link>
          <Link href="/cart">
            <button className="px-6 py-2  text-[#02120F] rounded-lg shadow hover:bg-gray-200 transition w-32">
              Cart
            </button>
          </Link>
          <Link href="/contact">
            <button className="px-6 py-2  text-[#02120F] rounded-lg shadow hover:bg-gray-200 transition w-32">
              Contact
            </button>
          </Link>
        </header>
      <h1 className="text-4xl font-bold mb-4 text-center">About the Artist</h1>

      <div className="flex justify-center items-center flex-wrap gap-34 mb-6">

  {/* Profile Picture */}
  <div className="mx-6 mt-4">
    <img
      src="https://maxs-art-site.s3.us-east-2.amazonaws.com/Max+Profile+Pic.jpg"
      alt="Max profile"
      className="rounded-full w-48 h-48 object-cover border-4 border-white"
    />
  </div>
</div>


      {/* Artist Bio */}
      <section className="mb-8 text-lg leading-relaxed space-y-4">
        <p>
          Max is a young artist whose work is filled with curiosity, color, and heart.
          From a young age, Max has enjoyed creating pieces that spark joy and wonder in others.
        </p>

        <p>
          His favorite subjects include animals, nature, and anything whimsical or surreal.
          Each painting is a reflection of what inspires him — whether it’s a frog under a leaf or a metallic cat glowing under the moonlight.
        </p>

        <p>
          Max is continually learning, growing, and experimenting with new techniques.
          This site is a collection of his evolving portfolio — and he hopes it makes you smile as much as it does him.
        </p>
      </section>

      {/* Fun facts (optional) */}
      <section className="bg-white/10 p-6 rounded-lg space-y-2">
        <h2 className="text-2xl font-semibold mb-2">Fun Facts About Max</h2>
        <ul className="list-disc list-inside text-white/90">
          <li>Loves frogs 🐸 and snails 🐌</li>
          <li>Paints while listening to music</li>
          <li>Favorite color: Emerald green</li>
          <li>Dream project: Illustrating a storybook</li>
        </ul>
      </section>
    </main>
    </div>
  );
}
