import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

// MUI styles
const useStyles = makeStyles((theme) => ({
    table: {
        backgroundColor: 'rgba(0,0,0,0.8)'
    },
    link: {
        color: '#5d79ae'
    }
}))

const AuthorList = (props) => {
    const classes = useStyles()
    const {
        authors
    } = props

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='authors-table'>
                <TableHead>
                    <TableRow>
                        <TableCell><b>Author</b></TableCell>
                        <TableCell><b>Posts</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {authors.map((author) => (
                    <TableRow key={author.cognitoUserSud}>
                        <TableCell>
                            <Link
                                className={classes.link}
                                component={RouterLink}
                                color='inherit'
                                to={`/authors?author=${author.cognitoUserSud}`}
                            >
                                <b className={classes.link}>{author.username}</b>
                            </Link>
                        </TableCell>
                        <TableCell>
                            {author.nOfPosts}
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AuthorList