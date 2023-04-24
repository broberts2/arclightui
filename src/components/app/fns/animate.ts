const animate = (animationFrames: any) => {
	//animationFrames.map((fn: Function) => fn());
	//requestAnimationFrame(animate);
};

export default (
		_: { [key: string]: any },
		animationFrames: { [key: string]: any }
	) =>
	() =>
		animate(animationFrames);
