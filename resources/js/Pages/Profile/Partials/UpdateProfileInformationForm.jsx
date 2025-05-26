import { Avatar, AvatarImage } from '@/Components/ui/avatar.js';
import { Button } from '@/Components/ui/button.js';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card.js';
import { Input } from '@/Components/ui/input.js';
import { Label } from '@/Components/ui/label.js';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            avatar: user.avatar,
        });

    const [selectedImage, setSelectedImage] = useState(null);

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
        setData('avatar', e.target.files[0]);
    };

    useEffect(() => {
        if (recentlySuccessful) {
            toast('Success', { description: 'update profile' });
        }
    }, [recentlySuccessful]);

    return (
        <Card>
            <form onSubmit={submit}>
                <CardHeader>
                    <CardTitle>
                        Profile Information
                    </CardTitle>
                    <CardDescription>
                        Update your account's profile information and email address.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className={'space-y-5'}>
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <Label className={'text-red-500'}>{errors.name}</Label>
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            <Label className={'text-red-500'}>{errors.email}</Label>
                        </div>
                        {mustVerifyEmail && user.email_verified_at === null && (
                            <div>
                                <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                                    Your email address is unverified.
                                    <Link
                                        href={route('verification.send')}
                                        method="post"
                                        as="button"
                                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                                    >
                                        Click here to re-send the verification email.
                                    </Link>
                                </p>

                                {status === 'verification-link-sent' && (
                                    <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                                        A new verification link has been sent to your
                                        email address.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button disabled={processing}>Save</Button>
                </CardFooter>
            </form >
        </Card >
    );
}
