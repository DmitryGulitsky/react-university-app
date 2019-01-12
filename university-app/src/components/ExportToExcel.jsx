import React, {Component} from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

export default class ExportToExcel extends Component {


    render() {
      return (
        <div>
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="download-table-xls-button"
            table="react-table"
            filename="tablexls"
            sheet="tablexls"
            buttonText="Download as XLS"/>
        </div>
      )
    }


  }