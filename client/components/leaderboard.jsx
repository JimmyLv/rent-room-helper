const {
  ListItem,
  List,
  Avatar,
  RaisedButton,
  AppBar
} = mui;

injectTapEventPlugin();
var ThemeManager = new mui.Styles.ThemeManager();

Leaderboard = React.createClass({
  propTypes: {
    selectedPlayerId: React.PropTypes.string,
    players: React.PropTypes.array.isRequired,
    onPlayerSelected: React.PropTypes.func
  },
  selectPlayer(playerId) {
    this.props.onPlayerSelected(playerId);
  },
  render() {
    var self = this;

    return <List>{
      this.props.players.map((player) => {
        var style = {};
        if (this.props.selectedPlayerId === player._id) {
          style["backgroundColor"] = "#eee";
        }

        return <ListItem key={ player._id }
            onClick={ self.selectPlayer.bind(self, player._id) }
            secondaryText={ "Current score: " + player.score }
            style={style}>
          { player.name }
        </ListItem>
      })
    }</List>
  }
});


