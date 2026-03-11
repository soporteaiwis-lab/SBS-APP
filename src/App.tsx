/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Health from './pages/Health';
import Videos from './pages/Videos';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="health" element={<Health />} />
          <Route path="videos" element={<Videos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
