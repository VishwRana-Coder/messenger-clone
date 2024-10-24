"use client";

import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Button as AntButton, Modal as AntModal } from 'antd';

interface CustomModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    buttonProp: React.ReactNode
}

const  CustomModal: React.FC<CustomModalProps> = ({
    isOpen,
    onClose,
    children,
    buttonProp
}) => {
    return (
        <div>
            <AntModal open={isOpen} onOk={onClose} onCancel={onClose} centered footer={[
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    {buttonProp}
                </div>
            ]
            }>
                {children}
            </AntModal>
        </div>
    );
};

export default CustomModal;
