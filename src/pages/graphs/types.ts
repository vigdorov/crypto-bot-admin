type Graph = {
    type: string;
    graphName: string;
    from: number;
    to: number;
};

export type GraphModel = Record<keyof Graph, string>;
