import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export function getPositionX(event) {
	return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

export function getElementDimensions(ref) {
	const width = ref.current.clientWidth;
	const height = ref.current.clientHeight;
	return { width, height };
}

export function useWidth() {
	const theme = useTheme();
	const keys = [ ...theme.breakpoints.keys ].reverse();
	return (
		keys.reduce((output, key) => {
			const matches = useMediaQuery(theme.breakpoints.up(key));
			return !output && matches ? key : output;
		}, null) || 'lg'
	);
}
