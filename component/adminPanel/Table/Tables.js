import React from "react";
import "./table.css";
import tableData from "./Data";

export default function Tables() {
  
  return (
    <>
      <div className="container table-content">
        <div className="row">
          <div className="col-12">
            <div className="table-responsive">
              <table className="table text-center">
                <thead>
                  <tr className="table_header rounded-row">
                    <th scope="col">Streaming Now</th>
                    <th scope="col">Number of Agents</th>
                    <th scope="col">Number of Customers</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((item) => (
                    <tr>
                      <td>{item.StreamingNow}</td>
                      <td>{item.NumberofAgents}</td>
                      <td>{item.NumberofCustomers}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
