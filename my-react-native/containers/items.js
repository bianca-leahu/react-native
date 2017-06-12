import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, Button} from 'react-native';
import { getFormattedDate } from '../helpers/date-format';
import { renderIf } from '../helpers/renderIf';
import { Loading } from '../components/Loading';


export class GetItems extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			faces: [],
            price: null,
            size: null,
            id: null,
            isLoading: true,
            dataLength: null
		};
	}


	componentDidMount() {
		this.showInitialData();
        this.findDataLength();
	}


    loadUnsortedData() {
        let i = this.state.faces.length / 20,
            index = i + 1,
            url;
        this.setState({
            isLoading: true
        });

        fetch('http://localhost:3000/api/products?_page=' + index + '&_limit=20').then((response) => response.json())
            .then((res) => {
                this.setState({
                    faces: this.state.faces.concat(res),
                    isLoading: false
                });
            })
            .done(() => {
        });
    }


    findDataLength() {
        fetch('http://localhost:3000/api/products').then((response) => response.json())
            .then((res) => {
                this.setState({
                    dataLength: res.length,
                });
            })
            .done(() => {
        });
    }


  	showInitialData() {
  		fetch('http://localhost:3000/api/products?_page=1&_limit=20')
    		.then((response) => response.json())
     		.then((res) => {
             	this.setState({
                    faces: res,
                    isLoading: false
                });   
     		})
     		.done(() => {
		});
  	}


    sortPrice() {
        this.setState({
                faces: [],
                id: false,
                size: false,
                isLoading: true
                
            })
        fetch('http://localhost:3000/api/products?_sort=price&_page=1&_limit=20')
        .then((response) => response.json())
            .then((res) => {
                this.setState({
                    faces: res,
                    price: true,
                    isLoading: false
                })
            })
            .done(() => {
        });
    }

    

    sortSize() {
        this.setState({
                faces: [],
                id: false,
                price: false,
                isLoading: true
            })
        fetch('http://localhost:3000/api/products?_sort=size&_page=1&_limit=20')
        .then((response) => response.json())
            .then((res) => {
                this.setState({
                    faces: res,
                    size: true,
                    isLoading: false
                })
            })
            .done(() => {
        });
    }

    sortId() {
        this.setState({
                faces: [],
                price: false,
                size: false,
                isLoading: true
            })
        fetch('http://localhost:3000/api/products?_sort=id&_page=1&_limit=20')
        .then((response) => response.json())
            .then((res) => {
                this.setState({
                    faces: res,
                    id: true,
                    isLoading: false
                })
            })
            .done(() => {
        });
    }

    loadIdSorted() {
        let i = this.state.faces.length / 20,
            index = i + 1;

        this.setState ({
            isLoading: true
        });

        fetch('http:localhost:3000/api/products?_sort=id&_page=' + index + '&_limit=20').then((response) => response.json())
            .then((res) => {
                this.setState({
                    faces: this.state.faces.concat(res),
                    isLoading: false
                });
            })
            .done(() => {
        });
    }

    loadPriceSorted() {
        let i = this.state.faces.length / 20,
            index = i + 1;

        this.setState ({
            isLoading: true
        });

        fetch('http:localhost:3000/api/products?_sort=price&_page=' + index + '&_limit=20').then((response) => response.json())
            .then((res) => {
                this.setState({
                    faces: this.state.faces.concat(res),
                    isLoading: false
                });  
            })
            .done(() => {
        });
    }

    loadSizeSorted() {
        let i = this.state.faces.length / 20,
            index = i + 1;

        this.setState ({
            isLoading: true
        });

        fetch('http:localhost:3000/api/products?_sort=size&_page=' + index + '&_limit=20').then((response) => response.json())
            .then((res) => {
                this.setState({
                    faces: this.state.faces.concat(res),
                    isLoading: false
                });  
            })
            .done(() => {
        });
    }


    displayItems() {
        return (
            <View style={{paddingBottom: 0}}>
                <View style={{flexWrap: 'wrap', 
                    flexDirection:'column'}} >

                    <Button
                      onPress={() => this.sortPrice()}
                      title="Price Filter"
                      color="lightblue"
                      accessibilityLabel="Price Filter"
                    />

                    <Button
                      onPress={() => this.sortSize()}
                      title="Size Filter"
                      color="lightblue"
                      accessibilityLabel="Size Filter"
                    />

                    <Button
                      onPress={() => this.sortId()}
                      title="ID Filter"
                      color="lightblue"
                      accessibilityLabel="ID Filter"
                    />

                </View>
                <FlatList
                    style={{marginBottom: -60}}
                    onEndReachedThreshold={0}
                    keyExtractor={(item, index) => item.id}
                    onEndReached={ () => {
                            if (this.state.price) { 
                                this.loadPriceSorted()
                            }
                            else if (this.state.size) {
                                this.loadSizeSorted()
                            }
                            else if (this.state.id) {
                                this.loadIdSorted()
                            }
                            else {
                                this.loadUnsortedData()
                            }
                        }
                    }
                    data={this.state.faces}
                    renderItem={({ item }) => (
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: 5,
                            backgroundColor: 'lightblue',
                            borderRadius: 6,
                            padding: 10,
                        }}>
                           
                                <Text>{this.index}</Text>
                                <Text style={style.faceItem}>{item.face}</Text>
                                <Text style={style.priceItem}>Price: ${(item.price / 100).toFixed( 2 )}</Text>
                                <Text>Size: {item.size}px</Text>
                                <Text>ID: {item.id}</Text>
                                <Text>Added: {getFormattedDate(item.date)}</Text>
                        </View>


                )}
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

const style = StyleSheet.create({
	listContainer: {
    	display: 'flex',
    	flexWrap: 'wrap'
    },
    adds: {
    	display: 'none'
    },
    priceItem: {
    	fontSize: 20
    },
    faceItem: {
    	marginTop: 25,
    	marginBottom: 25,
    	display: 'block'
    }
});