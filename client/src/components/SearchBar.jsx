import { InputBase, makeStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";


const useStyle = makeStyles({
    search: {
        backgroundColor: "#ffffff",
        position: 'relative',
        margin: "0 auto 0 30px",
        width: '25%',
        borderRadius: "4px"
    },
    SearchIconWrapper: {
        color: "#3f51b5",
        padding: "0 2px",
        height: "100%",
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    searchInput: {
        padding: "1px 1px 1px 0",
        width: "100%",
        paddingLeft: 28,
        fontSize: "unset",
    }
})
const SearchBar = () => {
    const classes = useStyle();

    return (
        <div className={classes.search}>
            <div className={classes.SearchIconWrapper}>
                <SearchIcon />
            </div>
            <InputBase
                className={classes.searchInput}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
            />
        </div>
    )
}

export default SearchBar;