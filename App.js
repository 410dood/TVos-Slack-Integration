// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */

// import React, { Component } from 'react';
// import {
//   Platform,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

// type Props = {};
// export default class App extends Component<Props> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native! DOOOOOOOOOOOOOOOOOOOOOOOOOOOOD
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit App.js
//         </Text>
//         <Text style={styles.instructions}>
//           {instructions}
//         </Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });


import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

export default class tvostest extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: ds.cloneWithRows(['Loading..']),
    };
  }

  componentDidMount() {
    this.updateSlackView();

    this._interval = setInterval(() => {
      console.log("Fetching Slack info");
      this.updateSlackView();
    }, 10000);
  }

  updateSlackView() {
    this.fetchSlackChannel()
      .then((slackChannel) => {
        console.log(slackChannel.messages);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.setState({
          dataSource: ds.cloneWithRows(slackChannel.messages),
        });
      }).done();
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Hey Doody Here's your slack messages
        </Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text style={styles.message}>{rowData.text}</Text>}
        />
        <Text style={styles.poweredby}>
          HeavyDoodyWorks
        </Text>
      </View>
    );
  }
  // https://slack.com/api/channels.history/token=5rTq2MrAE2DpeXwgvf4LyidA&channel=CB0FE3AR3

  fetchSlackChannel() {
    return new Promise(function (resolve, reject) {
      var token = "xoxp-374161154356-374161154804-374543182117-a0e628ca62ecaa3f60ef79a87f984e8a";
      var channel = 'CB0FE3AR3';
      fetch('https://slack.com/api/channels.history', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'token=' + token + '&channel=CB0FE3AR3'
      })
        .then((response) => response.json())
        .then((responseData) => {
          resolve(responseData);
        }).done();
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5F626C',
  },
  welcome: {
    fontSize: 70,
    color: '#beb3f9',
    textAlign: 'center',
    margin: 10,
  },
  message: {
    fontSize: 50,
    color: '#FFFFFE',
    textAlign: 'center',
    margin: 10,
  },
  poweredby: {
    fontSize: 30,
    textAlign: 'center',
    color: '#FFFFFE',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('tvostest', () => tvostest);