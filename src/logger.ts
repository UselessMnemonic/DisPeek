function fromStyle(style: Record<string, string>): string {
    return Object.entries(style).map(([k ,v]) => `${k}:${v}`).join(';')
}

const baseStyle = {
    "color": "#fff",
    "background-color": "#444",
    "padding": "2px 4px",
    "border-radius": "2px"
};

export const logger = {
    style: {
        base: fromStyle(baseStyle)
    },
    log(msg: string) {
        console.log(`%c[DisPeek]:%c ${msg}`, this.style.base, "");
    }
};
