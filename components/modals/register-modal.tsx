"use client";

import Modal from "./modal";
import useLoginModal from "@/hooks/use-login-modal";
import Input from "@/components/inputs/Input";
import {useCallback, useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Button from "@/components/ui/button";
import useRegisterModal from "@/hooks/use-register-modal";
import {toast} from "react-hot-toast";
import {FcGoogle} from "react-icons/fc";
import {AiFillGithub} from "react-icons/ai";
import axios from "axios";
import {useRouter} from "next/navigation";
import useUser from "@/hooks/use-user";
import {MdOutlineVisibility, MdOutlineVisibilityOff} from "react-icons/md";


const RegisterModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const router = useRouter();
    const user = useUser();

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

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        console.log('data ', data)

        axios
            .post( "/api/register", data)
            .then(response => {
                console.log('response', response);
                toast.success("You are signed up!")
                reset();
                router.refresh();
                registerModal.onClose();
                loginModal.onOpen();
            })
            .catch(error => {
                console.log(error.response?.data?.message ?? 'An error occurred:');
                user.setUserError(error.response?.data?.message ?? 'An error occurred:')
            })
            .finally(() => {
                setIsLoading(false);
            });

    }

    const onPasswordToggle = () => {
        if (type === "password") {
            return setType("text");
        }
        setType("password");
    }

    const toggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [loginModal, registerModal]);

    return (
        <Modal
            open={registerModal.isOpen}
            onClose={registerModal.onClose}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="relative p-2 sm:p-6 w-full">
                <div className="flex flex-col gap-4 mb-6">
                    <div className="text-center">
                        <div className="text-2xl font-bold">
                            Welcome to A-Store
                        </div>
                        <div className="font-light text-neutral-500 mt-2">
                            Create an account!
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
                    <Input
                        id="username"
                        label="Name"
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
                        disabled={isLoading}
                        type="submit"
                    >
                        Login
                    </Button>

                    <div className="flex items-center justify-center gap-2">
                        <div className="h-[1px] w-full bg-gray-500 "></div>
                        <span>or</span>
                        <div className="h-[1px] w-full bg-gray-500"></div>
                    </div>
                    <Button
                        className="bg-white border-2 border-black text-black relative"
                    >
                        <FcGoogle
                            size={24}
                            className="absolute left-4 top-3"
                        />
                        Continue with Google
                    </Button>
                    <Button
                        className="bg-white border-2 border-black text-black relative"
                    >
                        <AiFillGithub
                            size={24}
                            className="absolute left-4 top-3"
                        />
                        Continue with Github
                    </Button>
                    <div
                        className="text-neutral-500 text-center mt-4 font-light"
                    >
                        <div className="justify-center flex flex-row items-center gap-2"
                        >
                            <div>
                                Already have an account?
                            </div>
                            <div
                                onClick={toggle}
                                className="text-neutral-800 cursor-pointer hover:underline"
                            >
                                Log in
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Modal>
    );
}

export default RegisterModal;