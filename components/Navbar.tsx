"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Name transition: full name visible initially, "harsh" appears after scrolling
  const opacityFull = useTransform(scrollY, [100, 300], [1, 0]);
  const opacityShort = useTransform(scrollY, [100, 300], [0, 1]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/#home", label: "Home" },
    { href: "/#about", label: "About" },
    { href: "/#education", label: "Education" },
    { href: "/#projects", label: "Projects" },
    { href: "/#skills", label: "Skills" },
    { href: "/#certificates", label: "Certificates" },
    { href: "/photos", label: "Photos" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass shadow-lg" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Animated name transition */}
          <Link href="#home" className="text-2xl font-bold relative">
            <span className="relative inline-block" style={{ minWidth: "280px" }}>
              {/* Full Name - visible initially */}
              <motion.span
                style={{
                  opacity: opacityFull,
                  position: "absolute",
                  left: 0,
                  whiteSpace: "nowrap",
                }}
                className="gradient-text"
              >
                Harshvardhan Bhusari
              </motion.span>

              {/* Short Name - appears on scroll */}
              <motion.span
                style={{
                  opacity: opacityShort,
                  position: "absolute",
                  left: 0,
                  whiteSpace: "nowrap",
                }}
                className="gradient-text"
              >
                harsh
              </motion.span>

              {/* Invisible spacer to maintain layout */}
              <span className="opacity-0 invisible">Harshvardhan Bhusari</span>
            </span>
          </Link>

          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}