"use client"


import axios from "axios";
import { useCallback, useEffect, useState } from "react"
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Input from "@/app/Components/inputs/Input";
import Button from "@/app/Components/Button";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import {toast} from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = 'Login' | 'Register';

const AuthForm = () => {
    const session = useSession();
    const router = useRouter();
    const [variant, setVariant] = useState<Variant>("Login");
    const [isLoading, setIsLoading] = useState(false);

    const toggleVariant = useCallback(() => {
        setVariant((prev) => (prev === "Login" ? "Register" : "Login"));
    }, []);

    useEffect(() => {
        if (session?.status === "authenticated"){
            router.push('/users')
        }
    }, [session?.status, router])

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        if (variant === "Register") {
            axios.post('/api/register', data)
            .then(() => {
                signIn('credentials', data);
                toast.success("Registered!");
            })
            .catch(() => toast.error("Something went wrong!"))
            .finally(() => setIsLoading(false))
        }
        if (variant === 'Login') {
            signIn('credentials', {
                ...data,
                redirect: false
            })
            .then((callback) => {
                if(callback?.error){
                    return toast.error("Invalid credentials");
                }
                if(callback?.ok && !callback?.error){
                    toast.success("Logged in!");
                    router.push('/users')
                }

            })
            .finally(() => setIsLoading(false))
        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true);
        
        signIn(action, {redirect: false})
        .then((callback) => {
            if(callback?.error){
                toast.error("Invalid Credentials");
            }
            if(callback?.ok && !callback?.error){
                    toast.success("Logged in!");
            }
        })
        .finally(() => setIsLoading(true))
    }

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md mx-2">
            <div className="bg-white px-4 py-8 shadow rounded-lg sm:px-10">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {variant === "Register" && (
                        <Input label="Name" register={register} id="name" errors={errors} />
                    )}
                    <Input label="Email address" type="email" register={register} id="email" errors={errors} />
                    <Input label="Password" type="password" register={register} id="password" errors={errors} />
                    <div>
                        <Button
                            disabled={isLoading}
                            fullWidth
                            type="submit"
                        >
                            {variant === "Login" ? "Sign in" : "Register"}
                        </Button>
                    </div>
                </form>
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white text-gray-500 px-2">
                                Or continue with
                            </span>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-2">
                       <AuthSocialButton 
                            icon={BsGithub}
                            onClick={() => socialAction('github')}
                       />
                       <AuthSocialButton 
                            icon={BsGoogle}
                            onClick={() => socialAction('google')}
                       />
                    </div>
                </div>
                <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                    <div>
                        {variant === "Login" ? "New to Messanger?" : "Already have a account"}
                    </div>
                     <div onClick={toggleVariant} className="underline cursor-pointer">
                    {variant === "Login" ? 'Create an Account' : 'Login'}
                </div>
                </div>
               
            </div>
        </div>
    )
}

export default AuthForm;
