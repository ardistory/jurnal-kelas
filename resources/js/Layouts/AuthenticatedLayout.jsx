import { ThemeToggle } from '@/Components/ThemeToggle.jsx';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar.js';
import { Card, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card.js';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu.js';
import ApplicationLogo from '@/Partials/ApplicationLogo.jsx';
import NavUser from '@/Partials/NavUser.jsx';
import { Head, router } from '@inertiajs/react';
import { BellIcon, LogOutIcon, UserCircleIcon } from 'lucide-react';

export default function AuthenticatedLayout({ children, title, user }) {
    return (
        <>
            <Head title={title} />

            <div className={'w-full h-20 border-b-2 flex items-center fixed top-0 backdrop-blur-[2px] px-5 md:px-0'}>
                <div className={'w-full h-20 absolute -z-[1]'} >

                </div>
                <div className={'container mx-auto flex items-center justify-between'}>
                    <ApplicationLogo />
                    <div className={'flex items-center gap-5'}>
                        <ThemeToggle />
                        <NavUser user={user} />
                    </div>
                </div>
            </div>
            <div className={'pt-24 min-h-screen'}>
                <div className={'container mx-auto px-5 pb-5 md:px-0'}>
                    {children}
                </div>
            </div>
        </>
    );
}