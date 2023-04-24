import * as _Animations from "react-animations";
import { keyframes, css } from "styled-components";
const Animations = {};
for (let key in _Animations) Animations[key] = keyframes`${_Animations[key]}`;

const mountHandler = (props) =>
	props.mountAnim
		? css`
				animation: ${props.mountAnim.duration}
					${Animations[props.mountAnim.anim]};
				animation-delay: ${props.mountAnim.delay};
				animation-fill-mode: forwards;
		  `
		: null;

export { mountHandler };

export default Animations;
