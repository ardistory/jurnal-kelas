import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar.js";
import { Button } from "@/Components/ui/button.js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card.js";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select.js";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { router, useForm } from "@inertiajs/react";
import { BadgeCheck, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Pencil, ShieldX, Trash2, TriangleAlert } from "lucide-react";
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
import { Label } from "@/Components/ui/label.js";
import { Switch } from "@/Components/ui/switch.js";


const UsersManagement = ({ auth, usersPaginate, usersAll, roles }) => {
    const [search, setSearch] = useState('');
    const [allUsersFiltered, setAllUsersFiltered] = useState([]);
    const [_, setEditingUser] = useState(null);

    const { data, setData, patch, processing } = useForm({
        id: '',
        newName: '',
        newRoleLevelValue: '',
        newIsUserVerified: '',
    });

    const openEditDialog = (user) => {
        setEditingUser(user);

        setData({
            id: user.id,
            newName: user.name,
            newRoleLevelValue: user.role_level.toString(),
            newIsUserVerified: user.is_user_verified,
        });
    };

    const handlePatchUser = (e) => {
        e.preventDefault();

        patch(route('users-management.update'), {
            onSuccess: () => {
                toast('Success', { description: 'Update user successfully' });
            },
            onError: (errors) => {
                const errorsKey = Object.keys(errors);

                errorsKey.map(err => toast('Failed', { description: errors[err] }));
            }
        });
    };

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

    useEffect(() => {
        if (processing) {
            toast('Process', { description: 'updating user...' });
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
                                            <div className={'flex items-center gap-1'}>
                                                {user.name}
                                                {(user.is_user_verified) ? (<BadgeCheck size={15} color={'#00aeff'} />) : null}
                                            </div>
                                        </CardTitle>
                                        <CardDescription>
                                            {user.roles.name}
                                        </CardDescription>
                                    </div>
                                </div>
                                {(user.id !== auth.user.id && (
                                    (auth.user.role_level === 1 && user.role_level > 1) ||
                                    (auth.user.role_level === 2 && user.role_level > 2)
                                )) && (
                                        <div className={'flex gap-5'}>
                                            <Dialog onOpenChange={(open) => open && openEditDialog(user)}>
                                                <DialogTrigger asChild>
                                                    <Button size={'icon'} variant={'outline'}>
                                                        <Pencil />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            <div className={'flex items-center gap-2'}>
                                                                <Avatar className={'rounded-lg'}>
                                                                    <AvatarImage src={`/storage/avatar/${user.avatar}`} />
                                                                    <AvatarFallback className={'rounded-lg'}>CN</AvatarFallback>
                                                                </Avatar>
                                                                <div>
                                                                    <CardTitle>
                                                                        <div className={'flex items-center gap-1'}>
                                                                            {user.name}
                                                                            {(user.is_user_verified) ? (<BadgeCheck size={15} color={'#00aeff'} />) : null}
                                                                        </div>
                                                                    </CardTitle>
                                                                    <CardDescription className={'flex justify-start'}>
                                                                        {user.roles.name}
                                                                    </CardDescription>
                                                                </div>
                                                            </div>
                                                        </DialogTitle>
                                                        <DialogDescription />
                                                    </DialogHeader>
                                                    <form onSubmit={handlePatchUser} className={'space-y-5'}>
                                                        <div>
                                                            <Label>
                                                                Name
                                                            </Label>
                                                            <Input placeholder={user.name} value={data.newName} onChange={(e) => setData('newName', e.target.value)} />
                                                        </div>
                                                        <div>
                                                            <Label>
                                                                Role
                                                            </Label>
                                                            <Select value={data.newRoleLevelValue} onValueChange={value => setData('newRoleLevelValue', value)}>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder={'Select role'} />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        {roles.map(role => (
                                                                            role.level != 1 && (
                                                                                <SelectItem key={role.level} value={role.level.toString()}>
                                                                                    {role.name}
                                                                                </SelectItem>
                                                                            )
                                                                        ))}
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <div>
                                                            <Card>
                                                                <CardHeader>
                                                                    <CardTitle>
                                                                        Verify this user?
                                                                    </CardTitle>
                                                                    <CardDescription>
                                                                        Verified users will be able to use the features on this website.
                                                                    </CardDescription>
                                                                </CardHeader>
                                                                <CardContent>
                                                                    <Switch checked={data.newIsUserVerified} onCheckedChange={checked => setData('newIsUserVerified', checked)} />
                                                                </CardContent>
                                                            </Card>
                                                        </div>
                                                        <Button type={'submit'}>
                                                            Save
                                                        </Button>
                                                    </form>
                                                </DialogContent>
                                            </Dialog>
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
                                                                            <div className={'flex items-center gap-1'}>
                                                                                {user.name}
                                                                                {(user.is_user_verified) ? (<BadgeCheck size={15} color={'#00aeff'} />) : null}
                                                                            </div>
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
                                    )}
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
                                                <div className={'flex items-center gap-1'}>
                                                    {user.name}
                                                    {(user.is_user_verified) ? (<BadgeCheck size={15} color={'#00aeff'} />) : null}
                                                </div>
                                            </CardTitle>
                                            <CardDescription>
                                                {user.roles.name}
                                            </CardDescription>
                                        </div>
                                    </div>
                                    {(user.id !== auth.user.id && (
                                        (auth.user.role_level === 1 && user.role_level > 1) ||
                                        (auth.user.role_level === 2 && user.role_level > 2)
                                    )) && (
                                            <div className={'flex gap-5'}>
                                                <Dialog onOpenChange={(open) => open && openEditDialog(user)}>
                                                    <DialogTrigger asChild>
                                                        <Button size={'icon'} variant={'outline'}>
                                                            <Pencil />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                <div className={'flex items-center gap-2'}>
                                                                    <Avatar className={'rounded-lg'}>
                                                                        <AvatarImage src={`/storage/avatar/${user.avatar}`} />
                                                                        <AvatarFallback className={'rounded-lg'}>CN</AvatarFallback>
                                                                    </Avatar>
                                                                    <div>
                                                                        <CardTitle>
                                                                            <div className={'flex items-center gap-1'}>
                                                                                {user.name}
                                                                                {(user.is_user_verified) ? (<BadgeCheck size={15} color={'#00aeff'} />) : null}
                                                                            </div>
                                                                        </CardTitle>
                                                                        <CardDescription className={'flex justify-start'}>
                                                                            {user.roles.name}
                                                                        </CardDescription>
                                                                    </div>
                                                                </div>
                                                            </DialogTitle>
                                                            <DialogDescription />
                                                        </DialogHeader>
                                                        <form onSubmit={handlePatchUser} className={'space-y-5'}>
                                                            <div>
                                                                <Label>
                                                                    Name
                                                                </Label>
                                                                <Input placeholder={user.name} value={data.newName} onChange={(e) => setData('newName', e.target.value)} />
                                                            </div>
                                                            <div>
                                                                <Label>
                                                                    Role
                                                                </Label>
                                                                <Select value={data.newRoleLevelValue} onValueChange={value => setData('newRoleLevelValue', value)}>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder={'Select role'} />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectGroup>
                                                                            {roles.map(role => (
                                                                                role.level != 1 && (
                                                                                    <SelectItem key={role.level} value={role.level.toString()}>
                                                                                        {role.name}
                                                                                    </SelectItem>
                                                                                )
                                                                            ))}
                                                                        </SelectGroup>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                            <div>
                                                                <Card>
                                                                    <CardHeader>
                                                                        <CardTitle>
                                                                            Verify this user?
                                                                        </CardTitle>
                                                                        <CardDescription>
                                                                            Verified users will be able to use the features on this website.
                                                                        </CardDescription>
                                                                    </CardHeader>
                                                                    <CardContent>
                                                                        <Switch checked={data.newIsUserVerified} onCheckedChange={checked => setData('newIsUserVerified', checked)} />
                                                                    </CardContent>
                                                                </Card>
                                                            </div>
                                                            <Button type={'submit'}>
                                                                Save
                                                            </Button>
                                                        </form>
                                                    </DialogContent>
                                                </Dialog>
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
                                                                                <div className={'flex items-center gap-1'}>
                                                                                    {user.name}
                                                                                    {(user.is_user_verified) ? (<BadgeCheck size={15} color={'#00aeff'} />) : null}
                                                                                </div>
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
                                        )}
                                </div>
                            </CardHeader>
                        </Card>
                    ))}
                    {/* pagination menu */}
                    <Card>
                        <CardHeader>
                            <Pagination>
                                <PaginationContent>
                                    {usersPaginate.current_page != usersPaginate.first_page_url.split('=')[1] && (
                                        <Button size={'icon'} variant={'outline'} onClick={() => router.visit(usersPaginate.first_page_url)}>
                                            <ChevronsLeft />
                                        </Button>
                                    )}
                                    {usersPaginate.prev_page_url && (
                                        <Button size={'icon'} variant={'outline'} onClick={() => router.visit(usersPaginate.prev_page_url)}>
                                            <ChevronLeft />
                                        </Button>
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
                                        <Button size={'icon'} variant={'outline'} onClick={() => router.visit(usersPaginate.next_page_url)}>
                                            <ChevronRight />
                                        </Button>
                                    )}
                                    {usersPaginate.current_page != usersPaginate.last_page_url.split('=')[1] && (
                                        <Button size={'icon'} variant={'outline'} onClick={() => router.visit(usersPaginate.last_page_url)}>
                                            <ChevronsRight />
                                        </Button>
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