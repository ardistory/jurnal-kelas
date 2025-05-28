import { Badge } from '@/Components/ui/badge.js';
import { Button } from '@/Components/ui/button.js';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card.js';
import GuestLayout from '@/Layouts/GuestLayout.jsx';
import ApplicationLogo from '@/Partials/ApplicationLogo.jsx';
import { router } from '@inertiajs/react';
import { LogIn } from 'lucide-react';

export default function Root({ auth, laravelVersion, phpVersion }) {
    return (
        <GuestLayout title={'Welcome'}>
            <Card className={'md:mx-[500px]'}>
                <CardHeader>
                    <ApplicationLogo />
                </CardHeader>
                <CardContent>
                    <Button variant={'outline'} className={'w-full'} onClick={() => router.visit(route('login'))}>
                        <LogIn /> Login
                    </Button>
                </CardContent>
                <CardFooter className={'flex gap-2'}>
                    <Badge>
                        Laravel {laravelVersion}
                    </Badge>
                    <Badge>
                        PHP {phpVersion}
                    </Badge>
                </CardFooter>
            </Card>
        </GuestLayout>
    );
}
