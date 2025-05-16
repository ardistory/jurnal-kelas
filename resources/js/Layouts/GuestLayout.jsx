import { ThemeToggle } from '@/Components/ThemeToggle.jsx';
import ApplicationLogo from '@/Partials/ApplicationLogo.jsx';
import { Head, Link } from '@inertiajs/react';

export default function GuestLayout({ children, title }) {
    return (
        <>
            <Head title={title} />

            <div className={'w-full h-24 border-b-2 flex items-center'}>
                <div className={'container mx-auto flex items-center justify-between'}>
                    <ApplicationLogo />
                    <ThemeToggle />
                </div>
            </div>
        </>
    );
}
