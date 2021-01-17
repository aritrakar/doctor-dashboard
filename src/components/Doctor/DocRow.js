import React from "react";
import "./DocPatients.css";
import Button from "@material-ui/core/Button";
import { DataGrid } from "@material-ui/data-grid";

export default class DocRow extends React.Component {
  render() {
    var items = this.props.items;

    var columns = items.map((item, i) => {
      if (item === "when1" && items.includes("last_consul")) {
        return {
          id: i,
          field: "when1",
          headerName: "LAST CONSULTATION",
          headerAlign: "center",
          align: "center",
          width: 300,
          valueGetter: (params) => {
            var d = params.row.consultations.filter((item) => {
              return item.name === this.props.docName;
            })[0].last_consul?.seconds;
            var n = new Date(d * 1000);
            var res = n.toString();
            return res.split("GMT")[0];
          },
        };
      } else if (item === "when2" && items.includes("next_consul")) {
        return {
          id: i,
          field: "when2",
          headerName: "NEXT CONSULTATION",
          headerAlign: "center",
          align: "center",
          width: 300,
          valueGetter: (params) => {
            var d = params.row.consultations.filter((item) => {
              return item.name === this.props.docName;
            })[0].next_consul?.seconds;
            var n = new Date(d * 1000);
            var res = n.toString();
            return res.split("GMT")[0];
          },
        };
      } else if (item === "button") {
        return {
          id: this.props.items.length,
          field: "connect",
          headerName: "CONNECT",
          headerAlign: "center",
          align: "center",
          width: 200,
          renderCell: (params) => {
            //console.log("INSIDE BUTTON. params.row.email: ", params.row.email);
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  width: "100%",
                }}
              >
                <strong>
                  <Button
                    onClick={() => this.props.createRoom(params.row.email)}
                    variant="contained"
                    style={{
                      color: "white",
                      marginLeft: -10,
                      backgroundColor: "#21b6ae",
                    }}
                    size="small"
                  >
                    OPEN
                  </Button>
                </strong>
              </div>
            );
          },
        };
      } else if (item === "when" && items.includes("time")) {
        return {
          id: i,
          field: "when",
          headerName: "TIME",
          headerAlign: "center",
          align: "center",
          width: 300,
          valueGetter: (params) => {
            var n = new Date(params.row.time.seconds * 1000);
            var res = n.toString();
            return res.split("GMT")[0];
          },
        };
      } else {
        return {
          id: i,
          field: item,
          headerName: item.toUpperCase(),
          headerAlign: "center",
          align: "center",
          width: 200,
        };
      }
    });

    //console.log("this.props.data: ", this.props.data);

    var rows = [];
    if (this.props.dataType === "nodata") {
      rows =
        this.props.data.length > 0
          ? this.props.data.map((row, i) => {
              row.id = i;
              return row;
            })
          : [];
    } else {
      rows =
        this.props.data?.length > 0
          ? this.props.data.map((row, i) => {
              row.id = i;
              return row.data;
            })
          : [];
    }

    //console.log("rows: ", rows);
    //console.log("columns: ", columns);

    columns = columns.filter((item) => {
      return !["last_consul", "next_consul", "time"].includes(item.field); //item.field !== "last_consul" && item.field !== "next_consul" && item.;
    });

    return (
      <div style={{ height: 300, width: "99%" }}>
        <div style={{ display: "flex", height: "100%" }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              pagination
              //autoPageSize
              showToolbar
              rowHeight={50}
            />
          </div>
        </div>
      </div>
    );
  }
}
