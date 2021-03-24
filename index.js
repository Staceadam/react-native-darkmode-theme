import React, { useContext, createContext, useMemo } from 'react'
import { useColorScheme, StyleSheet } from 'react-native'

export const ThemeContext = createContext(null)

export const ThemeProvider = (props) => {
    const colorScheme = useColorScheme()

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

export const useTheme = (callback) => {
    const context = useContext(ThemeContext)
    const { theme } = context
    const styleObj = callback(theme)
    const styles = StyleSheet.create(styleObj)
    return {
        ...context,
        styles
    }
}
