"use client";

export default function About() {
    return (
        <section id="about" className="py-24 relative">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
                    About <span className="gradient-text">Me</span>
                </h2>

                <div className="max-w-4xl mx-auto">
                    <div className="glass p-8 rounded-lg">
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                            Hi! I'm Harshvardhan Bhusari, a passionate Full Stack Developer with a keen interest in creating
                            beautiful, functional, and user-centric digital experiences. I specialize in modern web technologies
                            and love turning complex problems into simple, elegant solutions.
                        </p>

                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                            With expertise in both frontend and backend development, I build complete web applications from
                            the ground up. My journey in tech has been driven by curiosity and a constant desire to learn and
                            improve.
                        </p>

                        <p className="text-lg text-muted-foreground leading-relaxed">
                            When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                            or sharing knowledge with the developer community. I believe in writing clean, maintainable code and
                            following best practices to deliver high-quality solutions.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mt-12">
                        <div className="glass p-6 rounded-lg text-center">
                            <div className="text-3xl font-bold gradient-text mb-2">Fresher</div>
                            <div className="text-muted-foreground">Years Experience</div>
                        </div>
                        <div className="glass p-6 rounded-lg text-center">
                            <div className="text-3xl font-bold gradient-text mb-2">30+</div>
                            <div className="text-muted-foreground">Projects Completed</div>
                        </div>
                        <div className="glass p-6 rounded-lg text-center">
                            <div className="text-3xl font-bold gradient-text mb-2">15+</div>
                            <div className="text-muted-foreground">Technologies</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}