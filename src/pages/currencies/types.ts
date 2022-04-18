type Currency = {
    name: string;
};

export type CurrencyModel = Record<keyof Currency, string>;
