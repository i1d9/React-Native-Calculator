/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default class App extends Component {
  constructor() {
    super();
    this.state = {resultText: '', calculationText: ''};
    this.handleChangeText = this.handleChangeText.bind(this);
  }
  handleChangeText(newText) {
    this.setState({
      value: newText,
    });
  }

  calculateResult() {
    const text = this.state.resultText;
    console.log(text, eval(text));
    this.setState({calculationText: eval(text)});
  }

  validate() {
    const text = this.state.resultText;
    switch (text.slice(-1)) {
      case '+':
      case '-':
      case '*':
      case '/':
        return false;
    }
    return true;
  }
  buttonPressed(text) {
    console.log(text);
    if (text == '=') {
      return this.validate() && this.calculateResult(this.state.resultText);
    }
    this.setState({resultText: this.state.resultText + text});
  }

  operate(operations) {
    switch (operations) {
      case 'D':
        let text = this.state.resultText.split('');
        text.pop();
        this.setState({resultText: text.join('')});
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        if (this.state.text == '' || this.state.text.split('').pop) {
          return;
        }
        this.setState({resultText: this.state.resultText + operations});
        break;
    }
  }

  render() {
    let rows = [];
    var nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['.', 0, '=']];

    for (var i = 0; i < 4; i++) {
      let row = [];
      for (var j = 0; j < 3; j++) {
        row.push(
          <TouchableOpacity
            key={nums[i][j]}
            onPress={() => this.buttonPressed(nums[i][j])}
            style={styles.btn}>
            <Text style={styles.btnText}>{nums[i][j]}</Text>
          </TouchableOpacity>,
        );
      }
      rows.push(
        <View key={i} style={styles.row}>
          {row}
        </View>,
      );
    }

    let operations = ['D', '+', '-', '*', '/'];
    let ops = [];
    for (let i = 0; i < 4; i++) {
      ops.push(
        <TouchableOpacity key={operations[i]} style={styles.btn}>
          <Text
            onPress={() => this.operate(operations[i])}
            style={[styles.btnText, styles.white]}>
            {operations[i]}
          </Text>
        </TouchableOpacity>,
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>

        <View style={styles.calculation}>
          <Text style={styles.calculationText}>
            {this.state.calculationText}
          </Text>
        </View>

        <View style={styles.TouchableOpacitys}>
          <View style={styles.numbers}>{rows}</View>
          <View style={styles.operations}>{ops}</View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnText: {
    fontSize: 30,
    color: 'white',
  },
  white: {
    color: 'white',
  },
  btn: {
    flex: 1,
    alignContent: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calculationText: {
    fontSize: 24,
    color: 'black',
  },
  resultText: {
    fontSize: 30,
    color: 'black',
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  result: {
    flex: 2,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'white',
  },
  calculation: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  TouchableOpacitys: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  numbers: {
    flex: 3,
    backgroundColor: '#434343',
    color: 'white',
  },
  operations: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    backgroundColor: '#636363',
  },
});
