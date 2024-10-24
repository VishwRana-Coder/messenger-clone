"use client";

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPhoto, HiPaperAirplane } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { CldUploadButton } from 'next-cloudinary';
import { useState } from "react";

const Form = () => {
    const { conversationId } = useConversation();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            message: ''
        }
    });

    const [loading, setLoading] = useState(false);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setLoading(true);
        try {
            await axios.post("/api/messages", {
                ...data,
                conversationId
            });
            setValue('message', '', { shouldValidate: true });
        } catch (error) {
            console.error("Failed to send message:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUploadSuccess = async (result: any) => {
        try {
            await axios.post('/api/messages', {
                image: result?.info?.secure_url,
                conversationId
            });
        } catch (error) {
            console.error("Failed to upload image:", error);
        }
    };

    const handleUploadError = (error: any) => {
        console.error("Image upload failed:", error);
    };

    return (
        <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
            <CldUploadButton 
                options={{ maxFiles: 1 }} 
                onSuccess={handleUploadSuccess} 
                onError={handleUploadError} 
                uploadPreset="o4cn0rl5"
            >
                <HiPhoto size={30} className="text-sky-500" />
            </CldUploadButton>
            <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 lg:gap-4 w-full">
                <MessageInput 
                    id="message" 
                    register={register} 
                    errors={errors} 
                    required 
                    placeholder="Write a message" 
                />
                <button 
                    type="submit" 
                    className={`rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition ${loading ? 'opacity-50' : ''}`}
                    aria-label="Send message"
                    disabled={loading}
                >
                    <HiPaperAirplane size={18} className="text-white" />
                </button>
            </form>
        </div>
    );
}

export default Form;
