"use client"

import Modal from '@/app/Components/Modal'
import Image from 'next/image';

interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    src: string | null;
}

const ImageModal: React.FC<ImageModalProps> = ({
    isOpen,
    onClose,
    src
}) => {
    if (!src) {
        return null;
    }
    
    return (
        <Modal isOpen={isOpen} onClose={onClose} buttonProp={<></>}>
            <div className='bg-white flex justify-center items-center h-full'>
                <div className='relative w-full max-w-2xl h-80 mt-10 '>
                    <Image 
                        src={src} 
                        fill 
                        alt='Image' 
                        className='object-contain' 
                        sizes="(max-width: 768px) 100vw, 50vw" 
                    />
                </div>
            </div>
        </Modal>
    );
}

export default ImageModal;
