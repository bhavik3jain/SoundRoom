import React from 'react';

export default class SoundCloudPlayer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            "soundPlayerIframe": undefined
        }

    }


    setupPlayer(track_url, maxHeight, maxWidth) {

        SC.initialize({
          client_id: '20c77541bd6ca84e8d987789d0bc4b8d'
        });

        console.log("setting up player");

        SC.oEmbed(track_url, {maxheight: maxHeight, show_comments: false, sharing: false, downloadable:false}).then(function(oEmbed) {
            var oldState = this.state;
            oldState.soundPlayerIframe = oEmbed.html
            this.setState(oldState);
        }.bind(this));

    }

    componentWillReceiveProps(nextProps) {
        var track_url = nextProps.track_url;
        var maxHeight = nextProps.maxHeight;
        this.setupPlayer(track_url, maxHeight);
    }


    render() {
        return (
            <div dangerouslySetInnerHTML={{__html: this.state.soundPlayerIframe}} >
            </div>
        )
    }
}
