import React from "react";
import createStore from "./store";
import { ToastContainer } from "react-toastify";
import {
  MuiThemeProvider,
  createMuiTheme,
  makeStyles,
  createStyles
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Wrapper from "./components/Wrapper";
import AvaiableCharts from "./Features/ChartsMenu/AvailableCharts";
import {
  createClient,
  Provider as GQLProvider,
  defaultExchanges,
  subscriptionExchange
} from "urql";
import { Provider } from "react-redux";
import { SubscriptionClient } from "subscriptions-transport-ws";
import HistoryMetrics from "./Features/HistoryMetrics/HistoryMetrics";
import { CurrentMetrics } from "./Features/CurrentMetrics/CurrentMetrics";
import { Grid } from "@material-ui/core";

const store = createStore();
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "rgb(39,49,66)"
    },
    secondary: {
      main: "rgb(197,208,222)"
    },
    background: {
      default: "rgb(226,231,238)"
    }
  }
});

const subscriptionClient = new SubscriptionClient(
  "wss://react.eogresources.com/graphql",
  {
    reconnect: true
  }
);

const client = createClient({
  url: "https://react.eogresources.com/graphql",
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription(operation) {
        return subscriptionClient.request(operation);
      }
    })
  ]
});

const useStyles = makeStyles(() =>
  createStyles({
    workingArea: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      padding: "20px"
    },
    metrics: {
      width: "100%",
      display: "flex",
      justifyContent: "flex-start",
      marginBottom: "30px"
    }
  })
);
const App = () => {
  const classes = useStyles();
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <Wrapper>
          <GQLProvider value={client}>
            <Header />

            {/*  Show hidded list of metricks to choose and show chart when you choose one  */}
            {/*   chart update by and using  GrapQL subscrition  */}
            <div className={classes.workingArea}>
              <div className={classes.metrics}>
                <CurrentMetrics />
                <AvaiableCharts />
              </div>
              <Grid container spacing={2} direction="row">
                <Grid item xs={11} justify="center" alignItems="center">
                  <HistoryMetrics />
                  <ToastContainer />
                </Grid>

                <Grid item xs={1}></Grid>
              </Grid>
            </div>
          </GQLProvider>
        </Wrapper>
      </Provider>
    </MuiThemeProvider>
  );
};

export default App;
