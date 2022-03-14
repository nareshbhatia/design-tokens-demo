import * as React from 'react';
import { Header } from './components';

export function App() {
  return (
    <React.Fragment>
      <Header />
      <div className="p-3">
        <div className="panel p-2 h-114px">
          <h2 className="h7 leading-none">Client Profile</h2>
        </div>
        <div className="panel mt-2 p-2 h-86px">
          <h2 className="h7 leading-none">Net Worth</h2>
        </div>
        <div className="grid-2-col mt-2">
          <div className="panel p-2 h-400px">
            <h2 className="h7 leading-none">Asset Allocations</h2>
          </div>
          <div className="panel p-2 h-400px">
            <h2 className="h7 leading-none">Performance</h2>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
