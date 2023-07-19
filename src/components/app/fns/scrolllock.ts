import {
	disableBodyScroll,
	enableBodyScroll,
	clearAllBodyScrollLocks,
} from "body-scroll-lock";

export default (element: any) => (b: boolean) => {
	return b ? disableBodyScroll(element) : enableBodyScroll(element);
};
