"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import StarField from "./StarField";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const { scrollY } = useScroll();

  // These values guarantee the full name shows on load
  const opacityFull = useTransform(scrollY, [100, 400], [1, 0]);
  const yFull = useTransform(scrollY, [100, 400], [0, -60]);

  const opacityShort = useTransform(scrollY, [250, 500], [0, 1]);
  const yShort = useTransform(scrollY, [250, 500], [40, 0]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <StarField />

      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="block mb-4 text-white">Hi, I'm</span>

            <span className="relative inline-block" style={{ height: "1.2em" }}>
              {/* Full Name – visible on load */}
              <motion.span
                style={{
                  opacity: opacityFull,
                  y: yFull,
                  position: "absolute",
                  left: "50%",
                  x: "-50%",
                  whiteSpace: "nowrap",
                }}
                className="gradient-text"
              >
                Harshvardhan Bhusari
              </motion.span>

              {/* hrd – appears only after scrolling */}
              <motion.span
                style={{
                  opacity: opacityShort,
                  y: yShort,
                  position: "absolute",
                  left: "50%",
                  x: "-50%",
                  whiteSpace: "nowrap",
                }}
                className="gradient-text"
              >
                hrd
              </motion.span>

              {/* Invisible spacer */}
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
            <Button asChild size="lg" className="gradient-purple text-white">
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