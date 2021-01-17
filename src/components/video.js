// replace these values with those generated in your TokBox Account
var apiKey = "45828062";
var sessionId =
  "1_MX40NTgyODA2Mn5-MTYxMDU0MTM1OTYxOH5DTEZ6b3BSRnFKcXNEMHM1OGtxUDhtQnh-UH4";
var token =
  "T1==cGFydG5lcl9pZD00NTgyODA2MiZzaWc9NGFlMWY4YzBmZGRjOWQ5YTU4YjUzYWIwNjMwNWU3ZWYxYjA3NDhkMzpzZXNzaW9uX2lkPTFfTVg0ME5UZ3lPREEyTW41LU1UWXhNRFUwTVRNMU9UWXhPSDVEVEVaNmIzQlNSbkZLY1hORU1ITTFPR3R4VURodFFuaC1VSDQmY3JlYXRlX3RpbWU9MTYxMDU0MTQxOSZub25jZT0wLjU3OTMwNzUyOTE1MjI0Mzgmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTYxMDYyNzgxOQ==";

// (optional) add server code here
initializeSession();

// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

function initializeSession() {
  var session = window.OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream

  // Create a publisher
  var publisher = window.OT.initPublisher(
    "publisher",
    {
      insertMode: "append",
      width: "100%",
      height: "100%",
    },
    handleError
  );

  // Connect to the session
  session.connect(token, function (error) {
    // If the connection is successful, publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });
}
