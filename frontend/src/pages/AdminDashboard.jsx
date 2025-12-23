import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    LayoutDashboard,
    UserCheck,
    Users,
    FileText,
    Calendar,
    Bell,
    LogOut,
    Menu,
    Search,
    CheckCircle,
    XCircle,
    Eye,
    Shield
} from "lucide-react";
import { toast } from 'sonner';

const AdminDashboard = () => {
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
        if (parsedUser.role !== 'admin') {
            navigate('/'); // Access denied
        }
        setUser(parsedUser);
    }, [navigate]);

    if (!user) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Loading Dashboard...</span>
            </div>
        );
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.success("Logged out successfully");
        navigate('/');
    };

    // --- Mock Data ---
    const [pendingStaff, setPendingStaff] = useState([
        { id: 1, name: 'Mr. Amit Verma', email: 'amit@dypcoe.edu', dept: 'CSE', role: 'Staff', status: 'Pending', assignedYear: '3rd Year' },
        { id: 2, name: 'Ms. Priya Singh', email: 'priya@dypcoe.edu', dept: 'ENTC', role: 'Staff', status: 'Pending', assignedYear: '2nd Year' },
        { id: 3, name: 'Dr. R.K. Patil', email: 'rkpatil@dypcoe.edu', dept: 'Mech', role: 'Staff', status: 'Pending', assignedYear: '4th Year' },
    ]);

    const handleAssignYearChange = (id, newYear) => {
        setPendingStaff(pendingStaff.map(s => s.id === id ? { ...s, assignedYear: newYear } : s));
    };

    const handleApprove = (staff) => {
        toast.success(`Approved ${staff.name} for ${staff.assignedYear}`);
        // Here you would API call to update status='approved' and assignedYear=staff.assignedYear
    };

    // --- Components ---

    const SidebarItem = ({ icon, label, id }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer ${activeTab === id
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
        >
            {icon}
            <span className="font-medium">{label}</span>
        </button>
    );

    const DashboardOverview = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Pending Staff Approvals */}
            <Card className="hover:shadow-lg transition-all cursor-pointer border-l-4 border-l-yellow-500" onClick={() => setActiveTab('staff_approvals')}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Pending Staff Approvals</CardTitle>
                    <UserCheck className="w-5 h-5 text-yellow-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{pendingStaff.length}</div>
                    <p className="text-xs text-gray-500 mt-1">Staff accounts waiting for approval</p>
                    <Button variant="link" className="px-0 text-blue-600 h-auto mt-2">Review Staff &rarr;</Button>
                </CardContent>
            </Card>

            {/* 2. Total Students & Alumni */}
            <Card className="hover:shadow-lg transition-all cursor-pointer border-l-4 border-l-blue-500">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Total Students & Alumni</CardTitle>
                    <Users className="w-5 h-5 text-blue-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">1,245</div>
                    <p className="text-xs text-gray-500 mt-1">Registered users</p>
                    <Button variant="link" className="px-0 text-blue-600 h-auto mt-2">View Users &rarr;</Button>
                </CardContent>
            </Card>

            {/* 3. Staff Overview */}
            <Card className="hover:shadow-lg transition-all cursor-pointer border-l-4 border-l-indigo-500">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Staff Overview</CardTitle>
                    <Shield className="w-5 h-5 text-indigo-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">84</div>
                    <p className="text-xs text-gray-500 mt-1">Total approved staff</p>
                    <Button variant="link" className="px-0 text-blue-600 h-auto mt-2">View Staff List &rarr;</Button>
                </CardContent>
            </Card>

            {/* 4. Reports */}
            <Card className="hover:shadow-lg transition-all cursor-pointer border-l-4 border-l-orange-500">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Reports</CardTitle>
                    <FileText className="w-5 h-5 text-orange-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-lg font-bold">Generate</div>
                    <p className="text-xs text-gray-500 mt-1">Alumni & Student reports</p>
                    <Button variant="link" className="px-0 text-blue-600 h-auto mt-2">Generate Report &rarr;</Button>
                </CardContent>
            </Card>

            {/* 5. Events & Announcements */}
            <Card className="hover:shadow-lg transition-all cursor-pointer border-l-4 border-l-pink-500">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Events</CardTitle>
                    <Calendar className="w-5 h-5 text-pink-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-xs text-gray-500 mt-1">Upcoming events</p>
                    <Button variant="link" className="px-0 text-blue-600 h-auto mt-2">Manage Events &rarr;</Button>
                </CardContent>
            </Card>

            {/* 6. System Notifications */}
            <Card className="hover:shadow-lg transition-all cursor-pointer border-l-4 border-l-red-500">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Notifications</CardTitle>
                    <Bell className="w-5 h-5 text-red-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-gray-500 mt-1">System alerts</p>
                    <Button variant="link" className="px-0 text-blue-600 h-auto mt-2">View Notifications &rarr;</Button>
                </CardContent>
            </Card>
        </div>
    );

    const StaffApprovalView = () => (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-2xl font-bold">Staff Approval Requests</h2>
                <div className="flex gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input placeholder="Search by Name / Email..." className="pl-9" />
                    </div>
                    {/* Status Filter Placeholder */}
                </div>
            </div>

            <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Assign Year</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pendingStaff.map((staff) => (
                            <TableRow key={staff.id}>
                                <TableCell className="font-medium">{staff.name}</TableCell>
                                <TableCell>{staff.email}</TableCell>
                                <TableCell>{staff.dept}</TableCell>
                                <TableCell>{staff.role}</TableCell>
                                <TableCell>
                                    <select
                                        className="border rounded px-2 py-1 text-sm bg-white"
                                        value={staff.assignedYear}
                                        onChange={(e) => handleAssignYearChange(staff.id, e.target.value)}
                                    >
                                        <option value="1st Year">1st Year</option>
                                        <option value="2nd Year">2nd Year</option>
                                        <option value="3rd Year">3rd Year</option>
                                        <option value="4th Year">4th Year</option>
                                    </select>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                        {staff.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button size="sm" className="bg-green-600 hover:bg-green-700 h-8" onClick={() => handleApprove(staff)}>
                                        <CheckCircle className="w-4 h-4 mr-1" /> Approve
                                    </Button>
                                    <Button size="sm" variant="destructive" className="h-8">
                                        <XCircle className="w-4 h-4 mr-1" /> Reject
                                    </Button>
                                    <Button size="sm" variant="outline" className="h-8">
                                        <Eye className="w-4 h-4 mr-1" /> View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className={`bg-white border-r border-gray-200 fixed lg:static inset-y-0 left-0 z-50 w-64 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="h-16 flex items-center px-6 border-b border-gray-100">
                    <span className="text-xl font-bold text-blue-600">EduConnect Admin</span>
                </div>
                <div className="p-4 space-y-2">
                    <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" id="dashboard" />
                    <SidebarItem icon={<UserCheck size={20} />} label="Staff Approvals" id="staff_approvals" />
                    <SidebarItem icon={<Users size={20} />} label="All Users" id="users" />
                    <SidebarItem icon={<FileText size={20} />} label="Reports" id="reports" />
                    <SidebarItem icon={<Calendar size={20} />} label="Events" id="events" />
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
                            {activeTab === 'dashboard' && 'Admin Overview'}
                            {activeTab === 'staff_approvals' && 'Staff Verification'}
                            {/* Add other titles as needed */}
                        </h1>
                    </div>
                    <div className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate('/admin-profile')}>
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-500">Super Admin</p>
                        </div>
                        <Avatar>
                            <AvatarImage src={`https://ui-avatars.com/api/?name=${user.name}&background=random`} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </div>
                </header>

                {/* Body */}
                <main className="p-6 flex-1 overflow-auto">
                    {activeTab === 'dashboard' && <DashboardOverview />}
                    {activeTab === 'staff_approvals' && <StaffApprovalView />}
                    {/* Placeholders for other tabs */}
                    {activeTab === 'users' && <div className="text-center text-gray-500 mt-20">All Users Component Placeholder</div>}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
