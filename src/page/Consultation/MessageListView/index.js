import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
// import PropTypes from 'prop-types';

import MessageCell from '../MessageCell';

export default class MessageListView extends Component {
    _onScroll = (e) => {
        if(this.props.onScroll) {
            this.props.onScroll(e);
        }
    }
    scrollToEnd = () => {
        if(this.listView) {
            this.listView.scrollToEnd();
        }
    }
    scrollToIndex = (params) => {
        if(this.listView) {
            this.listView.scrollToIndex(params);
        }
    }
    renderCell = ({item}) => (
        <MessageCell data = {item} {...this.props}/>
    )
    _keyExtractor = (item) => item.msgId + '';

    render() {
        return (
            <View style = {{flex:1}}>
                <FlatList
                    ref = {(listView) => (this.listView = listView)}
                    data = {this.props.dataSource || []}
                    renderItem = {this.renderCell}
                    keyExtractor = {this._keyExtractor}
                    initialNumToRender = {50}
                    inverted = {-1}
                    onEndReached = {this._onRefresh}
                    onEndReachedThreshold = {0.8}
                    onScroll = {this._onScroll}
                    {...this.props}
                />
            </View>
        );
    }
}
MessageListView.defaultProps = {
    dataSource: []
};
MessageListView.propTypes = {
    // dataSource: PropTypes.array
};
