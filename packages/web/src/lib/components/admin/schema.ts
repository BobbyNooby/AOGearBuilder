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
	| 'json';

export interface SchemaField {
	key: string;
	label?: string;
	type: SchemaFieldType;
	options?: string[];
	required?: boolean;
	placeholder?: string;
	itemSchema?: SchemaField[];
	valueSchema?: SchemaField[];
	nullable?: boolean;
	readonly?: boolean;
}

export type Schema = SchemaField[];
