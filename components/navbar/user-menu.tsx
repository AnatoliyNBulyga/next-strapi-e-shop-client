"use client";

import {useCallback, useEffect, useRef, useState} from "react";
import useLoginModal from "@/hooks/use-login-modal";
import MenuItem from "@/components/navbar/menu-item";
import Avatar from "@/components/ui/Avatar";
import {AiOutlineUser} from "react-icons/ai";
import useRegisterModal from "@/hooks/use-register-modal";
import axios from "axios";
import {useRouter} from "next/navigation";
import useUser from "@/hooks/use-user";
import {toast} from "react-hot-toast";

interface UserMenuProps {
    currentUser?: any;
}
const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {

    console.log('current user ', currentUser)
    const loginModal = useLoginModal();
    const user = useUser();
    const [isMounted, setIsMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const router = useRouter();

    const registerModal = useRegisterModal();

    useEffect(() => {
        router.refresh()
    }, [router]);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const onLogoutHandler = async () => {
        user.setUserError('')
        const res = await axios.get('/api/logout/');
        if (!res) {
            user.setUserError('Something was wrong!')
        }
        toast.success("You are logged out!")
        router.refresh();
    }

    useEffect(() => {
        setIsMounted(true);

        const handleOutsideClick = (event: any) => {

            const path = event.path || (event.composedPath && event.composedPath());

            if ( !path.includes(menuRef.current) ) {
                setIsOpen( false)
            }
        }
        document.body.addEventListener('click', handleOutsideClick)
        return () => document.body.removeEventListener('click', handleOutsideClick);

    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div className="relative" ref={menuRef}>
            <div className="flex flex-row items-center gap-2">
                <div
                    onClick={toggleOpen}
                    className="
                        p-2
                        md:py-1
                        md:px-1
                        border-neutral-200
                        flex
                        flex-row
                        items-center
                        gap-2
                        cursor-pointer
                        transition
                        hover:opacity-75
                    "
                >
                    {
                        currentUser
                        ?
                        <div className="hidden md:block">
                            <Avatar src={currentUser?.image} />
                        </div>
                        :
                        <AiOutlineUser
                            size={20}
                            color="black"
                        />
                    }
                </div>
            </div>

            {
                isOpen && (
                    <div
                        className="
                            absolute
                            rounded-xs
                            shadow-lg
                            w-[40vw]
                            md:w-[200px]
                            bg-white
                            overflow-hidden
                            right-0
                            top-12
                            z-10
                            text-sm
                        "
                    >
                        <div className="flex flex-col">
                            {
                                currentUser
                                    ?
                                    <>
                                        <h3 className="font-semibold text-sm py-4 px-4">Welcome {currentUser.user?.username}!</h3>
                                        <MenuItem
                                            onClick={onLogoutHandler}
                                            label="Logout"
                                        />
                                    </>
                                    :
                                    <>
                                        <MenuItem
                                            onClick={loginModal.onOpen}
                                            label="Login"
                                        />
                                        <MenuItem
                                            onClick={registerModal.onOpen}
                                            label="Sign up"
                                        />
                                    </>
                            }
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default UserMenu;