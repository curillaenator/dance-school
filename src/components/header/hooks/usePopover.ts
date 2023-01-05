import { useState, useCallback, MouseEvent } from 'react';

interface UsePopoverProps {
  popoverDefaultId?: string;
}

export const usePopover = (props: UsePopoverProps) => {
  const { popoverDefaultId = 'header-dropdown-id' } = props;

  const [target, setTarget] = useState<HTMLButtonElement | null>(null);
  const handleClick = useCallback((e: MouseEvent<HTMLButtonElement>) => setTarget(e.currentTarget), []);
  const handleClose = useCallback(() => setTarget(null), []);

  const open = Boolean(target);
  const popoverId = open ? popoverDefaultId : undefined;

  return {
    target,
    popoverId,
    open,
    handleClick,
    handleClose,
  };
};
