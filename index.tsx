import React, { useContext, createContext, useMemo, ReactNode, FC } from 'react'
import { useColorScheme, StyleSheet, ColorSchemeName } from 'react-native'

import { Theme, ThemeObj } from './types'

type ContextType = {
    colorScheme: ColorSchemeName
    theme: ThemeObj
}
export const ThemeContext = createContext<ContextType>({
    colorScheme: 'light',
    theme: { colors: {}, spacing: {} }
})

interface IProps {
    theme: ThemeObj
    children: ReactNode
}

export const ThemeProvider: FC<IProps> = (props) => {
    const colorScheme = useColorScheme()
    if (!colorScheme) return null
    const theme = useMemo(() => {
        const updatedTheme = JSON.parse(JSON.stringify(props.theme))
        for (var key in updatedTheme.colors) {
            if (typeof updatedTheme.colors[key] === 'object') {
                updatedTheme.colors[key] = updatedTheme.colors[key][colorScheme]
            }
        }
        return updatedTheme
    }, [colorScheme])

    const themeObject = {
        colorScheme,
        theme
    }

    return <ThemeContext.Provider value={themeObject}>{props.children}</ThemeContext.Provider>
}

//THESE NEED TO HAVE PROPER TYPES
export const useTheme = (callback: (styleObject: any) => any): Theme => {
    const context = useContext(ThemeContext)
    const { theme } = context
    const styleObj = callback(theme)
    const styles = StyleSheet.create(styleObj)
    return {
        theme: context.theme,
        colorScheme: context.colorScheme || 'light',
        styles
    }
}
