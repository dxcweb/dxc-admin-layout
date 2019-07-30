import React from "react";
import ReactDOM from "react-dom";
import AdminLayout from "dxc-admin-layout";

class Demo extends React.Component {
  
  render() {
    return (
      <div style={{ padding: 30 }}>
          <AdminLayout/>
      </div>
    );
  }
}
ReactDOM.render(<Demo />, document.getElementById("__react-content"));
