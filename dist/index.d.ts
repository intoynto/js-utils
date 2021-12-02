declare module "intoy-utils"
{
	export class Calculator {
	    static version: string;
	    constructor();
	    add(a: number, b: number): number;
	}

	import { Calculator } from "./calculator";
	import { TCalculator } from "./types";
	export { TCalculator, Calculator };

	export interface TCalculator {
	}

}