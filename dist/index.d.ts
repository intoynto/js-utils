declare module "intoy-utils"
{
	export class Calculator {
	    static version: string;
	    constructor();
	    add(a: number, b: number): number;
	}

	export * from "./calculator";

}