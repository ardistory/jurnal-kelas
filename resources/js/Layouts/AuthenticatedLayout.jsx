import { ThemeToggle } from '@/Components/ThemeToggle.jsx';
import ApplicationLogo from '@/Partials/ApplicationLogo.jsx';
import NavUser from '@/Partials/NavUser.jsx';
import { Head } from '@inertiajs/react';
import { AppSidebar } from "@/Components/app-sidebar.js";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/Components/ui/breadcrumb.js";
import { Separator } from "@/Components/ui/separator.js";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar.js";

export default function AuthenticatedLayout({ children, title, user }) {
    return (
        <>
            <Head title={title} />

            <SidebarProvider>
                <AppSidebar user={user} />
                <SidebarInset>
                    <header className={'w-full h-20 border-b-2 flex items-center'}>
                        <div className={'container mx-auto flex items-center justify-between px-5 md:px-0'}>
                            <ApplicationLogo />
                            <div className={'flex items-center gap-5'}>
                                <ThemeToggle />
                                {/* <NavUser user={user} /> */}
                            </div>
                        </div>
                    </header>
                    <div className={'min-h-[calc(100vh-80px)] w-full px-5 md:px-0 pb-5'}>
                        <div className="container mx-auto flex h-16 shrink-0 items-center">
                            <div className="flex items-center gap-2">
                                <SidebarTrigger className="-ml-1" />
                                <Separator orientation="vertical" className="mr-2 h-4" />
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        <BreadcrumbItem className="hidden md:block">
                                            <BreadcrumbLink href="#">
                                                Root
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator className="hidden md:block" />
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>Dashboard</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </div>
                        </div>
                        <div className="container mx-auto">
                            {children}
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}
