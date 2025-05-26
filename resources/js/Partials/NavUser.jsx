import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar.js";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu.js";
import { router } from "@inertiajs/react";
import { BellIcon, LogOutIcon, UserCircleIcon } from "lucide-react";

const NavUser = ({ user }) => {
    return (
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
    );
};

export default NavUser;