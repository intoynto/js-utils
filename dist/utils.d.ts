export * from "./ioBrowser";
export * from "./object";
export * from "./tanggal";
export * from "./terbilang";
export * from "./terbilang";
export * from "./val";
export * from "./validation";
export * from "./waktu";

export declare function getBaseHref(): string;
export declare function toUrlWithBaseHref(yourUrl: string): URL;
export declare function getBaseName(): string;
export declare function pathIsMatch(pathname: string, paths: string | string[]): boolean;
interface IcalculateProps {
    alignment: "top" | "middle" | "bottom";
    offsetY: number;
}
export declare function calculateScrollOffset(elem: HTMLElement, props?: IcalculateProps): number;
export declare function calculatePercentageInViewport(element: HTMLElement): number;

export declare function isObjectEmpty(obj: object): boolean;
interface ILooseObj {
    [key: string]: any;
}
export declare function joinObjectProps(obj: ILooseObj, props: string[], separator?: string, cb?: (val: any, f: string) => void): string;
export declare function objectProps(obj: ILooseObj, props: string[]): any;
export declare function objectFlat(obj: ILooseObj): object;
export declare function objectFlatProps(obj: ILooseObj, props?: string[]): object;
export declare function objectFlatValuesFromProps(obj: ILooseObj, props?: string[]): object;
export declare function isEqual(value: any, other: any): boolean;
export declare function isClass(func: any): boolean;

export declare type INumString = number | string;
export declare function getNamaBulan(val: number | string, long?: boolean): string;
export declare function tanggalJsToFormatInput(jsDate: Date | null | undefined, useHtml?: boolean): string;
export declare function tanggalJsToFormatIndo(jsDate?: Date | null | undefined, separator?: string, usingHtml?: boolean): string;
export declare function tanggalMySqlToFormatInput(mysqlTanggal: string): string;
export declare function tanggalMySqlToJsDate(mysqlTanggal: string): Date;
export declare function tanggalMySQLdiffNow(mysqlTanggal: string): number;
export declare function mysqlTanggalToIndo(mysqlTanggal: string | null | undefined, separator?: string, long?: boolean, show_time?: boolean, time_separator?: string, digit_bulan?: boolean): string;
export declare function tanggalTertinggiBulanTahun(month: string | number, year: string | number): number;
export declare type IbdrBultah = {
    from: {
        d: number;
        m: number;
        y: number;
        str: string;
    };
    to: {
        d: number;
        m: number;
        y: number;
        str: string;
    };
};
export declare function tanggalBuildRentangBulanTahun(bulan_dari: INumString, tahun_dari: INumString, bulan_sampai: INumString, tahun_sampai: INumString): IbdrBultah;
export declare function toTimeStampSesi(waktuSesi: string | number | Date | null | undefined): string;
export declare function getNamaHari(tanggal: Date, long?: boolean): string;

export declare function terbilang(a: number): string;

export declare function toUtf8String(value: string): string;
export declare function toStr(value: string | number | null | undefined, usingUtf8?: boolean): string;
export declare function toInt(value: any, def?: number | undefined): number;
export declare function toParseFloat(value: any, def?: number | undefined): number;
export declare function toFloat(value: any): number;
export declare function toNum(value: any, digit?: number): number;
export declare function toUcWords(str: string | number, isPerson?: boolean): string;
export declare function toFileSize(bytes: string | number | null | undefined, digit?: number): string;
export declare function toEscapeString(str: string, char?: string): string;
export declare function strReplace(str: string, searchStr: string, replaceStr: string): string;
export declare function toNumIndo(value: string | number, digit?: number): any;
export declare function toDashVal(value: string | number | null | undefined, digit?: number, after?: string, nol_value?: string | number): string | number;
export declare type ItodasValOps = {
    digit?: number;
    strBefore?: string;
    strAfter?: string;
    strNull?: string;
};
export declare function toDashAutoDigit(value: string | number | null | undefined, props?: ItodasValOps): string | number;
export declare function toSecretString(value: string | number | null | undefined, char?: string): string;
export declare function tryParseToArrayString(val: any): string[];
export declare function rTrim(str: string, chr?: string): string;
export declare function lTrim(str: string, chr?: string): string;
export declare function toUnZero(val: number | string, len?: number, place?: string): string;
export declare function toSlugify(value: any): string;
export declare function dotenvParseValue(value: any): any;
export declare function withoutExtension(value: any): any;
export declare function is_value(value: any): boolean;
export declare function toTrim(value: any, usingUtf8?: boolean, rem_dbl_space?: boolean, rem_brk_line?: boolean, brk_line_replace?: string): string;

export declare function isBase64Image(test: string): boolean | RegExpMatchArray;

export declare function getWaktuKata(): string;
