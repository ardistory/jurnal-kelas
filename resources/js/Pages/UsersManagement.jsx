import { Card, CardHeader } from "@/Components/ui/card.js";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

const UsersManagement = ({ auth }) => {
    return (
        <AuthenticatedLayout title={'Users Management'} user={auth.user}>
            <Card>
                <CardHeader>
                    Users Management
                </CardHeader>
            </Card>
        </AuthenticatedLayout>
    );
};

export default UsersManagement;