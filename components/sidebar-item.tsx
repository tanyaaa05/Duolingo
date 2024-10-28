"use client";

import Link from "next/link"; 
import Image from "next/image";
import { usePathname} from "next/navigation";

import { Button } from "@/components/ui/ui/button";

type Props = {
    label: string;
    iconSrc: string;
    href: string;
};

export const SidebarItem = ({
    label,
    iconSrc,
    href,
}: Props) => {
    const Pathname = usePathname();
    const active = Pathname === href;

    return (
        <Button
           variant = {active ? "sidebarOutline" : "sidebar"}
           className="justify-start h-[52px]"
           asChild
        >
            <Link href={href}>
               <Image 
               src={iconSrc}
               alt={label}
               className="mr-5"
               height={32}
               width={32}
               />
               {label}
            </Link>
        </Button>
    );
};