"use client"
import Link from "next/link"
import clsx from "clsx"



interface MobileItemProps {
  label: string,
  icon: any,
  href: string,
  onClick?: () => void;
  active?: boolean;
}


const MobileItem: React.FC<MobileItemProps> = ({
    label,
    icon: Icon,
    href,
    onClick,
  active
}) => {
    const handleClick = () => {
        if(onClick) {
        return onClick();
        }
    }
  return (
    <Link href={href} onClick={onClick} className={clsx("group flex gap-x-3 leading-6 text-sm font-semibold w-full justify-center p-4 text-gray-500 hover:text-black hover:bg-gray-100", active && "bg-gray-100 text-black")} >
        <Icon  className="h-6 w-6 shrink-0"/>
    </Link>
  )
}

export default MobileItem