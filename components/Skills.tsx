"use client";

import { Badge } from "@/components/ui/badge";

const skillCategories = [
    {
        category: "Programming Languages",
        skills: ["Python", "C++", "Java", "JavaScript", "TypeScript", "Solidity", "Verilog", "VHDL"],
        color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    },
    {
        category: "Web Development",
        skills: ["React", "Next.js", "Node.js", "Express", "Django", "Flask", "HTML/CSS", "Tailwind CSS", "Bootstrap"],
        color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    },
    {
        category: "AI & Machine Learning",
        skills: ["TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "NLP", "NLTK", "Deep Learning", "Computer Vision"],
        color: "bg-pink-500/10 text-pink-500 border-pink-500/20",
    },
    {
        category: "Databases",
        skills: ["MongoDB", "PostgreSQL", "MySQL", "SQLite", "InfluxDB"],
        color: "bg-green-500/10 text-green-500 border-green-500/20",
    },
    {
        category: "Electronics & IoT",
        skills: ["Arduino", "ESP32", "Raspberry Pi", "MQTT", "Sensors", "RFID", "GSM/GPS", "LoRa", "ZigBee"],
        color: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    },
    {
        category: "Signal Processing & Hardware",
        skills: ["MATLAB", "DSP", "FPGA", "Embedded Systems", "Microcontrollers", "Circuit Design"],
        color: "bg-red-500/10 text-red-500 border-red-500/20",
    },
    {
        category: "Cloud & DevOps",
        skills: ["AWS", "Docker", "Vercel", "Cloud Computing", "Microservices", "REST APIs"],
        color: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
    },
    {
        category: "Specialized Technologies",
        skills: ["Blockchain", "Ethereum", "Web3.js", "ROS", "Socket Programming", "Edge AI", "Federated Learning"],
        color: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
    },
    {
        category: "Tools & Others",
        skills: ["Git", "GitHub", "Pygame", "Tkinter", "Processing", "Pandas", "NumPy", "D3.js", "Spark"],
        color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    },
];

export default function Skills() {
    return (
        <section id="skills" className="py-24 relative">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
                    Skills & <span className="gradient-text">Technologies</span>
                </h2>

                <div className="max-w-6xl mx-auto space-y-12">
                    {skillCategories.map((category, index) => (
                        <div key={index} className="space-y-4">
                            <h3 className="text-2xl font-semibold text-center md:text-left">
                                {category.category}
                            </h3>
                            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                {category.skills.map((skill) => (
                                    <Badge
                                        key={skill}
                                        variant="outline"
                                        className={`${category.color} px-4 py-2 text-sm font-medium hover:scale-110 transition-transform cursor-default`}
                                    >
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
