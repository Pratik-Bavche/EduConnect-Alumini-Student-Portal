import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Phone, Shield, Lock, Save, ArrowLeft, Loader2, Edit2 } from "lucide-react";
import { toast } from "sonner";

const AdminProfile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/login');
            return;
        }
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.role !== 'admin') {
            navigate('/');
        }
        setUser(parsedUser);
        setFormData(parsedUser);
    }, [navigate]);

    if (!user) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setIsLoading(true);
        // Simulate save
        setTimeout(() => {
            const updatedUser = { ...user, ...formData };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setIsEditing(false);
            setIsLoading(false);
            toast.success("Profile updated successfully!");
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50 shadow-sm">
                <div className="container mx-auto flex items-center justify-between max-w-4xl">
                    <Button variant="ghost" onClick={() => navigate('/admin-dashboard')} className="gap-2">
                        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                    </Button>
                    <h1 className="font-bold text-lg text-gray-800">Admin Profile</h1>
                    <div className="w-20"></div>
                </div>
            </div>

            <div className="container mx-auto max-w-4xl px-4 py-8 space-y-6">

                {/* Profile Header Card */}
                <Card className="overflow-hidden border-0 shadow-md">
                    <div className="h-32 bg-gradient-to-r from-red-600 to-pink-700"></div>
                    <CardContent className="px-8 pb-8">
                        <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 gap-6">
                            <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                                <AvatarImage src={`https://ui-avatars.com/api/?name=${user.name}&background=random`} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 text-center md:text-left mb-2 space-y-1">
                                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600">
                                    <Shield className="w-4 h-4" />
                                    <span>Super Admin</span>
                                </div>
                            </div>
                            <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? "ghost" : "default"} className="mb-4 md:mb-0">
                                {isEditing ? "Cancel" : <><Edit2 className="w-4 h-4 mr-2" /> Edit Profile</>}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="w-5 h-5 text-red-500" /> Personal Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Full Name</Label>
                                <Input name="name" value={formData.name || ''} onChange={handleChange} disabled={!isEditing} />
                            </div>
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-gray-400" />
                                    <Input value={user.email} disabled className="bg-gray-50" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Phone Number</Label>
                                <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-gray-400" />
                                    <Input name="phone" value={formData.phone || ''} onChange={handleChange} disabled={!isEditing} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Role Details & Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="w-5 h-5 text-indigo-500" /> Role Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Role Type</Label>
                                <Input value="Super Admin" disabled className="bg-gray-50 font-bold text-indigo-600" />
                            </div>
                            <div className="space-y-2">
                                <Label>Assigned Institution</Label>
                                <Input value="DYPCOE" disabled className="bg-gray-50" />
                            </div>

                            <div className="pt-4 border-t mt-4">
                                <Button variant="outline" className="w-full text-left justify-start cursor-pointer hover:bg-gray-100">
                                    <Lock className="w-4 h-4 mr-2" /> Change Password
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {isEditing && (
                    <div className="flex justify-end">
                        <Button onClick={handleSave} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer px-8">
                            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            <Save className="w-4 h-4 mr-2" /> Save Changes
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminProfile;
