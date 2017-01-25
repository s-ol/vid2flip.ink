import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import Slider from 'material-ui/Slider';
import LinearProgress from 'material-ui/LinearProgress';
import Dropzone from 'react-dropzone';

import settingsStore from './settingsStore';

const readAsDataUrl = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.onerror = err => reject(err);
  reader.readAsDataURL(file);
});

class Application extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      video: null,
      canvas: null,
      context: null,
      maxFrames: 0,
      frames: [],
      columns: 2,
    };
  }

  componentDidMount() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const video = document.createElement('video');
    video.preload = true;

    this.setState({
      video,
      canvas,
      context,
    });
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme(lightTheme),
    };
  }

  onDrop(files) {
    const { video, canvas, context } = this.state;

    const step = time => () => new Promise((resolve, reject) => {
      console.log('starting', time);
      video.onseeked = () => {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const url = canvas.toDataURL();

        console.log('done', time);

        this.setState(
          { frames: [...this.state.frames, url] },
          resolve
        );
      };
      video.onerror = err => reject(err);
      video.currentTime = time;
    });

    const attachSource = url => new Promise((resolve, reject) => {
      video.src = url;
      console.log('attaching');
      video.onloadeddata = () => resolve();
      video.load();
    });

    let promise = readAsDataUrl(files[0])
      .then(attachSource)
      .then(() => {
        this.setState({ frames: [], maxFrames: video.duration / 0.5 });
        for (let time = 0; time < video.duration; time += 0.5) {
          promise = promise.then(step(time));
        }
      });
  }

  render() {
    const { frames, maxFrames, columns, padding } = this.state;

    const style = {
      width: `${100/columns}%`,
    };

    return (
      <div className="container">
        <div className="ui">
          <Dropzone
            accept="video/*"
            onDrop={this.onDrop.bind(this)}
          >
            Drop a video here!
          </Dropzone>
          <LinearProgress
            mode="determinate"
            value={maxFrames && (frames.length / maxFrames)}
            max={1}
          />
          <Slider
            min={1}
            max={6}
            step={1}
            value={columns}
            onChange={(e, columns) => this.setState({ columns })}
          />
          <Slider
            min={0}
            max={30}
            value={padding}
            onChange={(e, padding) => this.setState({ padding })}
          />
        </div>
        <div
          className="page"
          style={{
            padding: `${padding}%`,
          }}
        >
          {frames.map((url, index) =>
            <img
              key={index}
              src={url}
              style={style}
            />
          )}
        </div>
      </div>
    );
  }
}

Application.childContextTypes = {
  muiTheme: React.PropTypes.object,
};

export default settingsStore(Application);
