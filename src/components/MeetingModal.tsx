import React, { ReactNode } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';


interface MeeetingModalProps{
    isOpen: boolean;
    onClose: ()=> void;
    title: string;
    image?: string;
    className?: string;
    buttonText?: string;
    buttonIcon?: string;
    handleClick?: ()=> void;
    children?: ReactNode;
}

const MeetingModal = ({ isOpen, onClose, title, className, handleClick, buttonText, children,image,  buttonIcon}: MeeetingModalProps) => {
  return (
    
      <Dialog open={isOpen} onOpenChange={onClose}>
        
        <DialogContent className='flex flex-col w-full gap-6 border-none bg-dark-1 py-9 text-white max-w-[520px]'>
          <div className="flex flex-col gap-6">
            {image && (
              <div className="flex justify-center">
                <Image src={image} alt='image' width={72} height={72}/>
              </div>
              
            )}
              <h1 className={cn('text-3xl font-bold leading-[42px]', className)}>{title}</h1>
              {children}
              <Button className='bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0' onClick={handleClick}>
                {buttonIcon && (
                  <Image src={buttonIcon} alt='button' width={13} height={13}/>
                )} &nbsp;
                {buttonText || 'Schedule Meeting'}
              </Button>
          </div>
        </DialogContent>
      </Dialog>

   
  )
}

export default MeetingModal
