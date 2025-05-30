import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar.js";
import { Button } from "@/Components/ui/button.js";
import { Card, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card.js";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select.js";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { router, useForm } from "@inertiajs/react";
import { Pencil, ShieldX, Trash2, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/Components/ui/pagination";
import { Input } from "@/Components/ui/input.js";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog.js";


const UsersManagement = ({ auth, usersPaginate, usersAll, roles }) => {
    const [search, setSearch] = useState('');
    const [allUsersFiltered, setAllUsersFiltered] = useState([]);

    const { data, setData, patch, processing } = useForm({
        id: '',
        newRoleLevelValue: ''
    });

    const handleDeleteUser = (id) => {
        router.delete(route('users-management.destroy', { id }), {
            preserveScroll: true,
            onError: () => {
                toast('Failed', { description: 'Failed to delete user' });
            },
            onSuccess: () => {
                toast('Success', { description: 'User deleted successfully' });
            },
        });

        setSearch('');
    };

    const handleChangeRoleLevel = (userId, newRoleLevelValue) => {
        setData({
            id: userId,
            newRoleLevelValue: newRoleLevelValue,
        });

        patch(route('users-management'), {
            preserveScroll: true,
            onError: (err) => {
                toast('Failed', { description: err.id });
                toast('Failed', { description: err.newRoleLevelValue });
            },
            onSuccess: () => toast('Success', { description: 'role updated' }),
        });
    };

    useEffect(() => {
        if (processing) {
            toast('Process', { description: 'updating role...' });
        }
    }, [processing]);

    useEffect(() => {
        const users = usersAll.filter(user => (user.name.toLowerCase().includes(search.toLowerCase())));
        setAllUsersFiltered(users);
    }, [search]);

    return (
        <AuthenticatedLayout title={'Users Management'} user={auth.user}>
            <Input placeholder={'Search...'} className={'mb-5'} value={search} onChange={(e) => setSearch(e.target.value)} />
            {(allUsersFiltered.length > 0 && search.length > 0) ? (
                allUsersFiltered.map(user => (
                    <Card key={user.email} className={'mb-5 last:mb-0'} >
                        <CardHeader>
                            <div className={'flex items-center justify-between'}>
                                <div className={'flex items-center gap-2'}>
                                    <Avatar className={'rounded-lg'}>
                                        <AvatarImage src={`/storage/avatar/${user.avatar}`} />
                                        <AvatarFallback className={'rounded-lg'}>CN</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle>
                                            {user.name}
                                        </CardTitle>
                                        <CardDescription>
                                            {user.roles.name}
                                        </CardDescription>
                                    </div>
                                </div>
                                <div className={'flex gap-5'}>
                                    <Button size={'icon'} variant={'outline'}>
                                        <Pencil />
                                    </Button>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button size={'icon'} variant={'outline'}>
                                                <Trash2 />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                                <DialogDescription>
                                                    This action cannot be undone. this will permanently delete your account
                                                    and remove your data from our servers.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <Card>
                                                <CardHeader>
                                                    <div className={'flex items-center justify-between'}>
                                                        <div className={'flex items-center gap-2'}>
                                                            <Avatar className={'rounded-lg'}>
                                                                <AvatarImage src={`/storage/avatar/${user.avatar}`} />
                                                                <AvatarFallback className={'rounded-lg'}>CN</AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <CardTitle>
                                                                    {user.name}
                                                                </CardTitle>
                                                                <CardDescription>
                                                                    {user.roles.name}
                                                                </CardDescription>
                                                            </div>
                                                        </div>
                                                        <Button variant={'destructive'} onClick={() => handleDeleteUser(user.id)}>
                                                            <Trash2 />
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </CardHeader>
                                            </Card>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>
                ))
            ) : (!allUsersFiltered.length > 0 && search.length > 0) ? (
                <Card>
                    <CardHeader>
                        <div className={'flex items-center gap-2'}>
                            <TriangleAlert />
                            <div>
                                <CardTitle>
                                    Not Found
                                </CardTitle>
                                <CardDescription>
                                    user with name containing '{search}' not found
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
            ) : (
                <div>
                    {usersPaginate.data.map(user => (
                        <Card key={user.email} className={'mb-5 last:mb-0'}>
                            <CardHeader>
                                <div className={'flex items-center justify-between'}>
                                    <div className={'flex items-center gap-2'}>
                                        <Avatar className={'rounded-lg'}>
                                            <AvatarImage src={`/storage/avatar/${user.avatar}`} />
                                            <AvatarFallback className={'rounded-lg'}>CN</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <CardTitle>
                                                {user.name}
                                            </CardTitle>
                                            <CardDescription>
                                                {user.roles.name}
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <div className={'flex gap-5'}>
                                        <Button size={'icon'} variant={'outline'}>
                                            <Pencil />
                                        </Button>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button size={'icon'} variant={'outline'}>
                                                    <Trash2 />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                                                    <DialogDescription>
                                                        This action cannot be undone. This will permanently delete this account
                                                        and remove your data from our servers.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <Card>
                                                    <CardHeader>
                                                        <div className={'flex items-center justify-between'}>
                                                            <div className={'flex items-center gap-2'}>
                                                                <Avatar className={'rounded-lg'}>
                                                                    <AvatarImage src={`/storage/avatar/${user.avatar}`} />
                                                                    <AvatarFallback className={'rounded-lg'}>CN</AvatarFallback>
                                                                </Avatar>
                                                                <div>
                                                                    <CardTitle>
                                                                        {user.name}
                                                                    </CardTitle>
                                                                    <CardDescription>
                                                                        {user.roles.name}
                                                                    </CardDescription>
                                                                </div>
                                                            </div>
                                                            <Button variant={'destructive'} onClick={() => handleDeleteUser(user.id)}>
                                                                <Trash2 />
                                                                Delete
                                                            </Button>
                                                        </div>
                                                    </CardHeader>
                                                </Card>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    ))}
                    {/* pagination menu */}
                    <Card>
                        <CardHeader>
                            <Pagination>
                                <PaginationContent>
                                    {usersPaginate.prev_page_url && (
                                        <PaginationItem>
                                            <PaginationPrevious className={'cursor-pointer'} onClick={() => router.visit(usersPaginate.prev_page_url)} />
                                        </PaginationItem>
                                    )}
                                    {usersPaginate.links.map((link, index) => (
                                        (index != 0 && index != usersPaginate.links.length - 1 && link.active) ? (
                                            <PaginationItem key={link.label}>
                                                <div className={'flex items-center gap-2'}>
                                                    <PaginationLink isActive={link.active} className={'cursor-pointer'} onClick={() => router.visit(link.url)}>
                                                        {link.label}
                                                    </PaginationLink>
                                                    /
                                                    <PaginationLink isActive={link.active} className={'cursor-pointer'} onClick={() => router.visit(usersPaginate.last_page_url)}>
                                                        {usersPaginate.last_page}
                                                    </PaginationLink>
                                                </div>
                                            </PaginationItem>
                                        ) : null
                                    ))}
                                    {usersPaginate.next_page_url && (
                                        <PaginationItem>
                                            <PaginationNext className={'cursor-pointer'} onClick={() => router.visit(usersPaginate.next_page_url)} />
                                        </PaginationItem>
                                    )}
                                </PaginationContent>
                            </Pagination>
                        </CardHeader>
                    </Card>
                </div>
            )}
        </AuthenticatedLayout >
    );
};

export default UsersManagement;