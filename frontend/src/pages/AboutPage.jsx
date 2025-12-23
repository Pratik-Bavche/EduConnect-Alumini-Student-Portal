import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
    GraduationCap,
    Users,
    Landmark,
    ShieldCheck,
    ArrowRight,
    CheckCircle2,
    UserPlus,
    FileCheck,
    Network,
    Lock
} from "lucide-react";

const AboutPage = () => {
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            {/* Navbar / Header */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 rounded-lg">
                            <GraduationCap className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-gray-900">EduConnect</span>
                    </div>
                    <div className="flex gap-4">
                        <Button variant="ghost" onClick={() => navigate('/login')}>Sign In</Button>
                        <Button onClick={() => navigate('/register')}>Register</Button>
                    </div>
                </div>
            </nav>

            <main className="pt-24 pb-20">
                {/* 1. Page Header */}
                <section className="container mx-auto px-6 mb-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600">
                            About the Platform
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                            A secure platform for alumni tracking, student verification, and professional networking.
                        </p>
                    </motion.div>
                </section>

                {/* 2. What is This Platform? */}
                <section className="container mx-auto px-6 mb-20">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="bg-secondary/30 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto border border-border/50 cursor-pointer hover:shadow-lg transition-all"
                    >
                        <h2 className="text-3xl font-bold mb-6">What is EduConnect?</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                            This platform is designed to help educational institutions securely manage alumni records,
                            verify students, and enable meaningful professional connections between students, alumni,
                            and institutions. It bridges the gap between academic records and professional networking.
                        </p>
                    </motion.div>
                </section>

                {/* 3. Who Can Use This Platform? */}
                <section className="container mx-auto px-6 mb-20">
                    <h2 className="text-3xl font-bold text-center mb-12">Who Can Use This Platform?</h2>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        <UserCard
                            icon={<GraduationCap className="w-10 h-10 text-blue-600" />}
                            title="Students & Alumni"
                            items={[
                                "Register and manage profiles",
                                "Connect with alumni network",
                                "Access career opportunities"
                            ]}
                        />
                        <UserCard
                            icon={<Users className="w-10 h-10 text-indigo-600" />}
                            title="Faculty & Staff"
                            items={[
                                "Verify student identities",
                                "Manage class-wise approvals",
                                "Upload official roll lists"
                            ]}
                        />
                        <UserCard
                            icon={<Landmark className="w-10 h-10 text-purple-600" />}
                            title="Institution Admin"
                            items={[
                                "Monitor alumni database",
                                "Generate detailed reports",
                                "Manage engagement activities"
                            ]}
                        />
                    </motion.div>
                </section>

                {/* 4. How the Platform Works */}
                <section className="bg-slate-50 dark:bg-slate-900/50 py-20 mb-20">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
                        <div className="grid md:grid-cols-4 gap-8 relative">
                            {/* Connector Line (Desktop) */}
                            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 -translate-y-1/2" />

                            <Step
                                icon={<UserPlus />}
                                step="1"
                                title="Register"
                                desc="Students/Alumni create their secure account"
                            />
                            <Step
                                icon={<FileCheck />}
                                step="2"
                                title="Verify"
                                desc="Staff verifies details against class records"
                            />
                            <Step
                                icon={<Network />}
                                step="3"
                                title="Connect"
                                desc="Access the alumni network & opportunities"
                            />
                            <Step
                                icon={<Landmark />}
                                step="4"
                                title="Manage"
                                desc="Institutions oversee records & engagement"
                            />
                        </div>
                    </div>
                </section>

                {/* 5. Key Features & 6. Why Needed */}
                <section className="container mx-auto px-6 mb-20">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-3xl font-bold mb-8">Key Features</h2>
                            <div className="space-y-4">
                                <FeatureItem text="Secure student verification system" />
                                <FeatureItem text="Role-based access control (RBAC)" />
                                <FeatureItem text="Comprehensive alumni tracking" />
                                <FeatureItem text="Events, reunions & announcements" />
                                <FeatureItem text="Advanced reports & analytics" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="bg-blue-600 text-white rounded-3xl p-10 shadow-xl cursor-pointer hover:shadow-2xl transition-all"
                        >
                            <h2 className="text-2xl font-bold mb-6">Why This Platform?</h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-blue-100 mb-2">ERP Systems</h3>
                                    <p className="text-blue-50/80">Focus mainly on academics and fees, lacking networking features.</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-blue-100 mb-2">Social Networks</h3>
                                    <p className="text-blue-50/80">Open to everyone but lack official verification and trust.</p>
                                </div>
                                <div className="mt-8 pt-8 border-t border-blue-500">
                                    <h3 className="text-xl font-bold mb-2">EduConnect Fills the Gap</h3>
                                    <p className="text-blue-50">We provide a trusted, verified environment specifically for your institution's community.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* 7. Security & Trust */}
                <section className="container mx-auto px-6 mb-20 text-center">
                    <div className="max-w-3xl mx-auto bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 rounded-2xl p-8 cursor-pointer hover:shadow-lg transition-all">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShieldCheck className="w-8 h-8 text-green-600 dark:text-green-400" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Security & Trust</h2>
                        <p className="text-lg text-muted-foreground">
                            All users are verified through institution-managed processes to ensure authenticity and data security.
                            We prioritize verified access and strict data privacy controls.
                        </p>
                    </div>
                </section>

                {/* 8. Call to Action */}
                <section className="container mx-auto px-6 text-center pb-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-12 text-white shadow-2xl"
                    >
                        <h2 className="text-4xl font-bold mb-6">Ready to Join Your Community?</h2>
                        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                            Connect with your peers, find mentors, and stay updated with your alma mater.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Button
                                size="lg"
                                variant="secondary"
                                className="h-14 px-8 text-lg rounded-full font-semibold"
                                onClick={() => navigate('/login')}
                            >
                                Sign In Now
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="h-14 px-8 text-lg rounded-full bg-transparent text-white border-white hover:bg-white hover:text-blue-600 transition-colors"
                                onClick={() => navigate('/register')}
                            >
                                Register as Student/Alumni <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    </motion.div>
                </section>
            </main>
        </div>
    );
};

// UI Components
const UserCard = ({ icon, title, items }) => (
    <Card className="border-border/50 hover:shadow-lg transition-all duration-300 cursor-pointer">
        <CardHeader className="text-center pt-8 pb-4">
            <div className="mx-auto bg-secondary w-20 h-20 rounded-full flex items-center justify-center mb-4">
                {icon}
            </div>
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <ul className="space-y-3">
                {items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground text-sm">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </CardContent>
    </Card>
);

const Step = ({ icon, step, title, desc }) => (
    <div className="relative bg-background p-6 rounded-2xl border border-border/50 shadow-sm z-10 text-center hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 text-xl font-bold">
            {step}
        </div>
        <div className="mb-3 text-primary">{icon}</div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
);

const FeatureItem = ({ text }) => (
    <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm cursor-pointer hover:shadow-md transition-all">
        <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>
        <span className="font-medium text-lg">{text}</span>
    </div>
);

export default AboutPage;
