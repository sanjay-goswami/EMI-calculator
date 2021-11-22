import React from 'react';
import './App.css';
import {TableCell, TableRow} from '@material-ui/core';

export default function ntable(val){
    return(
        <TableRow >
                <TableCell className="tablecell">{val.month}</TableCell>
                <TableCell className="tablecell">{val.principal}</TableCell>
                <TableCell className="tablecell">{val.interest}</TableCell>
                <TableCell className="tablecell">{val.total_balance}</TableCell>
                <TableCell className="tablecell">{val.balance}</TableCell>
                <TableCell className="tablecell">{val.paid}%</TableCell>
        </TableRow>
    )
}