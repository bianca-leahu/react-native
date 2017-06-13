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
	};


	componentDidMount() {
        this.loadData();
	}


    findDataLength() {
        fetch('http://localhost:3000/api/products').then((response) => response.json())
            .then((res) => {
                this.setState({
                    dataLength: res.length,
                });
            })
            .catch(() => {
            });
    }


    loadData() {
        this.setState({
            isLoading: true
        });

        fetch('http://localhost:3000/api/products?_sort=' + this.state.sort + '&_page=1&_limit=20')
        .then((response) => response.json())
            .then((res) => {
                 this.setState({
                    faces: res,
                    isLoading: false
                });   
            })
            .catch(() => {
            });
    }


    paginateData = () => {
        let i = this.state.faces.length / 20,
            index = i + 1;

        this.setState({
            isLoading: true
        });

        fetch('http://localhost:3000/api/products?_sort=' + this.state.sort + '&_page=' + index + '&_limit=20')
        .then((response) => response.json())
             .then((res) => {
                 this.setState({
                    faces: this.state.faces.concat(res),
                    isLoading: false
                });   
             })
             .done(() => {
        });
    }

    addPriceParam = () => {
        this.setState({
            sort: 'price',
            faces: []
        });

        this.loadData();
    }


    addSizeParam = () => {
        this.setState({
            sort: 'size',
            faces: []
        });

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

    keyExtractor = (item) => item.id

    
    displayItems() {
        return (
            <View>
            
                <SortButtons 
                    getPriceParam={this.addPriceParam}
                    getSizeParam={this.addSizeParam}
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
                {renderIf(this.state.faces.length === this.state.dataLength, 
                    <Text style={{textAlign: 'center'}}>~ end of catalogue ~</Text>
                )}
            </View>  
        )
    }
}
