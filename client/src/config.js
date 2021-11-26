let DB_ROUTE;

if (process.env.NODE_ENV === "production") {
    DB_ROUTE = "https://i-notebook2021.herokuapp.com";
} else {
    DB_ROUTE = "http://localhost:5000";
}

export default DB_ROUTE;