import { OptionsObject } from "notistack"



type variantType = "info" | "default" | "error" | "success" | "warning" | undefined

const variantDefault = 'info'


export const SnackProps = (variant: variantType = variantDefault, duration: number = 2000): OptionsObject => {

    return {
        variant,
        autoHideDuration: duration,
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right'
        }
    }
}