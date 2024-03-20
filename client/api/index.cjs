// import moment from "moment/moment";
const cors = require("cors");
const express = require("express");
const app = express();
const port = 5174;
let headers = new Headers();

const request = require("request");

app.use(cors());
app.use(express.json());
app.get("/mpesa", (req, res) => {
  res.json({ message: "mpesa" });
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get("/access_token", getAccessToken, (req, res) => {
  res.status(200).json({ acess_token: req.access_token });
});

app.get("/register_url", getAccessToken, (req, resp) => {
  let url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl";
  let access_token = req.access_token;
  let auth = "Bearer " + access_token;
  let ip_address = req.connection.remoteAddress;

  request(
    {
      method: "POST",
      url: url,
      headers: {
        Authorization: auth,
      },
      json: {
        ShortCode: "601426",
        ResponseType: "Complete",
        ConfirmationURL: `"https://localhost:5174/confirmation`,
        ValidationURL: `"https://localhost:5174/validation_url`,
      },
    },
    (error, response, body) => {
      if (error) {
        console.log("Error", error);
      }
      resp.status(200).json(body);
    }
  );
});
app.post("/transactiondata", (req, res) => {
  const transactionDetails = req.body;

  console.log(transactionDetails);

  // You can now use the transaction details for further processing,
  // such as updating your database or notifying the user.

  res.status(200).json(transactionDetails);
});

app.get("/stk/:amount/:phone", getAccessToken, (req, res) => {
  console.log("stk running", req.access_token);
  const { amount, phone } = req.params;

  const password = Buffer.from(
    "174379" +
      "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919" +
      "20240319093028"
  ).toString("base64");
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + req.access_token);
  // fetch("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
  //   method: "POST",
  //   headers,
  //   body: JSON.stringify({
  //     BusinessShortCode: 174379,
  //     Password: password,
  //     Timestamp: "20240319093028",
  //     TransactionType: "CustomerPayBillOnline",
  //     Amount: 1,
  //     PartyA: 254254796331,
  //     PartyB: 174379,
  //     PhoneNumber: 254796331359,
  //     CallBackURL: "https://mydomain.com/path",
  //     AccountReference: "Zuri Travels",
  //     TransactionDesc: "Payment of Car Hire Services",
  //   }),
  // })
  //   .then((response) => response.json())
  //   .then((result) => res.json(result))
  //   .catch((error) => console.log(error));
  request(
    {
      method: "POST",
      url: "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      headers: {
        Authorization: "Bearer " + req.access_token,
      },
      json: {
        BusinessShortCode: 174379,
        Password: password,
        Timestamp: "20240319093028",
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: `254${phone.substring(1)}`,
        PartyB: 174379,
        PhoneNumber: `254${phone.substring(1)}`,
        CallBackURL:
          "https://17a2-102-219-210-106.ngrok-free.app/transactiondata",
        AccountReference: "Zuri Travels",
        TransactionDesc: "Payment of Car Hire Services",
      },
    },
    (error, response, body) => {
      if (error) {
        console.log("Error", error);
        res.status(401).send({
          message: "Something went wrong when trying to process your payment",
          error: error.message,
        });
      }
      res.status(200).json(body);
    }
  );
});

function getAccessToken(req, res, next) {
  let url =
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
  let auth =
    "Basic " +
    new Buffer.from(
      "FacMP6gkbqa90AsNgfkBTVdZ9htaGqAB:yzKJYxiVMjxSOYKl"
    ).toString("base64");
  request(
    {
      url: url,
      headers: {
        Authorization: auth,
      },
    },
    (error, response, body) => {
      if (error) {
        console.log(error);
        res.status(401).send({
          message: "Something went wrong when trying to process your payment",
          error: error.message,
        });
      }
      req.access_token = JSON.parse(body).access_token;
      console.log({ token: JSON.parse(body).access_token });
      next();
    }
  );
}
