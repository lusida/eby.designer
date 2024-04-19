declare global {
    interface IDbdrawContext {
        version: string;
    }

    /**外键定义 */
    interface IDbForeignkey {
        name: string;
        columns: string[];
        refTable: string;
        refColumns: string[];
    }
}

export { }