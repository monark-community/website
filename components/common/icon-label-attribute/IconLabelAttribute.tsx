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
        <span>
            <Tooltip>
                <TooltipTrigger>
                    <Icon className="inline" size={16} />
                </TooltipTrigger>
                <TooltipContent side="left">{label}</TooltipContent>
            </Tooltip>&nbsp;{href ? <a href={href} target="_blank" rel="noopener noreferrer">{value}</a> : value}
        </span>
    );
}