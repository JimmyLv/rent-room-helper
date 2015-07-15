const {
  ListItem,
  List,
  Avatar,
  RaisedButton,
  AppBar,
  FlatButton,
  FontIcon,
  Paper,
  } = mui;

injectTapEventPlugin();
var ThemeManager = new mui.Styles.ThemeManager();

App = React.createClass({
  mixins: [ReactMeteorData],
  getInitialState: function () {
    return {
      selectedPlayerId: null,
      rentRoomInfo: []
    };
  },

  componentDidMount() {
    //this._getAssets();
    $.ajax({
      url:"https://www.kimonolabs.com/api/ch9mdcyg?apikey=dj0jQNJMgbtzBi5h3lTbdJsEA1W3HmJ5",
      crossDomain: true,
      dataType: "jsonp",
      success: function (data) {
        this.setState({rentRoomInfo: data.results.collection1});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.url, status, err.toString());
      }.bind(this)
    });
  },

  //for using mui
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  //for ReactMeteorData, worked actually
  getMeteorData() {
    return {
      players: Players.find({}, { sort: { score: -1, name: 1 } }).fetch(),
      selectedPlayer: Players.findOne(this.state.selectedPlayerId)
    }
  },

  //change state
  selectPlayer(playerId) {
    this.setState({
      selectedPlayerId: playerId
    });
  },
  addPointsToPlayer(playerId) {
    Players.update(playerId, {$inc: {score: 5}});
  },
  render() {
    var bottomBar;
    if (this.state.selectedPlayerId) {
      bottomBar = (
        <div className="details">
          <div className="name">{this.data.selectedPlayer.name}</div>
          <RaisedButton
            onClick={this.addPointsToPlayer.bind(
              this, this.state.selectedPlayerId)}
            style={{float: "right"}}
            label="Add 5 points"
            primary={true}/>
        </div>
      )
    } else {
      bottomBar = <div className="message">Click a player to select</div>;
    }
    /*<div className="outer">
     <Leaderboard players={this.data.players}
     selectedPlayerId={this.state.selectedPlayerId}
     onPlayerSelected={this.selectPlayer} />
     { bottomBar }
     </div>*/
    return (
      <div>
        <AppBar className="topBar"
                showMenuIconButton={true}
                title="成都 | 租房助手"
                iconElementRight={<FlatButton linkButton={true} href="https://github.com/JimmyLv" secondary={true} label="GitHub"/>} />

        <RentRoomInfo rentRoomInfo={this.state.rentRoomInfo}/>

        <Paper zDepth={0}>
          <span className="footer">
            Copyright © 2012-2015 jimmylv.info, All Right Reserved
          </span>
          <span className="footerBtn">
              <FlatButton label="首页"/>
              <FlatButton label="关于"/>
              <FlatButton label="联系我"/>
              <FlatButton label="免责声明"/>
            </span>
        </Paper>
      </div>
    )
  }
});