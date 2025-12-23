import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Add this
    const [isLoading, setIsLoading] = useState(false);
    const [role, setRole] = useState(location.state?.role || 'student'); // Use passed state or default to 'student'

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, role }), // Send selected role
            });

            const data = await response.json();

            if (response.ok) {
                // Save token and user details
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data));

                toast.success(`Login Successful! Welcome ${data.name}`);

                if (data.role === 'student' || data.role === 'alumni') {
                    navigate('/student-dashboard');
                } else if (data.role === 'staff') {
                    navigate('/staff-dashboard');
                } else if (data.role === 'admin') {
                    navigate('/admin-dashboard');
                } else {
                    navigate('/'); // Default fallback for now
                }
            } else {
                toast.error(data.message || "Invalid credentials");
            }
        } catch (error) {
            console.error("Login Error:", error);
            toast.error("Unable to connect to server");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-secondary/30 flex items-center justify-center p-4">
            <div className="absolute top-4 left-4">
                <Button
                    variant="ghost"
                    onClick={() => navigate('/')}
                    className="group flex items-center gap-2 hover:bg-white hover:text-blue-600 transition-all rounded-full px-4 cursor-pointer shadow-sm hover:shadow-md"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                </Button>
            </div>

            <Card className="w-full max-w-md border-border/50 shadow-xl bg-background/95 backdrop-blur">
                <CardHeader className="text-center space-y-2">
                    <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                        <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold">
                        {role === 'admin' ? 'Admin Login' : role === 'staff' ? 'Faculty Login' : 'Student Login'}
                    </CardTitle>
                    <CardDescription>
                        Enter your credentials to access the portal
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        {/* Role Selection Tabs (Simplified) */}
                        <div className="grid grid-cols-3 gap-2 mb-6 p-1 bg-secondary rounded-lg">
                            {['student', 'staff', 'admin'].map((r) => (
                                <button
                                    key={r}
                                    type="button"
                                    onClick={() => setRole(r)}
                                    className={`text-sm font-medium py-1.5 rounded-md transition-all cursor-pointer ${role === r
                                        ? 'bg-background shadow-sm text-foreground border-2 border-blue-600'
                                        : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    {r.charAt(0).toUpperCase() + r.slice(1)}
                                </button>
                            ))}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">
                                {role === 'student' ? 'Email or Roll Number' : 'Email Address'}
                            </Label>
                            <Input
                                id="email"
                                placeholder={
                                    role === 'student'
                                        ? "e.g. 3A01 or student@example.com"
                                        : role === 'staff'
                                            ? "staff@gmail.com"
                                            : "admin@college.edu"
                                }
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <a href="#" className="text-xs text-primary hover:underline">
                                    Forgot password?
                                </a>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all cursor-pointer" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 text-center text-sm text-muted-foreground">
                    {(role === 'student' || role === 'staff') && (
                        <p>
                            Don't have an account?{" "}
                            <button
                                onClick={() => navigate('/register', { state: { role } })}
                                className="text-primary font-medium hover:underline hover:text-blue-700 cursor-pointer transition-colors"
                            >
                                Register here
                            </button>
                        </p>
                    )}
                    {role === 'admin' && (
                        <p className="text-xs">
                            Admin accounts are created by the organization.
                        </p>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
};

export default LoginPage;
