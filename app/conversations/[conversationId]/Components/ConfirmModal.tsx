"use client"

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import Modal from '@/app/Components/Modal'
import { FiAlertTriangle } from 'react-icons/fi'
import Button from "@/app/Components/Button";

interface CustomModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ConfirmModal: React.FC<CustomModalProps> = ({
    isOpen,
    onClose,
}) => {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(false);

const onDelete = useCallback(() => {
  setIsLoading(true);
  axios.delete(`/api/conversations/${conversationId}`)
    .then(() => {
      onClose();
      router.push(`/conversations`);
      router.refresh(); // Call refresh as a function
    })
    .catch((error) => {
      toast.error("Something went wrong!");
      console.error(error); // Log the error for debugging
    })
    .finally(() => setIsLoading(false)); // Change to set to false
}, [conversationId, router, onClose]);


  return (
    <Modal isOpen={isOpen} onClose={onClose}  
    buttonProp={
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <Button disabled={isLoading} danger onClick={onDelete}>
          Delete
        </Button>
        <Button disabled={isLoading} secondary onClick={onClose}>
          Cancel
        </Button>
      </div>
    }>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-6 w-6 flex-shrink-0 items-center rounded-full bg-redd-100 sm:mx-0 sm:h-10 sm:w-10">
          <FiAlertTriangle className="h-6 w-6 text-red-600"/>
        </div>
        <div className="mt-3 text-center sm:ml-0 sm:mt-[7px] sm:text-left">
          <h3 className="text-base font-semibold leading-6 text-gray-600">
            Delete Converstion
          </h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this conversation? This action cannot be undone.
            </p>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmModal