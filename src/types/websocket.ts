import { User } from '../app/users/entities/user.entity';
import { Color } from './color';

interface DesignDataObjectBase {
	type: 'image' | 'i-text';
	version: string;
	originX: string;
	originY: string;
	left: number;
	top: number;
	width: number;
	height: number;
	fill: string;
	stroke: null;
	strokeWidth: number;
	strokeDashArray: null;
	strokeLineCap: string;
	strokeLineJoin: string;
	strokeMiterLimit: number;
	scaleX: number;
	scaleY: number;
	angle: number;
	flipX: boolean;
	flipY: boolean;
	opacity: number;
	shadow: null;
	visible: boolean;
	clipTo: null;
	backgroundColor: Color;
	fillRule: string;
	paintFirst: string;
	globalCompositeOperation: string;
	transformMatrix: null;
	skewX: number;
	skewY: number;
}

export interface DesignDataText extends DesignDataObjectBase {
	type: 'i-text';
	text: string;
	fontSize: number;
	fontWeight: string;
	fontFamily: string;
	fontStyle: string;
	lineHeight: number;
	underline: boolean;
	overline: boolean;
	linethrough: boolean;
	textAlign: string;
	textBackgroundColor: string;
	charSpacing: number;
	styles: {};
}

export interface DesignDataImage extends DesignDataObjectBase {
	type: 'image';
	crossOrigin: string;
	cropX: number;
	cropY: number;
	src: string;
	filters: [];
}

export type DesignDataObject = DesignDataText | DesignDataImage;

export type DesignData = {
	background: string;
	version: string;
	objects: Array<DesignDataObject>;
};

export type DesignPayload = {
	design: DesignData;
	variants: DesignData[];
};

export type BullJobPayload = {
	payload: DesignPayload;
	id?: string;
	user?: User;
};
