import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Basic Info, 2: Academic Info, 3: Password
    const [isLoading, setIsLoading] = useState(false);

    // Form State (Simplified)
    const [formData, setFormData] = useState({
        role: 'student', // 'student' | 'staff'
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        rollNo: '', // Student only
        year: '',   // Student only
        division: '', // Student only
        department: '', // Staff only
        designation: '', // Staff only
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const validateStep = (currentStep) => {
        if (currentStep === 1) {
            if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.phone.trim()) {
                toast.error("Please fill in all fields (Name, Email, Phone)");
                return false;
            }
        }
        if (currentStep === 2) {
            if (formData.role === 'student') {
                if (!formData.rollNo.trim() || !formData.year || !formData.division.trim()) {
                    toast.error("Please fill in all academic details");
                    return false;
                }
            } else {
                if (!formData.department.trim() || !formData.designation.trim()) {
                    toast.error("Please fill in all staff details");
                    return false;
                }
            }
        }
        if (currentStep === 3) {
            if (!formData.password || !formData.confirmPassword) {
                toast.error("Please create a password");
                return false;
            }
            if (formData.password !== formData.confirmPassword) {
                toast.error("Passwords do not match");
                return false;
            }
        }
        return true;
    };

    const handleNext = () => {
        if (validateStep(step)) {
            setStep(step + 1);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateStep(3)) return;

        setIsLoading(true);

        // Prepare payload: Combine firstName/lastName into 'name'
        const payload = {
            ...formData,
            name: `${formData.firstName} ${formData.lastName}`,
        };

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Registration Successful! Please login.");
                navigate('/login');
            } else {
                toast.error(data.message || "Registration failed");
            }
        } catch (error) {
            console.error("Registration Error:", error);
            toast.error("Something went wrong. Is the backend running?");
        } finally {
            setIsLoading(false);
        }
    };

    // Helper to render current step content
    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-4">
                        {/* Role Selection */}
                        <div className="flex gap-4 p-1 bg-secondary rounded-lg mb-4">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, role: 'student' })}
                                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${formData.role === 'student' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                            >
                                Student / Alumni
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, role: 'staff' })}
                                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${formData.role === 'staff' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                            >
                                Faculty / Staff
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input id="firstName" placeholder="John" value={formData.firstName} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input id="lastName" placeholder="Doe" value={formData.lastName} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" type="tel" placeholder="+1 234 567 890" value={formData.phone} onChange={handleChange} required />
                        </div>
                        <Button type="button" className="w-full mt-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all cursor-pointer" onClick={handleNext}>
                            Next: Academic Info
                        </Button>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-4">
                        <div className="pt-2 pb-4">
                            <div className="text-sm font-medium text-muted-foreground mb-4 bg-secondary/50 p-3 rounded-md border border-border/50">
                                <p>{formData.role === 'student' ? '🎓 Please enter your official academic details.' : '💼 Please enter your faculty details.'}</p>
                            </div>

                            {formData.role === 'student' ? (
                                // Student Fields
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="rollNo">Roll Number</Label>
                                        <Input id="rollNo" placeholder="e.g. 3A01" value={formData.rollNo} onChange={handleChange} required />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="year">Current Year</Label>
                                            <select
                                                id="year"
                                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                                value={formData.year}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Select Year</option>
                                                <option value="1">1st Year</option>
                                                <option value="2">2nd Year</option>
                                                <option value="3">3rd Year</option>
                                                <option value="4">4th Year</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="division">Division</Label>
                                            <Input id="division" placeholder="e.g. A" value={formData.division} onChange={handleChange} required />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                // Staff Fields
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="department">Department</Label>
                                        <Input id="department" placeholder="e.g. Computer Engineering" value={formData.department} onChange={handleChange} required />
                                    </div>
                                    <div className="space-y-2 mt-4">
                                        <Label htmlFor="designation">Designation</Label>
                                        <Input id="designation" placeholder="e.g. Assistant Professor" value={formData.designation} onChange={handleChange} required />
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="flex gap-3 mt-2">
                            <Button type="button" variant="outline" className="w-1/3 rounded-full hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 transition-all cursor-pointer" onClick={() => setStep(1)}>Back</Button>
                            <Button type="button" className="w-2/3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all cursor-pointer" onClick={handleNext}>Next: Security</Button>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="password">Create Password</Label>
                            <Input id="password" type="password" value={formData.password} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input id="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required />
                        </div>

                        <div className="flex gap-3 mt-4">
                            <Button type="button" variant="outline" className="w-1/3 rounded-full hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 transition-all cursor-pointer" onClick={() => setStep(2)}>Back</Button>
                            <Button type="submit" className="w-2/3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all cursor-pointer" disabled={isLoading}>
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <span className="flex items-center justify-center">Complete Registration <CheckCircle2 className="ml-2 h-4 w-4" /></span>}
                            </Button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    }

    return (
        <div className="min-h-screen bg-secondary/30 flex items-center justify-center p-4">
            <div className="absolute top-4 left-4">
                <Button
                    variant="ghost"
                    onClick={() => navigate('/login')}
                    className="group flex items-center gap-2 hover:bg-white hover:text-blue-600 transition-all rounded-full px-4 cursor-pointer shadow-sm hover:shadow-md"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
                </Button>
            </div>

            <Card className="w-full max-w-lg border-border/50 shadow-xl bg-background/95 backdrop-blur">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Student Registration</CardTitle>
                    <CardDescription>
                        Join the Alumni network. Step {step} of 3.
                    </CardDescription>
                    {/* Progress Bar */}
                    <div className="w-full bg-secondary h-1.5 mt-2 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all duration-500 ease-in-out"
                            style={{ width: `${(step / 3) * 100}%` }}
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        {renderStep()}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default RegisterPage;
