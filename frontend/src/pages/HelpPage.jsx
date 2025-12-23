import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Mail, Phone, MapPin, MessageCircle } from "lucide-react";

const HelpPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50/50 pb-20">
            {/* Header / Nav */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
                <div className="container mx-auto flex items-center justify-between">
                    <Button variant="ghost" onClick={() => navigate('/student-dashboard')} className="gap-2">
                        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                    </Button>
                    <h1 className="font-bold text-lg">Help & Support</h1>
                    <div className="w-20"></div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-8 max-w-3xl">
                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MessageCircle className="w-5 h-5 text-blue-500" /> Contact Support
                            </CardTitle>
                            <CardDescription>
                                Having trouble? Reach out to the administration.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-start gap-4 p-4 bg-white border rounded-lg hover:shadow-sm transition-all">
                                <div className="bg-blue-100 p-2 rounded-full">
                                    <Mail className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Email Support</h3>
                                    <p className="text-sm text-gray-500 mb-2">For general inquiries and technical issues.</p>
                                    <a href="mailto:support@educonnect.edu" className="text-blue-600 font-medium hover:underline">
                                        support@educonnect.edu
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-white border rounded-lg hover:shadow-sm transition-all">
                                <div className="bg-green-100 p-2 rounded-full">
                                    <Phone className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Phone Support</h3>
                                    <p className="text-sm text-gray-500 mb-2">Available Mon-Fri, 9am - 5pm.</p>
                                    <a href="tel:+1234567890" className="text-blue-600 font-medium hover:underline">
                                        +91 123 456 7890
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-white border rounded-lg hover:shadow-sm transition-all">
                                <div className="bg-orange-100 p-2 rounded-full">
                                    <MapPin className="w-5 h-5 text-orange-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Visit Administrative Office</h3>
                                    <p className="text-sm text-gray-500">
                                        Admin Block, Ground Floor<br />
                                        DYPCOE Campus, Pune
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Frequently Asked Questions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <h4 className="font-medium text-gray-900">Why is my profile pending?</h4>
                                <p className="text-sm text-gray-500">
                                    Profiles are manually verified by staff members against college records. This usually takes 24-48 hours.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-medium text-gray-900">How do I update my profile details?</h4>
                                <p className="text-sm text-gray-500">
                                    Go to "My Profile" from the dashboard and click the "Edit Profile" button to make changes.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default HelpPage;
