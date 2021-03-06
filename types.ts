export interface ThemeObj {
    colors: Object
    spacing: Object
    variants?: Object
}

export type Theme = {
    colorScheme: String
    theme: ThemeObj
    styles: any
}
