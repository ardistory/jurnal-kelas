import { Button } from '@/Components/ui/button.js';
import GuestLayout from '@/Layouts/GuestLayout.jsx';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <GuestLayout title={'Welcome'}>
            ARDI PUTRA
        </GuestLayout>
    );
}
