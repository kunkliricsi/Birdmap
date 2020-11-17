import React from 'react';

export default React.createContext({
    devices: [],
    heatmapPoints: [],

    addDevice: () => { },
    addPoint: () => { },

    addHandler: (_, __) => { },
});