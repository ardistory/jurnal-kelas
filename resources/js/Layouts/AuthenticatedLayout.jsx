import { ThemeToggle } from '@/Components/ThemeToggle.jsx';
import ApplicationLogo from '@/Partials/ApplicationLogo.jsx';
import NavUser from '@/Partials/NavUser.jsx';
import { Head, router, usePage } from '@inertiajs/react';
import { AppSidebar } from "@/Components/AppSidebar.jsx";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/Components/ui/breadcrumb.js";
import { Separator } from "@/Components/ui/separator.js";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar.js";
import React from 'react';

export default function AuthenticatedLayout({ children, title, user }) {
    const { component } = usePage();
    const breadcrumbs = [{ component: 'Root', route: 'root' }];

    const componentSplited = component.split('/');

    if (component != 'Root') {
        componentSplited.map(comp => breadcrumbs.push({ component: comp }));
    }

    return (
        <>
            <Head title={title} />

            <SidebarProvider>
                <AppSidebar user={user} />
                <SidebarInset>
                    <header className={'w-full h-20 border-b-2 flex items-center px-5'}>
                        <div className={'container mx-auto flex items-center justify-between'}>
                            <ApplicationLogo override={title} />
                            <div className={'flex items-center gap-5'}>
                                <ThemeToggle />
                                {/* <NavUser user={user} /> */}
                            </div>
                        </div>
                    </header>
                    <div className={'min-h-[calc(100vh-80px)] w-full px-5 pb-5'}>
                        <div className="container mx-auto flex h-16 shrink-0 items-center">
                            <div className="flex items-center gap-2">
                                <SidebarTrigger className="-ml-1" />
                                <Separator orientation="vertical" className="mr-2 h-4" />
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        {breadcrumbs.map((breadcrumb, index) => (
                                            <React.Fragment key={breadcrumb.component}>
                                                <BreadcrumbItem>
                                                    {(breadcrumb.component === 'Root') ? (
                                                        <BreadcrumbLink className={'cursor-pointer'} onClick={() => router.visit(route(breadcrumb.route))}>
                                                            {breadcrumb.component}
                                                        </BreadcrumbLink>
                                                    ) : (
                                                        <BreadcrumbPage>
                                                            {breadcrumb.component}
                                                        </BreadcrumbPage>
                                                    )}
                                                </BreadcrumbItem>
                                                {(index != breadcrumbs.length - 1) ? (<BreadcrumbSeparator />) : null}
                                            </React.Fragment>
                                        ))}
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
