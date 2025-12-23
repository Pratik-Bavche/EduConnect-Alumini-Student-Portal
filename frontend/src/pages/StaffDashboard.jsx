import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    LayoutDashboard,
    UserCheck,
    Upload,
    Users,
    MessageSquare,
    LogOut,
    Menu,
    Bell,
    CheckCircle,
    XCircle,
    Search,
    FileSpreadsheet,
    AlertCircle,
    Activity,
    BookOpen,
    ShieldAlert
} from "lucide-react";
import { toast } from 'sonner';

const StaffDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/login');
            return;
        }
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.role !== 'staff') {
            navigate('/'); // Access denied
        }
        setUser(parsedUser);
    }, [navigate]);

    if (!user) return null;

    const isApproved = user.status === 'approved' || user.isVerified === true; // Handle compatibility

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.success("Logged out successfully");
        navigate('/');
    };

    // --- Components for each View ---

    const SidebarItem = ({ icon, label, id, disabled }) => (
        <button
            onClick={() => !disabled && setActiveTab(id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === id
                ? 'bg-blue-600 text-white'
                : disabled
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
        >
            {icon}
            <span className="font-medium">{label}</span>
            {disabled && <LockIcon className="w-3 h-3 ml-auto opacity-50" />}
        </button>
    );

    const PendingStateView = () => (
        <div className="flex flex-col items-center justify-center h-[80vh] text-center p-6">
            <div className="bg-yellow-100 p-6 rounded-full mb-6">
                <ShieldAlert className="w-16 h-16 text-yellow-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Verification Pending</h1>
            <p className="text-lg text-gray-500 max-w-lg mb-8">
                Welcome, {user.name}. Your staff account is currently under admin verification.
                You will get access to student approvals and class management once verified.
            </p>
            <div className="flex gap-4">
                <Button variant="outline" onClick={() => navigate('/help')}>
                    Contact Admin
                </Button>
                <Button variant="destructive" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" /> Logout
                </Button>
            </div>
        </div>
    );

    // Mock Data for Pending Requests
    const mockRequests = [
        { id: 1, roll: '3A01', name: 'Rahul Sharma', year: '3rd', div: 'A', status: 'Pending' },
        { id: 2, roll: '3A02', name: 'Priya Patel', year: '3rd', div: 'A', status: 'Pending' },
        { id: 3, roll: '3A05', name: 'Amit Kumar', year: '3rd', div: 'A', status: 'Pending' },
    ];

    const DashboardHome = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Pending Student Requests */}
            <Card className="hover:shadow-lg transition-all cursor-pointer border-l-4 border-l-yellow-500" onClick={() => setActiveTab('requests')}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Pending Requests</CardTitle>
                    <UserCheck className="w-5 h-5 text-yellow-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-gray-500 mt-1">Students awaiting approval</p>
                    <Button variant="link" className="px-0 text-blue-600 h-auto mt-2">View Requests &rarr;</Button>
                </CardContent>
            </Card>

            {/* 2. Approved Students */}
            <Card className="hover:shadow-lg transition-all cursor-pointer border-l-4 border-l-green-500" onClick={() => setActiveTab('approved')}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Approved Students</CardTitle>
                    <Users className="w-5 h-5 text-green-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">48</div>
                    <p className="text-xs text-gray-500 mt-1">Total Verified in Class</p>
                    <Button variant="link" className="px-0 text-blue-600 h-auto mt-2">View List &rarr;</Button>
                </CardContent>
            </Card>

            {/* 3. Upload Roll Number List */}
            <Card className="hover:shadow-lg transition-all cursor-pointer border-l-4 border-l-blue-500" onClick={() => setActiveTab('upload')}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Upload Roll List</CardTitle>
                    <Upload className="w-5 h-5 text-blue-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">Upload</div>
                    <p className="text-xs text-gray-500 mt-1">Official Excel for auto-verification</p>
                    <Button variant="link" className="px-0 text-blue-600 h-auto mt-2">Upload Excel &rarr;</Button>
                </CardContent>
            </Card>

            {/* 4. Recent Activities */}
            <Card className="hover:shadow-lg transition-all border-l-4 border-l-purple-500">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Recent Activity</CardTitle>
                    <Activity className="w-5 h-5 text-purple-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-sm font-medium">Rahul Sharma Approved</div>
                    <p className="text-xs text-gray-500 mt-1">2 mins ago</p>
                    <Button variant="link" className="px-0 text-blue-600 h-auto mt-2">View Activity &rarr;</Button>
                </CardContent>
            </Card>

            {/* 5. Messages / Notifications */}
            <Card className="hover:shadow-lg transition-all cursor-pointer border-l-4 border-l-red-500" onClick={() => setActiveTab('messages')}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Messages</CardTitle>
                    <Bell className="w-5 h-5 text-red-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-gray-500 mt-1">New system alerts</p>
                    <Button variant="link" className="px-0 text-blue-600 h-auto mt-2">Open Messages &rarr;</Button>
                </CardContent>
            </Card>

            {/* 6. My Assigned Class */}
            <Card className="hover:shadow-lg transition-all border-l-4 border-l-indigo-500 bg-gray-50">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">My Assigned Class</CardTitle>
                    <BookOpen className="w-5 h-5 text-indigo-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-lg font-bold">{user.assignedClass || "Not Assigned"}</div>
                    <p className="text-xs text-gray-500 mt-1">{user.department}</p>
                    <p className="text-xs text-gray-400 mt-2">Read-only information</p>
                </CardContent>
            </Card>
        </div>
    );

    const StudentRequestsView = () => (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-2xl font-bold">Student Verification Requests</h2>
                <div className="flex gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input placeholder="Search by Roll No..." className="pl-9" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Roll No</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Year</TableHead>
                            <TableHead>Division</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockRequests.map((req) => (
                            <TableRow key={req.id}>
                                <TableCell className="font-medium">{req.roll}</TableCell>
                                <TableCell>{req.name}</TableCell>
                                <TableCell>{req.year}</TableCell>
                                <TableCell>{req.div}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                        {req.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                        <CheckCircle className="w-4 h-4 mr-1" /> Approve
                                    </Button>
                                    <Button size="sm" variant="destructive">
                                        <XCircle className="w-4 h-4 mr-1" /> Reject
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );

    const UploadRollView = () => (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Upload Official Roll Number List</h2>
                <p className="text-gray-500">Upload an Excel file (.xlsx) containing student roll numbers for auto-approval.</p>
            </div>

            <Card className="border-dashed border-2 border-blue-200 bg-blue-50/50">
                <CardContent className="flex flex-col items-center justify-center py-12">
                    <div className="bg-blue-100 p-4 rounded-full mb-4">
                        <Upload className="w-10 h-10 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Drag & Drop or Click to Upload</h3>
                    <p className="text-sm text-gray-500 mb-6">Supported format: .xlsx only</p>
                    <Button>Choose File</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Upload History</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableHead>File Name</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium flex items-center gap-2">
                                    <FileSpreadsheet className="w-4 h-4 text-green-600" /> 3rd_Year_DivA.xlsx
                                </TableCell>
                                <TableCell>12-May-2025</TableCell>
                                <TableCell><Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );

    // --- Main Render ---

    if (!isApproved) {
        return (
            <div className="min-h-screen bg-gray-50">
                <PendingStateView />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className={`bg-white border-r border-gray-200 fixed lg:static inset-y-0 left-0 z-50 w-64 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="h-16 flex items-center px-6 border-b border-gray-100">
                    <span className="text-xl font-bold text-blue-600">EduConnect Staff</span>
                </div>
                <div className="p-4 space-y-2">
                    <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" id="dashboard" />
                    <SidebarItem icon={<UserCheck size={20} />} label="Student Requests" id="requests" />
                    <SidebarItem icon={<Upload size={20} />} label="Upload Roll List" id="upload" />
                    <SidebarItem icon={<Users size={20} />} label="Approved Students" id="approved" />
                    <SidebarItem icon={<MessageSquare size={20} />} label="Messages" id="messages" />
                </div>
                <div className="absolute bottom-0 w-full p-4 border-t border-gray-100">
                    <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50" onClick={handleLogout}>
                        <LogOut className="w-4 h-4 mr-2" /> Logout
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                            <Menu className="w-5 h-5" />
                        </Button>
                        <h1 className="text-xl font-semibold text-gray-800">
                            {activeTab === 'dashboard' && 'Overview'}
                            {activeTab === 'requests' && 'Student Verification'}
                            {activeTab === 'upload' && 'Upload Data'}
                            {activeTab === 'approved' && 'Approved Students'}
                        </h1>
                    </div>
                    <div className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate('/staff-profile')}>
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.assignedClass || "Class Not Assigned"}</p>
                        </div>
                        <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                            {user.name.charAt(0)}
                        </div>
                    </div>
                </header>

                {/* Body */}
                <main className="p-6 flex-1 overflow-auto">
                    {activeTab === 'dashboard' && <DashboardHome />}
                    {activeTab === 'requests' && <StudentRequestsView />}
                    {activeTab === 'upload' && <UploadRollView />}
                    {activeTab === 'approved' && <div className="text-center text-gray-500 mt-20">Approved Student List Component Placeholer</div>}
                    {activeTab === 'messages' && <div className="text-center text-gray-500 mt-20">Messages Component Placeholder</div>}
                </main>
            </div>
        </div>
    );
};

const LockIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
);

export default StaffDashboard;
