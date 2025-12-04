"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import StarField from "./StarField";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
    const { scrollY } = useScroll();
    
    // Opacity for full name: 1 -> 0
    const opacityFull = useTransform(scrollY, [0, 200], [1, 0]);
    // Opacity for short name: 0 -> 1
    const opacityShort = useTransform(scrollY, [100, 300], [0, 1]);
    // Y position for full name: 0 -> -50
    const yFull = useTransform(scrollY, [0, 200], [0, -50]);
    // Y position for short name: 50 -> 0
    const yShort = useTransform(scrollY, [100, 300], [50, 0]);
    
    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            <StarField />
            <div className="container mx-auto px-6 py-32 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-6xl md:text-8xl font-bold mb-6">
                        <span className="block mb-2">Hi, I'm</span>
                        <span className="block relative" style={{ minHeight: '1.2em' }}>
                            <motion.span
                                style={{ 
                                    opacity: opacityFull, 
                                    y: yFull,
                                    position: 'absolute',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    top: 0,
                                    whiteSpace: 'nowrap'
                                }}
                                className="gradient-text"
                            >
                                Harshvardhan Bhusari
                            </motion.span>
                            <motion.span
                                style={{ 
                                    opacity: opacityShort, 
                                    y: yShort,
                                    position: 'absolute',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    top: 0,
                                    whiteSpace: 'nowrap'
                                }}
                                className="gradient-text"
                            >
                                hrd
                            </motion.span>
                            {/* Invisible spacer to maintain height */}
                            <span className="opacity-0 invisible">Harshvardhan Bhusari</span>
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                        Full Stack Developer | UI/UX Enthusiast | Problem Solver
                    </p>
                    <p className="text-lg text-muted-foreground/80 mb-12 max-w-2xl mx-auto">
                        I craft beautiful, functional web experiences that make a difference.
                        Passionate about clean code, elegant design, and innovative solutions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="gradient-purple text-white hover:opacity-90">
                            <Link href="#projects">View My Work</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline">
                            <Link href="#contact">Get In Touch</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}