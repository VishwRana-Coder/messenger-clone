"use client"

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from '@/app/Components/Modal'
import Select from "@/app/Components/inputs/Select";
import Input from "@/app/Components/inputs/Input";
import Button from "@/app/Components/Button";

interface GroupChatModalProps {
    isOpen?: boolean;
    onClose: () => void;
    users: User[]
}

const GroupChatModal: React.FC<GroupChatModalProps> = ({
    isOpen = false,
    onClose,
    users
}) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            members: []
        }
    })

    const members = watch('members');
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post(`/api/conversations`, {
            ...data,
            isGroup: true
        }).then(() => {
            router.refresh();
            onClose();
        })
        .catch(() => toast.error("Something went wrong"))
        .finally(() => setIsLoading(false))
    }

  return (
    <Modal isOpen={isOpen} onClose={onClose} buttonProp={<></>}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                        Create a group chat
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        Create a chat with more than 2 people
                    </p>
                    <div className="mt-10 flex flex-col gay-y-8">
                        <Input register={register} label="Name" id="name" required errors={errors}/>
                        <Select disabled={isLoading} label="Members" options={users.map((user) => ({
                            value: user.id,
                            label: user.name
                        }))} onChange={(value) => setValue('members', value, {
                            shouldValidate: true
                        })} value={members}/>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex items-center gap-x-6 ">
                <Button disabled={isLoading} type="button" secondary onClick={onClose}>
                    Cancel
                </Button>
                <Button disabled={isLoading} type="submit">
                    Create
                </Button>
            </div>
        </form>
    </Modal>
  )
}

export default GroupChatModal