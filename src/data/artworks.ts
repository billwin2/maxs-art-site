export type Artwork = {
  id: string;
  image: string;
  alt: string;
  originalPrice: string;
  printPrice?: string;
  sold: boolean;
};

export const artworks: Artwork[] = [
  {
    id: "frog",
    image: "https://maxs-art-site.s3.us-east-2.amazonaws.com/Frog.JPG",
    alt: "Painting of close up of frog",
    originalPrice: "$250",
    printPrice: "$50",
    sold: false,
  },
  {
    id: "metal-cat",
    image: "https://maxs-art-site.s3.us-east-2.amazonaws.com/metal-cat.jpg",
    alt: "Painting of metallic cat",
    originalPrice: "$250",
    printPrice: "$50",
    sold: false,
  },
  {
    id: "flower-bouquet",
    image: "https://maxs-art-site.s3.us-east-2.amazonaws.com/flower_bou.JPG",
    alt: "Beautiflul flowers on water",
    originalPrice: "$250",
    printPrice: "$50",
    sold: false,
  },
  {
    id: "metal-flower",
    image: "https://maxs-art-site.s3.us-east-2.amazonaws.com/metal_flower.jpg",
    alt: "Painting of metallic flower",
    originalPrice: "$250",
    printPrice: "$50",
    sold: false,
  },
  {
    id: "racoons",
    image: "https://maxs-art-site.s3.us-east-2.amazonaws.com/racoons.jpg",
    alt: "Painting of two racoons",
    originalPrice: "$250",
    printPrice: "$50",
    sold: false,
  },
  {
    id: "fish",
    image: "https://maxs-art-site.s3.us-east-2.amazonaws.com/fish.JPG",
    alt: "Underwater painting of school of fish",
    originalPrice: "$250",
    printPrice: "$50",
    sold: false,
  },
  {
    id: "frog-a",
    image: "https://maxs-art-site.s3.us-east-2.amazonaws.com/frog_a.JPG",
    alt: "frog from underside 1 of 2",
    originalPrice: "$250",
    printPrice: "$50",
    sold: false,
  },
  {
    id: "frog-b",
    image: "https://maxs-art-site.s3.us-east-2.amazonaws.com/frog_b.JPG",
    alt: "frog fron underside 2 of 2",
    originalPrice: "$250",
    printPrice: "$50",
    sold: false,
  },
  {
    id: "snail-toadstool",
    image: "https://maxs-art-site.s3.us-east-2.amazonaws.com/snail_toadstool.JPG",
    alt: "Painting of snails on a toadstool",
    originalPrice: "$250",
    printPrice: "$50",
    sold: false,
  },
  {
    id: "moth",
    image: "https://maxs-art-site.s3.us-east-2.amazonaws.com/moth.JPG",
    alt: "Painting of a orange and white moth",
    originalPrice: "$250",
    printPrice: "$50",
    sold: false,
  },
];

export const getArtworkById = (id: string) =>
  artworks.find((a) => a.id === id);
