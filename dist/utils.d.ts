declare module "intoy-utils"
{
	export * from "./ioBrowser";
	export * from "./object";
	export * from "./tanggal";
	export * from "./terbilang";
	export * from "./terbilang";
	export * from "./val";
	export * from "./validation";
	export * from "./waktu";

	export function getBaseHref(): string;
	export function toUrlWithBaseHref(yourUrl: string): URL;
	export function getBaseName(): string;
	export function pathIsMatch(pathname: string, paths: string | string[]): any;
	interface IcalculateProps {
	    alignment: "top" | "middle" | "bottom";
	    offsetY: number;
	}
	export function calculateScrollOffset(elem: HTMLElement, props?: IcalculateProps): number;
	export function calculatePercentageInViewport(element: HTMLElement): number;
	export {};

	export function isObjectEmpty(obj: object): boolean;
	interface ILooseObj {
	    [key: string]: any;
	}
	export function joinObjectProps(obj: ILooseObj, props: string[], separator?: string, cb?: (val: any, f: string) => void): string;
	export function objectProps(obj: ILooseObj, props: string[]): ILooseObj;
	export function objectFlat(obj: ILooseObj): ILooseObj;
	export function objectFlatProps(obj: ILooseObj, props?: string[]): ILooseObj;
	export function objectFlatValuesFromProps(obj: ILooseObj, props?: string[]): ILooseObj;
	export function isEqual(value: any, other: any): boolean;
	export function isClass(func: any): boolean;
	export {};

	type INumString = number | string;
	export function getNamaBulan(val: number | string, long?: boolean): string;
	export function tanggalJsToFormatInput(jsDate: Date | null | undefined, useHtml?: boolean): string;
	export function tanggalJsToFormatIndo(jsDate?: Date | null | undefined, separator?: string, usingHtml?: boolean): string;
	export function tanggalMySqlToFormatInput(mysqlTanggal: string): string;
	export function tanggalMySqlToJsDate(mysqlTanggal: string): Date;
	export function tanggalMySQLdiffNow(mysqlTanggal: string): number;
	export function mysqlTanggalToIndo(mysqlTanggal: string | null | undefined, separator?: string, long?: boolean, show_time?: boolean, time_separator?: string): string;
	export function tanggalTertinggiBulanTahun(month: string | number, year: string | number): 28 | 29 | 30 | 31;
	export function tanggalBuildRentangBulanTahun(bulan_dari: INumString, tahun_dari: INumString, bulan_sampai: INumString, tahun_sampai: INumString): {
	    from: {
	        d: number;
	        m: any;
	        y: any;
	        str: string;
	    };
	    to: {
	        d: number;
	        m: any;
	        y: any;
	        str: string;
	    };
	};
	export function toTimeStampSesi(waktuSesi: string | number | Date | null | undefined): string;
	export {};

	/*! Copyright (c) 2016 Naufal Rabbani (https://github.com/BosNaufal/terbilang-js)
	* Licensed Under MIT (http://opensource.org/licenses/MIT)
	*
	* Version 0.0.1
	*
	* Inspired By: http://notes.rioastamal.net/2012/03/membuat-fungsi-terbilang-pada-php.html
	*/
	export function terbilang(a: number): string;

	export function toUtf8String(value: string): string;
	export function toStr(value: string | number | null | undefined, usingUtf8?: boolean): string;
	export function toInt(value: any, def?: number | undefined): number;
	export function toParseFloat(value: any, def?: number | undefined): number;
	export function toFloat(value: any): number;
	export function toNum(value: any, digit?: number): number;
	export function toUcWords(str: string | number, isPerson?: boolean): string;
	export function toFileSize(bytes: string | number | null | undefined, digit?: number): string;
	export function toEscapeString(str: string, char?: string): string;
	export function strReplace(str: string, searchStr: string, replaceStr: string): string;
	export function toNumIndo(value: string | number, digit?: number): any;
	export function toDashVal(value: string | number | null | undefined, digit?: number, after?: string): string;
	type ItodasValOps = {
	    digit?: number;
	    strBefore?: string;
	    strAfter?: string;
	    strNull?: string;
	};
	export function toDashAutoDigit(value: string | number | null | undefined, props?: ItodasValOps): string | 0;
	export function toSecretString(value: string | number | null | undefined, char?: string): string;
	export function tryParseToArrayString(val: any): string[];
	export function rTrim(str: string, chr?: string): string;
	export function lTrim(str: string, chr?: string): string;
	export function toUnZero(val: number | string, len?: number, place?: string): string;
	export function toSlugify(value: any): string;
	export function dotenvParseValue(value: any): any;
	export function withoutExtension(value: any): any;
	export {};

	export function isBase64Image(test: string): false | RegExpMatchArray;

	export function getWaktuKata(): string;

}