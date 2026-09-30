import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { LucideIcon } from 'lucide-react';
import * as React from 'react';

export interface IIconLabelAttributeProps {
    Icon: LucideIcon;
    label: string;
    value: string;
    href?: string;
}

export function IconLabelAttribute(props: IIconLabelAttributeProps) {
    const { Icon, label, value, href } = props;
    return (
        <span className="inline-flex items-center gap-1.5">
            <Tooltip>
                <TooltipTrigger>
                    <Icon className="inline" size={16} />
                </TooltipTrigger>
                <TooltipContent side="left">{label}</TooltipContent>
            </Tooltip>{href ? <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary-ink underline underline-offset-4 hover:text-foreground">{value}</a> : value}
        </span>
    );
}