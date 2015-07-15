const {
  ListItem,
  List,
  Avatar,
  RaisedButton,
  AppBar,
  CardMedia,
  CardTitle,
  ContentDrafts,
  FontIcon,
  IconButton,
  ActionGrade,
  Colors,
  Tabs,
  Tab
  } = mui;

injectTapEventPlugin();
var ThemeManager = new mui.Styles.ThemeManager();

RentRoomInfo = React.createClass({

  getInitialState() {
    return {
      website: ["赶集网","58同城","安居客","链家租房"]
    }
  },
  render() {
    return <div className="outer">
      <CardMedia overlay={<CardTitle title="租房小助手，帮你找到最满意的「家」"/>}>
        <img src="http://images.uoko.com/Upload/ShareImages/2015-03-16/4d9e554b-7705-4c78-a763-a032088bbc46.jpg"/>
      </CardMedia>
      <Tabs>
        <Tab label="赶集网">
          <List className="roomInfoTab" subheader="租房信息（via 赶集网）">{
            this.props.rentRoomInfo.map((house) => {
              console.log(house);
              return <RoomDetails key={ house.index } house={house}/>
            })
          }</List>
        </Tab>
        <Tab label="58同城">
        </Tab>
        <Tab label="安居客">
        </Tab>
        <Tab label="链家租房">
        </Tab>
      </Tabs>
    </div>
  }
});

RoomDetails = React.createClass({
  handleClick(){
    window.location.href = this.props.house.title.href;
  },
  render() {
    var house = this.props.house;
    return <ListItem
      onClick={this.handleClick}
      secondaryText={
        <p>
        小区：{house.neighborhood.text} | 地点：{house.address.text}
        <br/>
        户型：{house.room} | 面积：{house.area} | 价格：{house.price}
        </p>
      }
      secondaryTextLines={2}>
      { house.title.text }
    </ListItem>
  }
});