import React, { PureComponent } from 'react';
import { Text, View, FlatList } from 'react-native';
import renderIf from '../helpers/renderIf';
import Loading from '../components/Loading';
import Item from '../components/Item';
import SortButtons from '../components/Sort-buttons';


export default class GetItems extends PureComponent {

	state = {
		faces: [],
        isLoading: true,
        dataLength: null,
        sort: 'id'
	}


	componentDidMount() {
        this.currentPage = 1;
        this.loadData();
	}


    async loadData() {
        try {
            const response = await fetch('http://localhost:3000/api/products?_sort=' + this.state.sort + '&_page=' + this.currentPage + '&_limit=20');
            const res = await response.json();

            this.setState({
                faces: this.state.faces.concat(res),
                isLoading: false
            }); 
        }
        catch (err) {
            console.log('fetch failed', err);
        }
    }


    paginateData = () => {

        this.setState({
            isLoading: true
        });

        this.currentPage++;
        this.loadData();
    }


    renderItem = ({ item }) => {
        return (
            <Item
                face={item.face}
                size={item.size}
                price={item.price}
                date={item.date}
            />
        )
    }


    handleSort = (value) => {
        this.currentPage = 1;

        this.setState({
            faces: [],
            sort: value
        }, () => this.loadData());
    }


    keyExtractor = (item) => item.id

    
    displayItems() {
        return (
            <View>
            
                <SortButtons 
                    onSort={this.handleSort}
                />

                <FlatList
                    onEndReachedThreshold={0}
                    keyExtractor={this.keyExtractor}
                    onEndReached={this.paginateData}
                    data={this.state.faces}
                    renderItem={this.renderItem}
            />
            </View>
        );
    }


    render() {
        return (
            <View>
                {this.displayItems()}

                {renderIf(this.state.isLoading, 
                    <Loading />
                )}
                {renderIf(this.state.faces.length === 0, 
                    <Text style={{textAlign: 'center'}}>~ end of catalogue ~</Text>
                )}
            </View>  
        )
    }
}
