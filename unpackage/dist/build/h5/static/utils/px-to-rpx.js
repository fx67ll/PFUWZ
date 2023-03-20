export default function pxToRpx(px) {
	return (750 / uni.getWindowInfo().windowWidth) * px;
}
