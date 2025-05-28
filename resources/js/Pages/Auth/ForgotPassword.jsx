import { Button } from '@/Components/ui/button.js';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card.js';
import { Input } from '@/Components/ui/input.js';
import { Label } from '@/Components/ui/label.js';
import GuestLayout from '@/Layouts/GuestLayout';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, recentlySuccessful, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    useEffect(() => {
        (processing) ? toast('Process...') : (recentlySuccessful) ? toast('reset email has been sent') : (errors.email) ? toast(errors.email) : null;
    }, [processing]);

    return (
        <GuestLayout title={'Forgot Password'}>
            <div className={'flex justify-center'}>
                <Card className={'max-w-[500px]'}>
                    <form onSubmit={submit}>
                        <CardHeader>
                            <CardTitle>
                                Forgot Password
                            </CardTitle>
                            <CardDescription>
                                Forgot your password? No problem. Just let us know your email
                                address and we will email you a password reset link that will
                                allow you to choose a new one.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {status && (
                                <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                                    {status}
                                </div>
                            )}
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <Label className={'text-red-500'}>{errors.email}</Label>
                        </CardContent>
                        <CardFooter>
                            <Button disabled={processing}>
                                Email Password Reset Link
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </GuestLayout>
    );
}
