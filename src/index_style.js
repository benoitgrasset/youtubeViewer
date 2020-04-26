
import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => {

    return createStyles({
        root: {
            padding: theme.spacing(1),
            // background: "#181818",
            // color: "white"
        },
        mainTitle: {
            color: "#f00"
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
        buttons: {
            '& > *': {
                marginBottom: theme.spacing(1),
                display: 'block'
            }
        },
        formControl: {
            margin: theme.spacing(1)
        },
        select: {
            minWidth: 120
        },
        content: {
            display: "flex",
            margin: theme.spacing(2)
        },
        title: {
            color: "black",
            marginRight: theme.spacing(3),
            "&:hover": {
                color: "#1976d2"
            }
        },
        divider: {
            background: "rgba(0, 0, 0, 0.5)"
        },
        item: {
            maxWidth: "60%"
        },
        img: {
            marginRight: theme.spacing(1)
        }
    })
})