import { useEffect, useRef } from 'react';

const FOCUSABLE =
    'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

/**
 * Attach the returned ref to the dialog element. Call it from a component that
 * is only mounted while the dialog is open.
 */
export function useDialog<T extends HTMLElement>(onClose: () => void) {
    const ref = useRef<T>(null);
    const closeRef = useRef(onClose);

    useEffect(() => {
        closeRef.current = onClose;
    });

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        const scroller = document.getElementById('main');
        const previousOverflow = scroller?.style.overflow ?? '';
        if (scroller) scroller.style.overflow = 'hidden';

        const focusables = () =>
            Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
                (el) => el.getClientRects().length > 0
            );

        (focusables()[0] ?? node).focus();

        // Capture phase: runs before the app-level Escape handler.
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                e.stopPropagation();
                e.preventDefault();
                closeRef.current();
                return;
            }
            if (e.key !== 'Tab') return;

            const list = focusables();
            if (list.length === 0) {
                e.preventDefault();
                return;
            }
            const first = list[0];
            const last = list[list.length - 1];
            const active = document.activeElement;
            const outside = !node.contains(active);

            if (e.shiftKey && (active === first || outside)) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && (active === last || outside)) {
                e.preventDefault();
                first.focus();
            }
        };

        document.addEventListener('keydown', onKeyDown, true);
        return () => {
            document.removeEventListener('keydown', onKeyDown, true);
            if (scroller) scroller.style.overflow = previousOverflow;
            opener?.focus();
        };
    }, []);

    return ref;
}