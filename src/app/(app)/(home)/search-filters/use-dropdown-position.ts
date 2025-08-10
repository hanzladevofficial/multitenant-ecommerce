import { RefObject } from "react";

export const useDropDownPosition = (ref: RefObject<HTMLDivElement | null>) => {
  const getDropDownPosition = () => {
    if (!ref.current) return { top: 0, left: 0 };
    const rect = ref.current.getBoundingClientRect();
    const dropDownWidth = 240;
    let left = rect.left + window.scrollX;
    let top = rect.bottom + window.scrollY;
    if (left < 0) left = window.innerWidth - dropDownWidth;
    if (left < 0) left = 16;
    return { top, left };
  };
  return getDropDownPosition;
};
