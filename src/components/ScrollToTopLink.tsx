"use client";

import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, MouseEvent, PointerEvent } from "react";

type ScrollToTopLinkProps = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>;

function isModifiedClick(event: MouseEvent<HTMLAnchorElement>) {
    return event.button !== 0 || event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;
}

function isModifiedPointerDown(event: PointerEvent<HTMLAnchorElement>) {
    return event.button !== 0 || event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;
}

/**
 * Keeps navigation predictable: every normal navigation starts at the top,
 * including a click on the route the visitor is already viewing.
 */
export default function ScrollToTopLink({ onClick, onPointerDown, ...props }: ScrollToTopLinkProps) {
    const scrollToTop = () => window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    return <Link {...props} onPointerDown={(event) => {
        onPointerDown?.(event);
        if (!event.defaultPrevented && !isModifiedPointerDown(event)) scrollToTop();
    }} onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented && !isModifiedClick(event)) scrollToTop();
    }} />;
}
