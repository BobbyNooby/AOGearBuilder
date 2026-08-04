export type SchemaFieldType =
	| 'string'
	| 'number'
	| 'boolean'
	| 'select'
	| 'multiselect'
	| 'textarea'
	| 'array:string'
	| 'record:number'
	| 'record:object'
	| 'array:object'
	| 'json'
	| 'range'
	| 'stat-map';

export interface SchemaField {
	key: string;
	label?: string;
	type: SchemaFieldType;
	options?: string[];
	labels?: Record<string, string>;
	required?: boolean;
	placeholder?: string;
	itemSchema?: SchemaField[];
	valueSchema?: SchemaField[];
	nullable?: boolean;
	readonly?: boolean;
	min?: number;
	max?: number;
	step?: number;
	constrainedBy?: string;
}

export type Schema = SchemaField[];
