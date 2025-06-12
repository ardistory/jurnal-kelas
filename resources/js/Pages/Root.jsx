import { Button } from '@/Components/ui/button.js';
import { Card, CardContent, CardHeader } from '@/Components/ui/card.js';
import GuestLayout from '@/Layouts/GuestLayout.jsx';
import ApplicationLogo from '@/Partials/ApplicationLogo.jsx';
import { router, usePage } from '@inertiajs/react';
import { LogIn } from 'lucide-react';

export default function Root() {
    const { app_name } = usePage().props;

    return (
        <GuestLayout title={'Welcome'}>
            <Card className={'md:mx-[500px]'}>
                <CardHeader>
                    <ApplicationLogo override={app_name} />
                </CardHeader>
                <CardContent>
                    <Button variant={'outline'} className={'w-full'} onClick={() => router.visit(route('login'))}>
                        <LogIn /> Login
                    </Button>
                </CardContent>
            </Card>
        </GuestLayout>
    );
}
