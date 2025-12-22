import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { GraduationCap, Users, UserPlus, ArrowRight, ShieldCheck } from "lucide-react";

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-100 shadow-md">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('/')}>
                        <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 rounded-xl shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300">
                            <GraduationCap className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-700 drop-shadow-sm">
                            EduConnect
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" className="rounded-full cursor-pointer hover:bg-blue-50 text-base font-medium" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
                            About Platform
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
                        >
                            Stay Connected with <br />
                            <span className="text-primary">Your Institution</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
                        >
                            A secure and centralized platform designed for alumni tracking, student verification, and long-term professional networking, enabling trusted connections between students, alumni, and institutions.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <Button size="lg" className="h-12 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer" onClick={() => navigate('/login')}>
                                Sign In <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button size="lg" variant="outline" className="h-12 px-8 text-lg rounded-full hover:bg-transparent hover:border-blue-600 dark:hover:bg-blue-900/20 cursor-pointer transition-all duration-300" onClick={() => navigate('/register')}>
                                Sign Up
                            </Button>
                        </motion.div>
                    </div>
                </div>

                {/* Abstract Background Blobs */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-secondary/50">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<ShieldCheck className="h-10 w-10 text-primary" />}
                            title="Verified Profiles"
                            description="Official verification system ensures 100% authentic alumni and student profiles via college records."
                        />
                        <FeatureCard
                            icon={<Users className="h-10 w-10 text-primary" />}
                            title="Alumni Network"
                            description="Connect with seniors, find mentors, and explore career opportunities within your college network."
                        />
                        <FeatureCard
                            icon={<UserPlus className="h-10 w-10 text-primary" />}
                            title="Easy Onboarding"
                            description="Seamless registration process with automated role assignment and class-based grouping."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="p-8 rounded-2xl bg-background border border-border/50 shadow-sm hover:shadow-md transition-all cursor-pointer"
    >
        <div className="mb-6 p-4 bg-primary/5 rounded-2xl w-fit">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">
            {description}
        </p>
    </motion.div>
);

export default LandingPage;
