import * as React from 'react';
import { Header } from './components';

export function App() {
  return (
    <React.Fragment>
      <Header />
      <div className="p-3">
        <div className="card p-2 h-114px">
          <h2 className="h6xs leading-none">Client Profile</h2>
        </div>
        <div className="card mt-2 p-2 h-86px">
          <h2 className="h6xs leading-none">Net Worth</h2>
        </div>
        <div className="grid-2-col mt-2">
          <div className="card p-2 h-400px">
            <h2 className="h6xs leading-none">Asset Allocations</h2>
          </div>
          <div className="card p-2 h-400px">
            <h2 className="h6xs leading-none">Performance</h2>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
