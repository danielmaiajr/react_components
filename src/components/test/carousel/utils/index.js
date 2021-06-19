export const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

export const ItemSlidesToShow = (breakPoints, width) => {
	const slides = breakPoints.filter((s) => s.width < width);
	return slides[slides.length - 1].itemsToShow;
};
