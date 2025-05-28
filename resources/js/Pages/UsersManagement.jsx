import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar.js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card.js";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

const UsersManagement = ({ auth, users }) => {
    console.log(users);
    return (
        <AuthenticatedLayout title={'Users Management'} user={auth.user}>
            {users.map(user => (
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
                                        {user.email}
                                    </CardDescription>
                                </div>
                            </div>
                            <div>
                                f
                            </div>
                        </div>
                    </CardHeader>
                </Card>
            ))}
        </AuthenticatedLayout>
    );
};

export default UsersManagement;