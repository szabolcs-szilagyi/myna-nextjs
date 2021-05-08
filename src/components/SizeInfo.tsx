import React, { Component } from 'react';

export default function SizeInfo({ tableClass }) {
  return (
    <div className="maxWidth">
      <table className={tableClass}>
        <thead>
          <tr>
            <th>XS</th>
            <th>S</th>
            <th>M</th>
            <th>ML</th>
            <th>L</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Bust: 84cm</td>
            <td>Bust: 88cm</td>
            <td>Bust: 92cm</td>
            <td>Bust: 96cm</td>
            <td>Bust: 100cm</td>
          </tr>
          <tr>
            <td>Waist: 66cm</td>
            <td>Waist: 70cm</td>
            <td>Waist: 74cm</td>
            <td>Waist: 78cm</td>
            <td>Waist: 82cm</td>
          </tr>
          <tr>
            <td>Hip: 90cm</td>
            <td>Hip: 94cm</td>
            <td>Hip: 98cm</td>
            <td>Hip: 102cm</td>
            <td>Hip: 106cm</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
