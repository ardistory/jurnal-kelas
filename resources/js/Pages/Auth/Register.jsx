import { Button } from '@/Components/ui/button.js';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card.js';
import { Input } from '@/Components/ui/input.js';
import { Label } from '@/Components/ui/label.js';
import GuestLayout from '@/Layouts/GuestLayout';
import ApplicationLogo from '@/Partials/ApplicationLogo.jsx';
import { router, useForm } from '@inertiajs/react';
import { UserCheck, UserRoundPlus } from 'lucide-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout title={'Register'}>
            <div className={'flex justify-center'}>
                <Card className={'w-[500px]'}>
                    <form onSubmit={submit}>
                        <CardHeader>
                            <ApplicationLogo override={'Register'} />
                        </CardHeader>
                        <CardContent className={'space-y-5'}>
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                <Label className={'text-red-500'}>{errors.name}</Label>
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <Label className={'text-red-500'}>{errors.email}</Label>
                            </div>
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <Label className={'text-red-500'}>{errors.password}</Label>
                            </div>
                            <div>
                                <Label htmlFor="password_confirmation">Confirm Password</Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData('password_confirmation', e.target.value)
                                    }
                                />
                                <Label className={'text-red-500'}>{errors.password_confirmation}</Label>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <div className={'flex w-full'}>
                                <Button type={'submit'} variant={'outline'} disabled={processing} className={'flex-1 rounded-r-none'}>
                                    <UserRoundPlus />
                                    Register
                                </Button>
                                <Button type={'button'} variant={'outline'} className={'flex-1 rounded-l-none'} onClick={() => router.visit(route('login'))}>
                                    <UserCheck />
                                    Already registered
                                </Button>
                            </div>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </GuestLayout >
    );
}
