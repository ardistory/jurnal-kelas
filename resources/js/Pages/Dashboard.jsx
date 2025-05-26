import { Card, CardContent, CardHeader } from '@/Components/ui/card.js';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout title={'Dashboard'} user={auth.user}>
            <Card>
                <CardHeader>
                    You're logged in!
                </CardHeader>
            </Card>
        </AuthenticatedLayout>
    );
}
