"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        console.log("Form submitted:", formData);
        alert("Thank you for your message! I'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
    };

    const socialLinks = [
        { name: "GitHub", url: "https://github.com", icon: "🐙" },
        { name: "LinkedIn", url: "https://linkedin.com", icon: "💼" },
        { name: "Twitter", url: "https://twitter.com", icon: "🐦" },
        { name: "Email", url: "mailto:your.email@example.com", icon: "📧" },
    ];

    return (
        <section id="contact" className="py-24 relative">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
                    Get In <span className="gradient-text">Touch</span>
                </h2>

                <div className="max-w-4xl mx-auto">
                    <Card className="glass p-8 md:p-12">
                        <div className="grid md:grid-cols-2 gap-12">
                            {/* Contact Form */}
                            <div>
                                <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <Input
                                            placeholder="Your Name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                            className="bg-background/50"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            type="email"
                                            placeholder="Your Email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                            className="bg-background/50"
                                        />
                                    </div>
                                    <div>
                                        <Textarea
                                            placeholder="Your Message"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            required
                                            rows={5}
                                            className="bg-background/50"
                                        />
                                    </div>
                                    <Button type="submit" className="w-full gradient-purple text-white hover:opacity-90">
                                        Send Message
                                    </Button>
                                </form>
                            </div>

                            {/* Contact Info */}
                            <div>
                                <h3 className="text-2xl font-semibold mb-6">Connect With Me</h3>
                                <p className="text-muted-foreground mb-8">
                                    I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                                </p>

                                <Separator className="my-6" />

                                <div className="space-y-4">
                                    <h4 className="font-semibold text-lg">Find me on:</h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        {socialLinks.map((link) => (
                                            <a
                                                key={link.name}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 p-3 rounded-lg bg-background/50 hover:bg-background transition-colors"
                                            >
                                                <span className="text-2xl">{link.icon}</span>
                                                <span className="text-sm font-medium">{link.name}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-16 text-muted-foreground text-sm">
                <p>© 2024 Harshvardhan Bhusari. Built with Next.js & Shadcn UI</p>
            </div>
        </section>
    );
}
