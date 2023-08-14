"use client";

import Modal from "./modal";
import useLoginModal from "@/hooks/use-login-modal";
import Input from "@/components/inputs/Input";
import {useCallback, useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Button from "@/components/ui/button";
import useRegisterModal from "@/hooks/use-register-modal";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import axios from "axios";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import useUser from "@/hooks/use-user";
import {useRouter} from "next/navigation";
import Link from "next/link";


const LoginModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const user = useUser();
    const router = useRouter();

    const [type, setType] = useState("password");
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onPasswordToggle = () => {
        if (type === "password") {
            return setType("text");
        }
        setType("password");
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        user.setUserError('');

        console.log('data ', data);

        axios
            .post( "/api/login/", {
                identifier: data.email,
                password: data.password,
            }, {withCredentials: true})
            .then(response => {
                console.log('response', response);
                toast.success("You are logged in!")
                reset();
                router.refresh();
                loginModal.onClose();
            })
            .catch(error => {
                console.log(error.response?.data?.message ?? 'An error occurred:');
                user.setUserError(error.response?.data?.message ?? 'An error occurred:')
            })
            .finally(() => {
                setIsLoading(false);
            });

    };

    const toggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    }, [loginModal, registerModal]);

    const onClosePopup = () => {
        reset();
        loginModal.onClose();
    }

    return (
        <Modal
            open={loginModal.isOpen}
            onClose={onClosePopup}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="relative p-2 sm:p-6 w-full">
                <div className="flex flex-col gap-4 mb-6">
                    <div className="text-center">
                        <div className="text-2xl font-bold">
                            Welcome back
                        </div>
                        <div className="font-light text-neutral-500 mt-2">
                            Login to your account!
                        </div>
                    </div>
                    <Input
                        id="email"
                        label="Email"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                    <div className="relative">
                        {
                            type === "password"
                            &&
                            <MdOutlineVisibility
                                onClick={onPasswordToggle}
                                className="absolute p-2 top-[50%] -translate-y-[18px] right-3 text-gray-500 z-10 cursor-pointer"
                                size={36}
                            />
                        }
                        {
                            type === "text"
                            &&
                            <MdOutlineVisibilityOff
                                onClick={onPasswordToggle}
                                className="absolute p-2 top-[50%] -translate-y-[18px] right-3 text-gray-500 z-10 cursor-pointer"
                                size={36}
                            />
                        }

                        <Input
                            id="password"
                            type={type}
                            label="Password"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                        />
                    </div>
                </div>

                {
                    user.errorMessage && <div className="text-red-600 flex justify-center my-4">{user.errorMessage}</div>
                }

                <div className="flex flex-col gap-4 mt-3">
                    <Button
                        type="submit"
                        disabled={isLoading}
                    >
                        Login
                    </Button>

                    <div className="flex items-center justify-center gap-2">
                        <div className="h-[1px] w-full bg-gray-500 "></div>
                        <span className="">or</span>
                        <div className="h-[1px] w-full bg-gray-500"></div>
                    </div>
                    <Link href={`${process.env.NEXT_PUBLIC_API_URL}connect/google`}>
                        <Button
                            className="bg-white border-2 border-black text-black relative w-full"
                            disabled={isLoading}
                        >
                            <FcGoogle
                                size={24}
                                className="absolute left-4 top-3"
                            />
                            Continue with Google
                        </Button>
                    </Link>
                    {/*<Link href={`${process.env.NEXT_PUBLIC_API_URL}connect/github`}>*/}
                    {/*    <Button*/}
                    {/*        className="bg-white border-2 border-black text-black relative w-full"*/}
                    {/*        disabled={isLoading}*/}
                    {/*    >*/}
                    {/*        <AiFillGithub*/}
                    {/*            size={24}*/}
                    {/*            className="absolute left-4 top-3"*/}
                    {/*        />*/}
                    {/*        Continue with Github*/}
                    {/*    </Button>*/}
                    {/*</Link>*/}

                    <div
                        className="text-neutral-500 text-center mt-4 font-light"
                    >
                        <div className="justify-center flex flex-row items-center gap-2"
                        >
                            <div>
                                First time here?
                            </div>
                            <div
                                onClick={toggle}
                                className="text-neutral-800 cursor-pointer hover:underline"
                            >
                                Create an account
                            </div>
                        </div>
                    </div>
                </div>

            </form>
        </Modal>
    );
}

export default LoginModal;