"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const certificates = [
    {
        title: "Full Stack Web Development",
        issuer: "Udemy",
        date: "2023",
        skills: ["React", "Node.js", "MongoDB"],
    },
    {
        title: "AWS Certified Cloud Practitioner",
        issuer: "Amazon Web Services",
        date: "2023",
        skills: ["AWS", "Cloud Computing"],
    },
    {
        title: "Python for Data Science",
        issuer: "Coursera",
        date: "2022",
        skills: ["Python", "Data Analysis", "Pandas"],
    },
    {
        title: "IoT Fundamentals",
        issuer: "Cisco Networking Academy",
        date: "2022",
        skills: ["IoT", "Embedded Systems", "Arduino"],
    },
    {
        title: "Digital Signal Processing",
        issuer: "NPTEL",
        date: "2023",
        skills: ["DSP", "MATLAB", "Signal Analysis"],
    },
    {
        title: "Machine Learning Specialization",
        issuer: "Stanford Online",
        date: "2023",
        skills: ["ML", "TensorFlow", "Neural Networks"],
    },
];

export default function Certificates() {
    return (
        <section id="certificates" className="py-24 relative bg-background/50">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
                    Certificates & <span className="gradient-text">Achievements</span>
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {certificates.map((cert, index) => (
                        <Card
                            key={index}
                            className="glass hover:scale-105 transition-transform duration-300 overflow-hidden"
                        >
                            <div className="h-1 gradient-purple" />

                            <CardHeader>
                                <CardTitle className="text-lg leading-tight">{cert.title}</CardTitle>
                                <CardDescription className="text-sm">
                                    {cert.issuer}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-3">
                                <div className="text-xs text-muted-foreground font-medium">
                                    📅 {cert.date}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {cert.skills.map((skill) => (
                                        <Badge
                                            key={skill}
                                            variant="secondary"
                                            className="text-xs"
                                        >
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
