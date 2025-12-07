"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ZoomIn } from "lucide-react";
import { getPhotos } from "@/app/actions/getPhotos";

const latestPhotos = [
    // Replace these with your actual photos in public/photos
    // Example: { id: 1, src: "/photos/my-photo-1.jpg", alt: "Description" }
    { id: 1, src: "https://picsum.photos/seed/photo1/600/600", alt: "Photo 1" },
    { id: 2, src: "https://picsum.photos/seed/photo2/600/600", alt: "Photo 2" },
    { id: 3, src: "https://picsum.photos/seed/photo3/600/600", alt: "Photo 3" },
    { id: 4, src: "https://picsum.photos/seed/photo4/600/600", alt: "Photo 4" },
];



export default function LatestPhotos() {
    const [photos, setPhotos] = useState<{ id: number; src: string; alt: string }[]>(latestPhotos);

    useEffect(() => {
        const fetchPhotos = async () => {
            const localPhotos = await getPhotos();
            if (localPhotos.length > 0) {
                setPhotos(localPhotos);
            }
        };
        fetchPhotos();
    }, []);

    return (
        <section id="photos" className="py-24 relative">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
                    Latest <span className="gradient-text">Photos</span>
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto mb-12">
                    {photos.map((photo, index) => (
                        <motion.div
                            key={photo.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="aspect-square overflow-hidden border-white/10 group relative cursor-pointer">
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center">
                                    <ZoomIn className="w-8 h-8 text-white drop-shadow-lg" />
                                </div>
                                <Image
                                    src={photo.src}
                                    alt={photo.alt}
                                    fill
                                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                />
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="flex justify-center">
                    <Button
                        asChild
                        size="lg"
                        className="gradient-purple text-white hover:opacity-90 px-8"
                    >
                        <Link href="/photos">View All Photos</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
