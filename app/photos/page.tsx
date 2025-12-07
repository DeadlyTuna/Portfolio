import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";

// Generate 20 dummy photos
const allPhotos = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    src: `https://picsum.photos/seed/gallery${i + 1}/600/600`,
    alt: `Gallery Photo ${i + 1}`,
}));

export default function PhotosPage() {
    return (
        <div className="min-h-screen bg-transparent">
            {/* Helper to ensure navbar styles work somewhat, though standard navbar uses absolute positioning which might overlay content. 
            We'll need to check spacing. Navbar has 'fixed' position. */}
            <Navbar />

            <main className="container mx-auto px-6 py-32">
                <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
                    Photo <span className="gradient-text">Gallery</span>
                </h1>
                <p className="text-center text-muted-foreground mb-16 text-lg max-w-2xl mx-auto">
                    A collection of moments and memories.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {allPhotos.map((photo) => (
                        <Card
                            key={photo.id}
                            className="aspect-square overflow-hidden border-white/5 hover:border-white/20 transition-all duration-300 group relative"
                        >
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                            <img
                                src={photo.src}
                                alt={photo.alt}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                loading="lazy"
                            />
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
}
