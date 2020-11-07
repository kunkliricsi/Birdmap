import { Map, GoogleApiWrapper } from 'google-maps-react';

export function Heatmap() {
    const mapStyles = {
        width: '100%',
        height: '100%',
    };

    return (
        <Map
            google={this.props.google}
            zoom={8}
            style={mapStyles}
            initialCenter={{ lat: 47.444, lng: -122.176 }}
        />
    );
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCZ51VFfxqZ2GkCmVrcNZdUKsM0fuBQUCY'
});