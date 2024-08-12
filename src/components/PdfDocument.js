import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
} from "@react-pdf/renderer";
import moment from "moment";

//const POSTER_PATH = "https://image.tmdb.org/t/p/w154";

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#ffffff"
    },
    header:{
        padding: 10,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    movieContainer: {
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "row",
        padding: 10,
        borderWidth: 0.5,
        borderColor:'black',
    },
    movieDetails: {
        display: "flex",
        marginLeft: 5
    },
    movieTitle: {
        fontSize: 15,
        marginBottom: 10
    },
    movieOverview: {
        fontSize: 10
    },

    image: {
        height: 200,
        width: 150
    },
    subtitle: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        width: 150,
        alignItems: "center",
        marginBottom: 12
    },
    vote: {
        display: "flex",
        flexDirection: "row"
    },
    rating: {
        height: 10,
        width: 10
    },
    vote_text: {
        fontSize: 10
    },
    vote_pop: {
        fontSize: 10,
        padding: 2,
        backgroundColor: "#61C74F",
        color: "#fff"
    },
    vote_pop_text: {
        fontSize: 10,
        marginLeft: 4
    },
    overviewContainer: {
        minHeight: 110
    },
    detailsFooter: {
        display: "flex",
        flexDirection: "row"
    },
    lang: {
        fontSize: 8,
        fontWeight: 700
    },
    vote_average: {
        fontSize: 8,
        marginLeft: 4,
        fontWeight: "bold"
    },
    lineStyle:{
        borderWidth: 0.5,
        borderColor:'black',
        margin:10,
   }
});

export function PdfDocument(props) {
    console.log("pdf props", props.data);
    return (
        <Document>
            <Page style={styles.page}>
            <View>
                <Text>Start Date: {props.startdate} - End Date {props.enddate}</Text>
                {props.data
                    ? props.data.map((a, index) => {
                            return (
                                <View key={index} style={styles.movieContainer}>
                                    <View style={styles.movieDetails}>
                                        <Text style={styles.movieTitle}>Order ID # : {a.orderid}</Text>
                                        <Text style={styles.movieTitle}>Date/Time: {moment(a.ordertime).format(
                                                    "DD-MMM-YYYY / hh:mm a"
                                                )}</Text>
                                        <Text style={styles.movieTitle}>Delivery Charge: {a.delivery_charge}</Text>
                                        <Text style={styles.movieTitle}>GST: {a.gst}</Text>
                                        <Text style={styles.movieTitle}>Total Amount: {a.original_price}</Text>
                                        <Text style={styles.movieTitle}>Discount Amount: {a.discount_amount}</Text>
                                        <Text style={styles.movieTitle}>Refunt Amount: {a.refund_amount}</Text>
                                        <Text style={styles.movieTitle}>Total Paid: {a.price}</Text>
                                        <Text style={styles.movieTitle}>Payment Type: {a.payment_type=="0"?"Cash":"Online"}</Text>
                    </View>
                    </View>
                );
                })
            : ""}
            </View>
            </Page>
        </Document>
    );
}