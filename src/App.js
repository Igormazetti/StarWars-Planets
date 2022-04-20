import React from 'react';
import MyProvider from './context/MyProvider';
import Table from './components/Table';
import FilterForm from './components/FilterForm';

function App() {
  return (
    <main>
      <MyProvider>
        <FilterForm />
        <Table />
      </MyProvider>
    </main>
  );
}

export default App;

