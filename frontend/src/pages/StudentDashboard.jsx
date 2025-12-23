import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    User,
    Users,
    Briefcase,
    GraduationCap,
    Calendar,
    Lock,
    LogOut,
    AlertTriangle,
    CheckCircle,
    ArrowRight,
    MessageCircle
} from "lucide-react";
import { toast } from "sonner";

const StudentDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/login');
            return;
        }
        const parsedUser = JSON.parse(storedUser);

        // RBAC Check: Ensure only Students/Alumni access this page
        if (parsedUser.role === 'staff') {
            navigate('/staff-dashboard'); // Redirect incorrect role
            return;
        } else if (parsedUser.role === 'admin') {
            navigate('/admin-dashboard');
            return;
        } else if (parsedUser.role !== 'student' && parsedUser.role !== 'alumni') {
            navigate('/login'); // Unknown role
            return;
        }

        setUser(parsedUser);
    }, [navigate]);

    if (!user) return null;

    const isApproved = user.status === 'approved';

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.success("Logged out successfully");
        navigate('/');
    };

    const dashboardItems = [
        {
            title: "My Profile",
            icon: <User className="w-8 h-8 text-blue-500" />,
            description: "View and edit your personal details",
            action: () => navigate('/student-profile'),
            locked: false
        },
        {
            title: "Alumni Directory",
            icon: <Users className="w-8 h-8 text-indigo-500" />,
            description: "Connect with seniors and peers",
            action: () => navigate('/alumni-directory'),
            locked: !isApproved
        },
        {
            title: "Jobs & Opportunities",
            icon: <Briefcase className="w-8 h-8 text-green-500" />,
            description: "Explore career opportunities",
            action: () => navigate('/jobs'),
            locked: !isApproved
        },
        {
            title: "Mentorship",
            icon: <GraduationCap className="w-8 h-8 text-purple-500" />,
            description: "Find a mentor for guidance",
            action: () => navigate('/mentorship'),
            locked: !isApproved
        },
        {
            title: "Events",
            icon: <Calendar className="w-8 h-8 text-orange-500" />,
            description: isApproved ? "Register for upcoming events" : "View upcoming event titles",
            action: () => navigate('/events'),
            locked: false // partially accessible, logic handled inside page or here? content says "Events details (only titles, no RSVP)" so accessible but limited.
        },
        {
            title: "Help & Support",
            icon: <MessageCircle className="w-8 h-8 text-rose-500" />,
            description: "Contact support or view FAQs",
            action: () => navigate('/help'),
            locked: false
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Top Navigation */}
            <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 rounded-lg">
                        <GraduationCap className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-gray-900">EduConnect</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 mr-4">
                        <img
                            src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
                            alt="Profile"
                            className="w-8 h-8 rounded-full"
                        />
                        <span className="font-medium hidden md:block">{user.name}</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                        <LogOut className="w-4 h-4 mr-2" /> Logout
                    </Button>
                </div>
            </nav>

            <div className="container mx-auto px-6 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome, {user.name} 👋</h1>
                    <p className="text-gray-500">Manage your profile and connect with your institution.</p>
                </div>

                {/* Status Banner */}
                <div className={`rounded-xl p-4 mb-8 border ${isApproved ? 'bg-green-50 border-green-100' : 'bg-yellow-50 border-yellow-100'}`}>
                    <div className="flex items-start gap-3">
                        {isApproved ? (
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        ) : (
                            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        )}
                        <div>
                            <h3 className={`font-semibold ${isApproved ? 'text-green-800' : 'text-yellow-800'}`}>
                                Account Status: <span className="uppercase">{user.status || 'PENDING'}</span>
                            </h3>
                            <p className={`text-sm mt-1 ${isApproved ? 'text-green-700' : 'text-yellow-700'}`}>
                                {isApproved
                                    ? "You have full access to all features. Start networking!"
                                    : "Your account is currently under verification by the staff. Some features are restricted until approval."
                                }
                            </p>
                        </div>
                    </div>
                </div>

                {/* Dashboard Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dashboardItems.map((item, index) => (
                        <Card
                            key={index}
                            className={`relative border-gray-200 transition-all duration-300 ${item.locked
                                ? 'bg-gray-50 cursor-not-allowed opacity-80'
                                : 'hover:shadow-lg cursor-pointer hover:-translate-y-1 bg-white'
                                }`}
                            onClick={!item.locked ? item.action : undefined}
                        >
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <div className={`p-2 rounded-lg ${item.locked ? 'bg-gray-200' : 'bg-blue-50'}`}>
                                    {item.icon}
                                </div>
                                {item.locked && <Lock className="w-5 h-5 text-gray-400" />}
                            </CardHeader>
                            <CardContent>
                                <CardTitle className="text-lg font-bold mb-2">{item.title}</CardTitle>
                                <CardDescription>{item.description}</CardDescription>
                                {!item.locked && (
                                    <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
                                        Access Now <ArrowRight className="w-4 h-4 ml-1" />
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
