import { ThemeToggle } from '@/Components/ThemeToggle.jsx';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar.js';
import { Button } from '@/Components/ui/button.js';
import { Card, CardHeader } from '@/Components/ui/card.js';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu.js';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/Components/ui/sheet.js';
import ApplicationLogo from '@/Partials/ApplicationLogo.jsx';
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
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className={'w-9 h-9 rounded-lg'}>
                                    <AvatarImage src={`/storage/avatar/${user.avatar}`} />
                                    <AvatarFallback className={'rounded-lg'}>PP</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align={'end'}>
                                <DropdownMenuLabel className="p-0 font-normal">
                                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage src={`/storage/avatar/${user.avatar}`} alt={user.name} />
                                            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-medium">{user.name}</span>
                                            <span className="truncate text-xs text-muted-foreground">
                                                {user.email}
                                            </span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem onClick={() => router.visit(route('profile.edit'))}>
                                        <UserCircleIcon />
                                        Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <BellIcon />
                                        Notifications
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => router.visit(route('logout'), { method: 'post' })}>
                                    <LogOutIcon />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
            <div className={'pt-24 min-h-screen'}>
                <div className={'container mx-auto px-5 md:px-0'}>
                    {children}
                </div>
            </div>
        </>
    );
}