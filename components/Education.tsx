"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, useScroll, useTransform } from "framer-motion";
import { Rocket } from "lucide-react";
import { useRef } from "react";

const educationTimeline = [
    {
        year: "2023",
        degree: "Class 10",
        institution: "Greenwood Highschool",
        percentage: "91%",
        description: "Completed secondary education with distinction",
    },
    {
        year: "2025",
        degree: "Class 12",
        institution: "Allen School",
        percentage: "78%",
        description: "Completed higher secondary education",
    },
    {
        year: "2025 - Present",
        degree: "B.Tech in Electronics & Communication Engineering",
        institution: "VIT Vellore",
        percentage: "1st Semester",
        description: "Currently pursuing undergraduate degree (First Semester)",
    },
    {
        year: "2025 - Present",
        degree: "BS in Data Science & Applications (Online)",
        institution: "IIT Madras",
        percentage: "Pursuing",
        description: "Pursuing online degree program in Data Science",
    },
];

export default function Education() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "95%"]);

    return (
        <section id="education" className="py-24 relative">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
                    Education <span className="gradient-text">Timeline</span>
                </h2>

                <div className="max-w-4xl mx-auto">
                    <div ref={containerRef} className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-purple-500 opacity-30">
                            <motion.div
                                style={{ top: y }}
                                className="absolute left-1/2 -translate-x-1/2 -top-3 z-20 text-purple-500 bg-background rounded-full p-1"
                            >
                                <Rocket size={28} className="transform rotate-135" />
                            </motion.div>
                        </div>

                        <div className="space-y-12">
                            {educationTimeline.map((item, index) => (
                                <div
                                    key={index}
                                    className={`relative flex items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                        } flex-row`}
                                >
                                    {/* Timeline dot */}
                                    <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full gradient-purple transform -translate-x-1/2 z-10 ring-4 ring-background" />

                                    {/* Content card */}
                                    <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                                        <Card className="glass hover:scale-105 transition-transform duration-300">
                                            <CardHeader>
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="text-sm font-semibold text-purple-400">
                                                        {item.year}
                                                    </div>
                                                    <div className="text-lg font-bold gradient-text">
                                                        {item.percentage}
                                                    </div>
                                                </div>
                                                <CardTitle className="text-xl">{item.degree}</CardTitle>
                                                <CardDescription className="text-base font-medium">
                                                    {item.institution}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-sm text-muted-foreground">
                                                    {item.description}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
