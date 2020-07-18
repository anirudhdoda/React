import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import { DISHES } from '../shared/dishes';
import Header from './HeaderComponent'
import Footer from './FooterComponent'

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedDish: null,
        dishes: DISHES
        
    };
  }

onDishSelect=(dishId) =>{
    this.setState({ selectedDish: dishId});

 }


  render() {
    return (
      <div>
        <Header />
        <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
        <DishDetail selectedDish={this.state.selectedDish} />
        <Footer/> 
      </div>
    );
  }
}

export default Main;