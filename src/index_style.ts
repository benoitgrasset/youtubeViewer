
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) => {

    return createStyles({
        root: {
            padding: theme.spacing(2),
            height: "100%",
            boxSizing: "border-box"
            // background: "#181818",
            // color: "white"
        },
        h1: {
            color: "#f00",
            marginLeft: theme.spacing(1)
        },
        mainTitle: {
            display: "flex",
            alignItems: "center"
        },
        labelTextfield: {
            // color: "white"
        },
        textField: {

        },
        form: {
            display: "flex",
            flexWrap: "wrap",
            width: "50%",
            marginBottom: 20,
            '& > *': {
                margin: theme.spacing(2),
                display: 'block',
                width: 200
            }
        },
        buttons: {
            '& > *': {
                marginBottom: theme.spacing(1),
                display: 'block'
            }
        },
        select: {
            width: "100%"
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
        },
        description: {
            fontSize: "90%",
            fontStyle: "italic"
        },
        itemsContainer: {
            overflow: "auto",
            height: "calc(100% - 400px)"
        }
    })
})