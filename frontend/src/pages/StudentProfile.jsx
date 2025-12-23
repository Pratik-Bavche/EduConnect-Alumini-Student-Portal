import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Save, User, GraduationCap, Briefcase, Mail, Phone, MapPin, BadgeCheck, Clock } from "lucide-react";
import { toast } from 'sonner';

const StudentProfile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/login');
            return;
        }
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setFormData(parsedUser);
    }, [navigate]);

    if (!user) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                // Update local state with the returned (updated) user data
                const mergedUser = { ...user, ...data }; // Merge to be safe
                setUser(mergedUser);
                setFormData(mergedUser);
                localStorage.setItem('user', JSON.stringify(mergedUser));

                setIsEditing(false);
                toast.success("Profile updated successfully!");
            } else {
                toast.error(data.message || "Failed to update profile");
            }
        } catch (error) {
            console.error("Update Error:", error);
            toast.error("Network error. Is backend running?");
        }
    };

    const isAlumni = user.role === 'alumni' || user.role === 'student'; // Assuming combined dashboard, but role differentiates specific fields

    return (
        <div className="min-h-screen bg-gray-50/50 pb-20">
            {/* Header / Nav */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
                <div className="container mx-auto flex items-center justify-between">
                    <Button variant="ghost" onClick={() => navigate('/student-dashboard')} className="gap-2">
                        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                    </Button>
                    <h1 className="font-bold text-lg">My Profile</h1>
                    <div className="w-20"></div> {/* Spacer for center alignment */}
                </div>
            </div>

            <div className="container mx-auto px-6 py-8 max-w-4xl">
                {/* Profile Header Card */}
                <Card className="mb-8 border-none shadow-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white overflow-hidden">
                    <CardContent className="p-8">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="relative">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${user.name}&background=fff&color=2563EB&size=128`}
                                    alt="Profile"
                                    className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white/20 shadow-xl"
                                />
                                <div className="absolute bottom-1 right-1 bg-white rounded-full p-1.5 shadow-lg">
                                    {user.status === 'approved' ? <BadgeCheck className="w-5 h-5 text-green-600" /> : <Clock className="w-5 h-5 text-yellow-600" />}
                                </div>
                            </div>
                            <div className="text-center md:text-left flex-1 space-y-2">
                                <h1 className="text-3xl font-bold">{formData.name}</h1>
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-blue-100">
                                    <span className="bg-white/10 px-3 py-1 rounded-full text-sm font-medium capitalize flex items-center gap-1">
                                        <User className="w-3 h-3" /> {user.role}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize flex items-center gap-1 ${user.status === 'approved' ? 'bg-green-500/20 text-green-100' : 'bg-yellow-500/20 text-yellow-100'}`}>
                                        {user.status === 'approved' ? 'Verified' : 'Verification Expected'}
                                    </span>
                                </div>
                            </div>
                            <div>
                                {!isEditing ? (
                                    <Button onClick={() => setIsEditing(true)} className="bg-white text-blue-600 hover:bg-blue-50 border-none shadow-lg">
                                        Edit Profile
                                    </Button>
                                ) : (
                                    <div className="flex gap-2">
                                        <Button onClick={() => setIsEditing(false)} variant="ghost" className="text-white hover:bg-white/10">
                                            Cancel
                                        </Button>
                                        <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white border-none shadow-lg">
                                            <Save className="w-4 h-4 mr-2" /> Save
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Personal Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="w-5 h-5 text-blue-500" /> Personal Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Full Name</Label>
                                <Input name="name" value={formData.name || ''} disabled={!isEditing} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input name="email" value={formData.email || ''} disabled={true} className="bg-gray-50" /> {/* Email usually requires verifying to change */}
                            </div>
                            <div className="space-y-2">
                                <Label>Phone Number</Label>
                                <Input name="phone" value={formData.phone || ''} disabled={!isEditing} onChange={handleChange} placeholder="+1 234 567 890" />
                            </div>
                            <div className="space-y-2">
                                <Label>Location (City, Country)</Label>
                                <Input name="location" value={formData.location || ''} disabled={!isEditing} onChange={handleChange} placeholder="e.g. New York, USA" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Academic Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <GraduationCap className="w-5 h-5 text-indigo-500" /> Academic Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Roll Number</Label>
                                    <Input name="rollNo" value={formData.rollNo || ''} disabled={!isEditing} onChange={handleChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Division</Label>
                                    <Input name="division" value={formData.division || ''} disabled={!isEditing} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Current Year</Label>
                                {isEditing ? (
                                    <select
                                        name="year"
                                        value={formData.year || ''}
                                        onChange={handleChange}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <option value="">Select Year</option>
                                        <option value="1">1st Year</option>
                                        <option value="2">2nd Year</option>
                                        <option value="3">3rd Year</option>
                                        <option value="4">4th Year</option>
                                    </select>
                                ) : (
                                    <Input name="year" value={formData.year ? `${formData.year}${['st', 'nd', 'rd', 'th'][formData.year - 1] || 'th'} Year` : ''} disabled={true} className="bg-gray-50" />
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label>Department</Label>
                                <Input name="department" value={formData.department || ''} disabled={!isEditing} onChange={handleChange} placeholder="e.g. Computer Engineering" />
                            </div>
                            <div className="space-y-2">
                                <Label>Graduation Year (Expected)</Label>
                                <Input name="gradYear" value={formData.gradYear || ''} disabled={!isEditing} onChange={handleChange} placeholder="e.g. 2026" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Career Details (Alumni Only or Students with internships) */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-green-500" /> Career & Skills
                            </CardTitle>
                            <CardDescription>Share your professional journey to connect with others.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Current Company / Organization</Label>
                                    <Input name="company" value={formData.company || ''} disabled={!isEditing} onChange={handleChange} placeholder="Where are you working?" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Job Role / Position</Label>
                                    <Input name="position" value={formData.position || ''} disabled={!isEditing} onChange={handleChange} placeholder="e.g. Software Engineer" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Skills</Label>
                                <Input name="skills" value={formData.skills || ''} disabled={!isEditing} onChange={handleChange} placeholder="e.g. React, Node.js, Python (Comma separated)" />
                            </div>
                            <div className="space-y-2">
                                <Label>LinkedIn Profile URL</Label>
                                <Input name="linkedin" value={formData.linkedin || ''} disabled={!isEditing} onChange={handleChange} placeholder="https://linkedin.com/in/username" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default StudentProfile;
