/* Initialize the tour */
// Step 1. User clicks on the "Start Tour" button
// Step 2. Check if isDemo is true
// Step 3. If isDemo is true, then start the tour
// Step 4. If isDemo is false, then
// Step 4.1     - empty redux store of customer data
// Step 4.2     - load in demo data
// Step 4.3     - start the tour

/* Start the tour */
// Step 1. Navigate to Cost Dashboard
// Step 2. Do Tour
// Step 3. OnExit or OnClose, then
// Step 3.1     - empty redux of demo data
// Step 3.2     - load in customer data

import React, { useEffect, useState } from 'react';

export const initializeTour = () => {
  console.log('InitializeTour', true);
};
