"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const latestPhotos = [
    { id: 1, src: "https://picsum.photos/seed/photo1/600/600", alt: "Photo 1" },
    { id: 2, src: "https://picsum.photos/seed/photo2/600/600", alt: "Photo 2" },
    { id: 3, src: "https://picsum.photos/seed/photo3/600/600", alt: "Photo 3" },
    { id: 4, src: "https://picsum.photos/seed/photo4/600/600", alt: "Photo 4" },
];

export default function LatestPhotos() {
    return (
        <section id="photos" className="py-24 relative">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
                    Latest <span className="gradient-text">Photos</span>
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto mb-12">
                    {latestPhotos.map((photo, index) => (
                        <motion.div
                            key={photo.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="aspect-square overflow-hidden border-white/5 hover:border-white/20 transition-all duration-300 group relative">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                                <img
                                    src={photo.src}
                                    alt={photo.alt}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
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
