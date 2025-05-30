// src/components/RateInclusionsPopover/RateInclusionsPopover.types.ts


export interface InclusionItem {
    name: string;
    description: string;
    visible_voucher: boolean;
}

export interface RateInclusionsPopoverProps {
    open: boolean;
    onClose: () => void;
    anchorEl: HTMLElement | null; // El elemento HTML al que se anclará el popover
    rateName: string;
    inclusions: InclusionItem[];
}