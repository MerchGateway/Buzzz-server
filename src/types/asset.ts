import { Color } from './color';

export type ImageBody = { url: string; publicId: string };

export type DesignData = {
	version: string;
	objects: {
		type: string;
		version: string;
		originX: string;
		originY: string;
		left: number;
		top: number;
		width: number;
		height: number;
		fill: string;
		stroke: string | null;
		strokeWidth: number;
		strokeDashArray: string | null;
		strokeLineCap: string;
		strokeLineJoin: string;
		strokeMiterLimit: number;
		scaleX: number;
		scaleY: number;
		angle: number;
		flipX: boolean;
		flipY: boolean;
		opacity: number;
		shadow: string | null;
		visible: boolean;
		clipTo: string | null;
		backgroundColor: string;
		fillRule: string;
		paintFirst: string;
		globalCompositeOperation: string;
		transformMatrix: string | null;
		skewX: number;
		skewY: number;
		crossOrigin: string;
		cropX: number;
		cropY: number;
		src: string;
		filters: [];
	}[];
	background: Color;
	variants: string[];
};
