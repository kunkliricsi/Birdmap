import React from 'react';

export default React.createContext({
    devices: [],
    heatmapPoints: [],

    addHandler: (_, __) => { },
    removeHandler: (_, __) => { },

    updateDevice: () => { },
    updateAllDevices: () => { },
});