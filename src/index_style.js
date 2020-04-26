
import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => {

    return createStyles({
        root: {
            padding: theme.spacing(1),
            // background: "#181818",
            // color: "white"
        },
        textField: {

        },
        labelTextfield: {
            // color: "white"
        },
        form: {
            '& > *': {
                margin: theme.spacing(1),
                display: 'block'
            }
        },
        formControl: {
            margin: theme.spacing(1)
        },
        select: {
            minWidth: 120
        },
        item: {
            display: "flex"
        }
    })
})