"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useState } from "react";

type Project = {
  title: string;
  description: string;
  tech: string[];
  gradient: string;
};

type ProjectGridProps = {
  projects: Project[];
  showAll: boolean;
};

const allEceProjects: Project[] = [
  { title: "Smart Traffic Light System", description: "Intelligent traffic control using Arduino and IR sensors for vehicle detection and signal optimization.", tech: ["Arduino", "IR Sensors", "C++"], gradient: "gradient-purple" },
  { title: "Line Following Robot", description: "Autonomous robot using IR sensors and DC motors for path tracking and navigation.", tech: ["IR Sensors", "DC Motors", "Arduino"], gradient: "gradient-blue" },
  { title: "Home Automation System", description: "Control lights and fans remotely using Bluetooth module and relay switches.", tech: ["Bluetooth", "Relay Module", "Arduino"], gradient: "gradient-purple" },
  { title: "Heart Rate Monitor", description: "Real-time heart rate monitoring system using pulse sensor and Arduino.", tech: ["Pulse Sensor", "Arduino", "LCD Display"], gradient: "gradient-blue" },
  { title: "IoT Weather Station", description: "Real-time weather monitoring with ESP32, DHT11 sensor, and cloud dashboard integration.", tech: ["ESP32", "DHT11", "IoT", "Cloud"], gradient: "gradient-purple" },
  { title: "RFID Attendance System", description: "Automated attendance tracking using RFID cards with database logging and reporting.", tech: ["RFID", "Arduino", "MySQL", "PHP"], gradient: "gradient-blue" },
  { title: "Voice Controlled Home", description: "Control home appliances using voice commands via Bluetooth and Arduino.", tech: ["Bluetooth", "Voice Recognition", "Arduino"], gradient: "gradient-purple" },
  { title: "Smart Parking System", description: "IoT-based parking slot detection with mobile app for real-time availability.", tech: ["IR Sensors", "IoT", "Mobile App"], gradient: "gradient-blue" },
  { title: "Smart Helmet for Safety", description: "Accident detection system with GSM, GPS, and accelerometer for emergency alerts.", tech: ["GSM", "GPS", "Accelerometer", "Arduino"], gradient: "gradient-purple" },
  { title: "IoT Smart Irrigation", description: "Automated irrigation system using moisture sensors, cloud monitoring, and mobile app control.", tech: ["Moisture Sensors", "IoT", "Cloud", "Mobile App"], gradient: "gradient-blue" },
  { title: "FPGA Digital Clock", description: "Digital clock implementation on FPGA using Verilog/VHDL for hardware design.", tech: ["FPGA", "Verilog", "VHDL"], gradient: "gradient-purple" },
  { title: "Radar System", description: "Ultrasonic-based radar with signal visualization for object detection and tracking.", tech: ["Ultrasonic Sensor", "Arduino", "Processing"], gradient: "gradient-blue" },
  { title: "Autonomous Drone Navigation", description: "Self-navigating drone with computer vision for obstacle avoidance and path planning.", tech: ["Computer Vision", "OpenCV", "Drone", "AI"], gradient: "gradient-purple" },
  { title: "5G/LoRa Communication System", description: "Long-range wireless communication prototype for IoT applications.", tech: ["LoRa", "5G", "Wireless", "IoT"], gradient: "gradient-blue" },
  { title: "AI Surveillance System", description: "Edge AI-powered CCTV system with real-time object detection on Raspberry Pi.", tech: ["Raspberry Pi", "Edge AI", "OpenCV", "Python"], gradient: "gradient-purple" },
  { title: "Self-Driving Miniature Car", description: "Autonomous vehicle using sensors, camera, and machine learning for navigation.", tech: ["ML", "Camera", "Sensors", "Raspberry Pi"], gradient: "gradient-blue" },
];

const allCsProjects: Project[] = [
  { title: "Student Record Management", description: "File-based student data management system with CRUD operations using C++/Java.", tech: ["C++", "File Handling", "OOP"], gradient: "gradient-purple" },
  { title: "Snake Game", description: "Classic snake game implementation with score tracking and increasing difficulty.", tech: ["Python", "Pygame", "Game Dev"], gradient: "gradient-blue" },
  { title: "Personal Expense Tracker", description: "Track daily expenses with SQLite database and data visualization.", tech: ["Python", "SQLite", "Tkinter"], gradient: "gradient-purple" },
  { title: "Portfolio Website", description: "Responsive personal portfolio website with modern design and animations.", tech: ["HTML", "CSS", "JavaScript"], gradient: "gradient-blue" },
  { title: "Blog Website", description: "Full-featured blog platform with user authentication, posts, and comments.", tech: ["Django", "PostgreSQL", "Bootstrap"], gradient: "gradient-purple" },
  { title: "Real-time Chat Application", description: "Multi-user chat app with socket programming for instant messaging.", tech: ["Python", "Sockets", "Threading"], gradient: "gradient-blue" },
  { title: "E-commerce Platform", description: "Online shopping website with product catalog, cart, and checkout system.", tech: ["Node.js", "Express", "MongoDB", "React"], gradient: "gradient-purple" },
  { title: "Weather App", description: "Real-time weather information using OpenWeatherMap API with location search.", tech: ["React", "API", "JavaScript"], gradient: "gradient-blue" },
  { title: "AI Chatbot", description: "Intelligent chatbot using NLP for natural language understanding and responses.", tech: ["Python", "NLP", "TensorFlow", "NLTK"], gradient: "gradient-purple" },
  { title: "ML Price Prediction", description: "Machine learning model for predicting house prices using regression algorithms.", tech: ["Python", "Scikit-learn", "Pandas", "ML"], gradient: "gradient-blue" },
  { title: "Blockchain Voting System", description: "Secure and transparent voting platform using blockchain technology.", tech: ["Ethereum", "Solidity", "Web3.js"], gradient: "gradient-purple" },
  { title: "Network Intrusion Detection", description: "ML-based system for detecting network attacks and anomalies.", tech: ["Python", "ML", "Packet Sniffing", "Scikit-learn"], gradient: "gradient-blue" },
  { title: "Autonomous Driving Simulation", description: "Self-driving car simulation with computer vision and path planning algorithms.", tech: ["Python", "OpenCV", "ROS", "AI"], gradient: "gradient-purple" },
  { title: "Federated Learning System", description: "Distributed machine learning system for privacy-preserving model training.", tech: ["Python", "TensorFlow", "Distributed ML"], gradient: "gradient-blue" },
  { title: "AI Healthcare System", description: "Medical diagnosis system with symptom analysis and medical imaging processing.", tech: ["Python", "Deep Learning", "OpenCV", "TensorFlow"], gradient: "gradient-purple" },
  { title: "Recommendation System", description: "Large-scale recommendation engine using collaborative filtering and deep learning.", tech: ["Python", "TensorFlow", "Spark", "ML"], gradient: "gradient-blue" },
];

const ProjectGrid = ({ projects, showAll }: ProjectGridProps) => {
  const displayProjects = showAll ? projects : projects.slice(0, 4);
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {displayProjects.map((project) => (
        <Card
          key={project.title}
          className="group relative glass border-white/5 hover:border-white/20 hover:shadow-[0_0_30px_rgba(102,126,234,0.15)] transition-all duration-500 overflow-hidden"
        >
          {/* Subtle gradient accent line */}
          <div className={`absolute top-0 left-0 right-0 h-[1px] ${project.gradient} opacity-50`} />

          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-semibold group-hover:text-purple-300 transition-colors">
              {project.title}
            </CardTitle>
            <CardDescription className="text-sm leading-relaxed text-muted-foreground/90">
              {project.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="pb-3">
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((tech: string) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="text-xs px-2 py-0.5 bg-white/5 border-white/10 hover:bg-white/10 transition-colors"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>

          <CardFooter className="gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="flex-1 text-xs border-white/10 hover:border-purple-400/40 hover:bg-purple-500/10"
            >
              <Link href="#">View Demo</Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="flex-1 text-xs border-white/10 hover:border-purple-400/40 hover:bg-purple-500/10"
            >
              <Link href="#">GitHub</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default function Projects() {
  const [showAllCs, setShowAllCs] = useState(false);
  const [showAllEce, setShowAllEce] = useState(false);
  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Featured <span className="gradient-text">Projects</span></h2>
        <Tabs defaultValue="cs" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="cs" className="text-base">Computer Science</TabsTrigger>
            <TabsTrigger value="ece" className="text-base">Electronics &amp; Communication</TabsTrigger>
          </TabsList>
          <TabsContent value="cs" className="mt-0 space-y-8">
            <ProjectGrid projects={allCsProjects} showAll={showAllCs} />
            {!showAllCs && allCsProjects.length > 4 && (<div className="flex justify-center"><Button onClick={() => setShowAllCs(true)} size="lg" className="gradient-purple text-white hover:opacity-90">Show More Projects ({allCsProjects.length - 4} more)</Button></div>)}
            {showAllCs && (<div className="flex justify-center"><Button onClick={() => setShowAllCs(false)} size="lg" variant="outline">Show Less</Button></div>)}
          </TabsContent>
          <TabsContent value="ece" className="mt-0 space-y-8">
            <ProjectGrid projects={allEceProjects} showAll={showAllEce} />
            {!showAllEce && allEceProjects.length > 4 && (<div className="flex justify-center"><Button onClick={() => setShowAllEce(true)} size="lg" className="gradient-purple text-white hover:opacity-90">Show More Projects ({allEceProjects.length - 4} more)</Button></div>)}
            {showAllEce && (<div className="flex justify-center"><Button onClick={() => setShowAllEce(false)} size="lg" variant="outline">Show Less</Button></div>)}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
