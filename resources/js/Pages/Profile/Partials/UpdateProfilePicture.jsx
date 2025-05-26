import { Avatar, AvatarImage } from '@/Components/ui/avatar.js';
import { Button } from '@/Components/ui/button.js';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card.js';
import { Label } from '@/Components/ui/label.js';
import { useForm, usePage } from '@inertiajs/react';
import { useEffect, useState, useRef } from 'react';
import { toast } from 'sonner';

export default function UpdateProfilePicture({ className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            avatar: user.avatar,
        });

    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);

    const submit = (e) => {
        e.preventDefault();

        post(route('profile.update.picture'));
    };

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
        setData('avatar', e.target.files[0]);
    };

    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

    useEffect(() => {
        if (processing) {
            toast('Process', { description: 'updating picture...' });
        }
    }, [processing]);

    useEffect(() => {
        if (recentlySuccessful) {
            toast('Success', { description: 'update profile' });
            window.location.reload();
        }
    }, [recentlySuccessful]);

    return (
        <Card>
            <form onSubmit={submit}>
                <CardHeader>
                    <CardTitle>
                        Profile Picture
                    </CardTitle>
                    <CardDescription>
                        update your profile picture
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div onClick={handleAvatarClick}>
                        <Avatar className={'w-40 h-40 rounded-lg cursor-pointer'}>
                            {selectedImage ? (
                                <AvatarImage src={URL.createObjectURL(selectedImage)} />
                            ) : (
                                <AvatarImage src={`/storage/avatar/${data.avatar}`} />
                            )}
                        </Avatar>
                    </div>
                    <Label className={'text-red-500'}>{errors.avatar}</Label>
                </CardContent>
                <CardFooter>
                    <div className={'w-full'}>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleImageChange}
                        />
                        <Button type={'submit'}>
                            Save
                        </Button>
                    </div>
                </CardFooter>
            </form >
        </Card >
    );
}