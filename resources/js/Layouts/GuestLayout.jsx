import Ballpit from '@/Components/Ballpit/Ballpit.jsx';
import Iridescence from '@/Components/Iridescence/Iridescence.jsx';
import { ThemeToggle } from '@/Components/ThemeToggle.jsx';
import Threads from '@/Components/Threads/Threads.jsx';
import ApplicationLogo from '@/Partials/ApplicationLogo.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function GuestLayout({ children, title }) {
    const { app_name } = usePage().props;

    return (
        <>
            <Head title={title} />

            <div className={'w-full h-20 border-b-2 flex items-center fixed top-0 backdrop-blur-[2px] px-5 md:px-0'}>
                <div className={'w-full h-20 absolute -z-[1]'} >

                </div>
                <div className={'container mx-auto flex items-center justify-between'}>
                    <ApplicationLogo override={app_name} />
                    <ThemeToggle />
                </div>
            </div>
            <div className={'pt-24 flex items-center justify-center min-h-screen w-full'}>
                <div className={'container mx-auto px-5 pb-5 md:px-0'}>
                    {children}
                </div>
            </div>
        </>
    );
}